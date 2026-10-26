# -*- coding: utf-8 -*-
"""
Spaja tekstove iz redizajn/prijevodi/*.py u src/messages/<jezik>.json.
Postojeće ključeve na istim mjestima prepisuje, ostale ostavlja.
Pokretanje iz korijena projekta:  python redizajn/prijevodi/merge.py
"""
import importlib.util
import io
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
LOCALES = ['hr', 'en', 'de', 'sl', 'pl']


def deep_merge(dst, src):
    for k, v in src.items():
        if isinstance(v, dict) and isinstance(dst.get(k), dict):
            deep_merge(dst[k], v)
        else:
            dst[k] = v


modules = sorted(f for f in os.listdir(HERE) if f.endswith('.py') and f != 'merge.py')
data = {loc: json.load(io.open(os.path.join(ROOT, 'src', 'messages', f'{loc}.json'), encoding='utf8')) for loc in LOCALES}

for name in modules:
    spec = importlib.util.spec_from_file_location(name[:-3], os.path.join(HERE, name))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    for section, per_locale in mod.SECTIONS.items():
        missing = [l for l in LOCALES if l not in per_locale]
        if missing:
            sys.exit(f'{name}:{section} nema jezike {missing}')
        for loc in LOCALES:
            data[loc].setdefault(section, {})
            deep_merge(data[loc][section], json.loads(json.dumps(per_locale[loc])))


def keys(d, prefix=''):
    out = set()
    for k, v in d.items():
        p = f'{prefix}.{k}' if prefix else k
        out |= keys(v, p) if isinstance(v, dict) else {p}
    return out


base = keys(data['hr'])
for loc in LOCALES:
    diff = base ^ keys(data[loc])
    if diff and loc != 'hr':
        print(f'{loc}: razlika u ključevima ({len(diff)}):', sorted(diff)[:12])
    io.open(os.path.join(ROOT, 'src', 'messages', f'{loc}.json'), 'w', encoding='utf8', newline='\n').write(
        json.dumps(data[loc], ensure_ascii=False, indent=2) + '\n'
    )
print('spojeno:', ', '.join(modules))

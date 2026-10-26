import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { recoveryPlan, clampWeight, MIN_WEIGHT_KG, MAX_WEIGHT_KG, DEFAULT_WEIGHT_KG } from '@/features/recovery/calc'

describe('Kalkulator oporavka (varijanta B)', () => {
  it('70 kg daje 280 g u četiri doze od 70 g', () => {
    const plan = recoveryPlan(70, 31.2)
    expect(plan.totalCarbsG).toBe(280)
    expect(plan.doses.map((d) => d.carbsG)).toEqual([70, 70, 70, 70])
    expect(plan.doses.map((d) => d.hour)).toEqual([0, 1, 2, 3])
    expect(plan.gelSharePct).toBe(11)
    expect(plan.restCarbsG).toBe(248.8)
  })

  it('sve doze su unutar prva 4 sata i zbrajaju se točno na 4 g/kg', () => {
    fc.assert(
      fc.property(fc.integer({ min: MIN_WEIGHT_KG, max: MAX_WEIGHT_KG }), fc.constantFrom(29, 31.2, 32.8), (kg, gel) => {
        const plan = recoveryPlan(kg, gel)
        const sum = plan.doses.reduce((s, d) => s + d.carbsG, 0)
        expect(Math.round(sum * 10) / 10).toBe(kg * 4)
        for (const d of plan.doses) expect(d.hour).toBeLessThanOrEqual(4)
        expect(plan.gelCarbsG).toBeLessThan(plan.totalCarbsG)
      }),
    )
  })

  it('težina izvan raspona se ograničava, nevaljan unos daje zadanu vrijednost', () => {
    expect(clampWeight(5)).toBe(MIN_WEIGHT_KG)
    expect(clampWeight(400)).toBe(MAX_WEIGHT_KG)
    expect(clampWeight(Number.NaN)).toBe(DEFAULT_WEIGHT_KG)
    expect(clampWeight(72.6)).toBe(73)
  })
})

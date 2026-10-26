/**
 * Kalkulator oporavka (varijanta B), prema uvjetu iz odobrene tvrdnje na
 * deklaraciji gela: ugljikohidrati iz svih izvora, ukupno 4 g po kg
 * tjelesne težine, u dozama, unutar prva 4 sata i najkasnije 6 sati nakon
 * vrlo intenzivnog i/ili dugotrajnog fizičkog vježbanja.
 */

export const CARBS_PER_KG = 4
export const MIN_WEIGHT_KG = 30
export const MAX_WEIGHT_KG = 160
export const DEFAULT_WEIGHT_KG = 70
/** Doze u satima nakon napora: sve unutar prva 4 sata. */
export const DOSE_HOURS = [0, 1, 2, 3] as const

export interface RecoveryPlan {
  weightKg: number
  totalCarbsG: number
  doses: Array<{ hour: number; carbsG: number }>
  gelCarbsG: number
  /** Udio jednog gela u ukupnoj količini, u postocima (cijeli broj). */
  gelSharePct: number
  /** Ugljikohidrati koji dolaze iz hrane i napitaka uz jedan gel. */
  restCarbsG: number
}

export function clampWeight(value: number): number {
  if (!Number.isFinite(value)) return DEFAULT_WEIGHT_KG
  return Math.min(MAX_WEIGHT_KG, Math.max(MIN_WEIGHT_KG, Math.round(value)))
}

export function recoveryPlan(weightKg: number, gelCarbsG: number): RecoveryPlan {
  const weight = clampWeight(weightKg)
  const total = weight * CARBS_PER_KG
  const per = Math.round((total / DOSE_HOURS.length) * 10) / 10
  const doses = DOSE_HOURS.map((hour) => ({ hour, carbsG: per }))
  // Zadnja doza preuzima zaokruživanje, tako da je zbroj točan.
  const sumFirst = per * (DOSE_HOURS.length - 1)
  doses[doses.length - 1] = { hour: DOSE_HOURS[DOSE_HOURS.length - 1], carbsG: Math.round((total - sumFirst) * 10) / 10 }
  const share = Math.round((gelCarbsG / total) * 100)
  return {
    weightKg: weight,
    totalCarbsG: total,
    doses,
    gelCarbsG,
    gelSharePct: share,
    restCarbsG: Math.round((total - gelCarbsG) * 10) / 10,
  }
}

/** Tablica smjernica za prikaz bez JavaScripta. */
export const GUIDE_WEIGHTS = [50, 60, 70, 80, 90, 100] as const

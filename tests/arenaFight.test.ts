import { describe, it, expect } from 'vitest'
import { nenCompatibility } from '~/data/nenTypes'
import type { NenTypeId } from '~/data/nenTypes'

// Pure fight logic extracted for testing (mirrors useArena.ts exactly)

const NEN_BONUS: Record<string, number> = {
  enhancer: 1.4,
  emitter: 1.3,
  transmuter: 1.2,
  conjurer: 1.1,
  manipulator: 1.0,
  specialist: 1.0,
}

function roll2d6(): number {
  return Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1)
}

function getMatchupMultiplier(attackerType: NenTypeId, defenderType: NenTypeId): number {
  if (attackerType === defenderType) return 1.0
  const compat = nenCompatibility[attackerType]
  if (compat.compatible.includes(defenderType)) return 1.05
  if (compat.opposed === defenderType) return 0.95
  return 1.0
}

function calcPower(
  char: { nen_type: string; strength_speed: number; aura: number; defense: number; intelligence: number },
  roll: number,
  opponentNenType?: NenTypeId
): number {
  const bonus = char.nen_type === 'specialist'
    ? 0.8 + Math.random() * 0.8
    : NEN_BONUS[char.nen_type]!
  const basePower = (char.strength_speed * bonus) + char.aura + (char.defense * 0.8) + (char.intelligence * 0.9) + roll
  const matchup = opponentNenType ? getMatchupMultiplier(char.nen_type as NenTypeId, opponentNenType) : 1.0
  return basePower * matchup
}

function splitRoll(total: number): [number, number] {
  const lo = Math.max(1, total - 6)
  const hi = Math.min(6, total - 1)
  const a = lo + Math.floor(Math.random() * (hi - lo + 1))
  return [a, total - a]
}

describe('roll2d6', () => {
  it('always returns a value between 2 and 12', () => {
    for (let i = 0; i < 500; i++) {
      const r = roll2d6()
      expect(r).toBeGreaterThanOrEqual(2)
      expect(r).toBeLessThanOrEqual(12)
    }
  })

  it('returns an integer', () => {
    for (let i = 0; i < 100; i++) {
      expect(Number.isInteger(roll2d6())).toBe(true)
    }
  })
})

describe('calcPower', () => {
  const baseChar = { strength_speed: 10, aura: 5, defense: 5, intelligence: 5 }

  it('uses the correct Nen bonus for each non-specialist type', () => {
    const roll = 7
    for (const [type, bonus] of Object.entries(NEN_BONUS)) {
      if (type === 'specialist') continue
      const char = { ...baseChar, nen_type: type }
      const expected = (10 * bonus) + 5 + (5 * 0.8) + (5 * 0.9) + roll
      expect(calcPower(char, roll)).toBeCloseTo(expected)
    }
  })

  it('enhancer has the highest fixed bonus', () => {
    const roll = 7
    const enhancer = calcPower({ ...baseChar, nen_type: 'enhancer' }, roll)
    for (const type of ['emitter', 'transmuter', 'conjurer', 'manipulator']) {
      const other = calcPower({ ...baseChar, nen_type: type }, roll)
      expect(enhancer).toBeGreaterThan(other)
    }
  })

  it('specialist power is within the valid bonus range [0.8, 1.6]', () => {
    const roll = 7
    for (let i = 0; i < 200; i++) {
      const power = calcPower({ ...baseChar, nen_type: 'specialist' }, roll)
      const minPower = (10 * 0.8) + 5 + (5 * 0.8) + (5 * 0.9) + roll
      const maxPower = (10 * 1.6) + 5 + (5 * 0.8) + (5 * 0.9) + roll
      expect(power).toBeGreaterThanOrEqual(minPower)
      expect(power).toBeLessThanOrEqual(maxPower)
    }
  })

  it('higher roll produces higher power (all else equal)', () => {
    const char = { ...baseChar, nen_type: 'enhancer' }
    expect(calcPower(char, 10)).toBeGreaterThan(calcPower(char, 5))
  })

  it('power increases with higher stats', () => {
    const roll = 7
    const weak = calcPower({ nen_type: 'enhancer', strength_speed: 1, aura: 1, defense: 1, intelligence: 1 }, roll)
    const strong = calcPower({ nen_type: 'enhancer', strength_speed: 20, aura: 20, defense: 20, intelligence: 20 }, roll)
    expect(strong).toBeGreaterThan(weak)
  })
})

describe('splitRoll', () => {
  it('two dice always sum to the original total', () => {
    for (let total = 2; total <= 12; total++) {
      for (let i = 0; i < 50; i++) {
        const [a, b] = splitRoll(total)
        expect(a + b).toBe(total)
      }
    }
  })

  it('each die is always between 1 and 6', () => {
    for (let total = 2; total <= 12; total++) {
      for (let i = 0; i < 50; i++) {
        const [a, b] = splitRoll(total)
        expect(a).toBeGreaterThanOrEqual(1)
        expect(a).toBeLessThanOrEqual(6)
        expect(b).toBeGreaterThanOrEqual(1)
        expect(b).toBeLessThanOrEqual(6)
      }
    }
  })

  it('handles edge case total=2 (must be 1+1)', () => {
    const [a, b] = splitRoll(2)
    expect(a).toBe(1)
    expect(b).toBe(1)
  })

  it('handles edge case total=12 (must be 6+6)', () => {
    const [a, b] = splitRoll(12)
    expect(a).toBe(6)
    expect(b).toBe(6)
  })

  it('returns integers', () => {
    for (let total = 2; total <= 12; total++) {
      const [a, b] = splitRoll(total)
      expect(Number.isInteger(a)).toBe(true)
      expect(Number.isInteger(b)).toBe(true)
    }
  })
})

describe('NEN_BONUS table', () => {
  it('contains all 6 Nen types', () => {
    const types = ['enhancer', 'emitter', 'transmuter', 'conjurer', 'manipulator', 'specialist']
    for (const t of types) {
      expect(NEN_BONUS).toHaveProperty(t)
    }
  })

  it('all bonuses are positive numbers', () => {
    for (const bonus of Object.values(NEN_BONUS)) {
      expect(bonus).toBeGreaterThan(0)
    }
  })

  it('enhancer has the highest bonus', () => {
    const max = Math.max(...Object.values(NEN_BONUS))
    expect(NEN_BONUS.enhancer).toBe(max)
  })
})

describe('getMatchupMultiplier', () => {
  const allTypes: NenTypeId[] = ['enhancer', 'transmuter', 'conjurer', 'specialist', 'manipulator', 'emitter']

  it('same type returns 1.0 (neutral)', () => {
    for (const t of allTypes) {
      expect(getMatchupMultiplier(t, t)).toBe(1.0)
    }
  })

  it('compatible opponent returns 1.05 (affinity)', () => {
    expect(getMatchupMultiplier('enhancer', 'transmuter')).toBe(1.05)
    expect(getMatchupMultiplier('enhancer', 'emitter')).toBe(1.05)
    expect(getMatchupMultiplier('transmuter', 'enhancer')).toBe(1.05)
    expect(getMatchupMultiplier('transmuter', 'conjurer')).toBe(1.05)
    expect(getMatchupMultiplier('conjurer', 'transmuter')).toBe(1.05)
    expect(getMatchupMultiplier('conjurer', 'specialist')).toBe(1.05)
    expect(getMatchupMultiplier('specialist', 'conjurer')).toBe(1.05)
    expect(getMatchupMultiplier('specialist', 'manipulator')).toBe(1.05)
    expect(getMatchupMultiplier('manipulator', 'specialist')).toBe(1.05)
    expect(getMatchupMultiplier('manipulator', 'emitter')).toBe(1.05)
    expect(getMatchupMultiplier('emitter', 'manipulator')).toBe(1.05)
    expect(getMatchupMultiplier('emitter', 'enhancer')).toBe(1.05)
  })

  it('opposed opponent returns 0.95 (clash)', () => {
    expect(getMatchupMultiplier('enhancer', 'specialist')).toBe(0.95)
    expect(getMatchupMultiplier('specialist', 'enhancer')).toBe(0.95)
    expect(getMatchupMultiplier('transmuter', 'manipulator')).toBe(0.95)
    expect(getMatchupMultiplier('manipulator', 'transmuter')).toBe(0.95)
    expect(getMatchupMultiplier('conjurer', 'emitter')).toBe(0.95)
    expect(getMatchupMultiplier('emitter', 'conjurer')).toBe(0.95)
  })

  it('non-adjacent, non-opposed types return 1.0 (neutral)', () => {
    expect(getMatchupMultiplier('enhancer', 'conjurer')).toBe(1.0)
    expect(getMatchupMultiplier('enhancer', 'manipulator')).toBe(1.0)
    expect(getMatchupMultiplier('transmuter', 'emitter')).toBe(1.0)
    expect(getMatchupMultiplier('transmuter', 'specialist')).toBe(1.0)
  })

  it('all 36 pairings return a valid multiplier (0.95, 1.0, or 1.05)', () => {
    for (const a of allTypes) {
      for (const d of allTypes) {
        const m = getMatchupMultiplier(a, d)
        expect([0.95, 1.0, 1.05]).toContain(m)
      }
    }
  })
})

describe('calcPower with matchup', () => {
  const baseChar = { strength_speed: 10, aura: 5, defense: 5, intelligence: 5 }
  const roll = 7

  it('affinity matchup increases power by 5%', () => {
    const neutral = calcPower({ ...baseChar, nen_type: 'enhancer' }, roll)
    const withAffinity = calcPower({ ...baseChar, nen_type: 'enhancer' }, roll, 'transmuter')
    expect(withAffinity).toBeCloseTo(neutral * 1.05)
  })

  it('clash matchup decreases power by 5%', () => {
    const neutral = calcPower({ ...baseChar, nen_type: 'enhancer' }, roll)
    const withClash = calcPower({ ...baseChar, nen_type: 'enhancer' }, roll, 'specialist')
    expect(withClash).toBeCloseTo(neutral * 0.95)
  })

  it('same type matchup has no effect', () => {
    const neutral = calcPower({ ...baseChar, nen_type: 'enhancer' }, roll)
    const sametype = calcPower({ ...baseChar, nen_type: 'enhancer' }, roll, 'enhancer')
    expect(sametype).toBeCloseTo(neutral)
  })

  it('no opponent type has no effect', () => {
    const without = calcPower({ ...baseChar, nen_type: 'enhancer' }, roll)
    const withUndefined = calcPower({ ...baseChar, nen_type: 'enhancer' }, roll, undefined)
    expect(withUndefined).toBeCloseTo(without)
  })
})

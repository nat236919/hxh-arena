import { describe, it, expect } from 'vitest'
import { abilities, abilitiesByNenType, getAbility } from '~/data/abilities'
import { npcs } from '~/data/npcs'
import type { AbilityModifierContext } from '~/data/abilities'

const ALL_NEN_TYPES = ['enhancer', 'transmuter', 'emitter', 'conjurer', 'manipulator', 'specialist'] as const

// Representative contexts for modifier testing
const ctx: AbilityModifierContext = {
  challengerRoll: 7,
  opponentRoll: 7,
  challengerPower: 100,
  opponentPower: 100,
}

const lowRollCtx: AbilityModifierContext = { ...ctx, challengerRoll: 2, opponentRoll: 2 }
const highRollCtx: AbilityModifierContext = { ...ctx, challengerRoll: 12, opponentRoll: 12 }
const weakCtx: AbilityModifierContext = { ...ctx, challengerPower: 50, opponentPower: 150 }
const strongCtx: AbilityModifierContext = { ...ctx, challengerPower: 150, opponentPower: 50 }

// ── Data integrity ──────────────────────────────────────────────────────────

describe('abilities data', () => {
  it('has at least 30 abilities (5+ per Nen type)', () => {
    expect(abilities.length).toBeGreaterThanOrEqual(30)
  })

  it('all ability ids are unique', () => {
    const ids = abilities.map(a => a.id)
    expect(new Set(ids).size).toBe(abilities.length)
  })

  it('every ability has required string fields', () => {
    for (const ab of abilities) {
      expect(ab.id).toBeTruthy()
      expect(ab.name).toBeTruthy()
      expect(ab.description).toBeTruthy()
      expect(ab.flavorText).toBeTruthy()
      expect(ab.effect).toBeTruthy()
    }
  })

  it('every ability has a valid Nen type', () => {
    for (const ab of abilities) {
      expect(ALL_NEN_TYPES).toContain(ab.nen_type)
    }
  })

  it('each Nen type has at least 5 abilities', () => {
    for (const type of ALL_NEN_TYPES) {
      expect(abilitiesByNenType[type].length).toBeGreaterThanOrEqual(5)
    }
  })

  it('abilitiesByNenType contains all abilities', () => {
    const total = Object.values(abilitiesByNenType).reduce((sum, pool) => sum + pool.length, 0)
    expect(total).toBe(abilities.length)
  })

  it('getAbility returns the correct ability by id', () => {
    for (const ab of abilities) {
      expect(getAbility(ab.id)).toBe(ab)
    }
  })

  it('getAbility returns undefined for unknown id', () => {
    expect(getAbility('nonexistent_ability')).toBeUndefined()
  })
})

// ── Modifier return values ──────────────────────────────────────────────────

describe('ability modifiers', () => {
  it('every modifier returns a positive number', () => {
    for (const ab of abilities) {
      const result = ab.modifier(ctx)
      expect(result).toBeGreaterThan(0)
      expect(typeof result).toBe('number')
      expect(isFinite(result)).toBe(true)
    }
  })

  it('no modifier returns zero or negative (avoids zeroing out power)', () => {
    const contexts = [ctx, lowRollCtx, highRollCtx, weakCtx, strongCtx]
    for (const ab of abilities) {
      for (const c of contexts) {
        expect(ab.modifier(c)).toBeGreaterThan(0)
      }
    }
  })

  it('no modifier returns an unreasonably large value (> 5.0)', () => {
    const contexts = [ctx, lowRollCtx, highRollCtx, weakCtx, strongCtx]
    for (const ab of abilities) {
      for (const c of contexts) {
        expect(ab.modifier(c)).toBeLessThanOrEqual(5.0)
      }
    }
  })

  // Fixed-multiplier abilities (always return the same value)
  it('big_bang_impact always returns 1.15', () => {
    expect(getAbility('big_bang_impact')!.modifier(ctx)).toBe(1.15)
    expect(getAbility('big_bang_impact')!.modifier(lowRollCtx)).toBe(1.15)
  })

  it('shu always returns 1.12', () => {
    expect(getAbility('shu')!.modifier(ctx)).toBe(1.12)
  })

  it('whirlwind always returns 1.12', () => {
    expect(getAbility('whirlwind')!.modifier(ctx)).toBe(1.12)
  })

  it('biscuit_cast_off always returns 1.2', () => {
    expect(getAbility('biscuit_cast_off')!.modifier(ctx)).toBe(1.2)
  })

  it('double_machine_gun always returns 1.15', () => {
    expect(getAbility('double_machine_gun')!.modifier(ctx)).toBe(1.15)
  })

  it('gallery_fake (silent waltz) always returns 1.1', () => {
    expect(getAbility('gallery_fake')!.modifier(ctx)).toBe(1.1)
  })

  it('deep_purple always returns 1.1', () => {
    expect(getAbility('deep_purple')!.modifier(ctx)).toBe(1.1)
  })

  // Roll-conditional abilities
  it('jajanken_rock returns 1.25 on roll >= 10, else 1.0', () => {
    const ab = getAbility('jajanken_rock')!
    expect(ab.modifier({ ...ctx, challengerRoll: 10 })).toBe(1.25)
    expect(ab.modifier({ ...ctx, challengerRoll: 12 })).toBe(1.25)
    expect(ab.modifier({ ...ctx, challengerRoll: 9 })).toBe(1.0)
    expect(ab.modifier({ ...ctx, challengerRoll: 2 })).toBe(1.0)
  })

  it('thunderbolt returns 1.35 on roll >= 10, else 1.0', () => {
    const ab = getAbility('thunderbolt')!
    expect(ab.modifier({ ...ctx, challengerRoll: 10 })).toBe(1.35)
    expect(ab.modifier({ ...ctx, challengerRoll: 9 })).toBe(1.0)
  })

  it('adult_gon returns 1.5 on roll >= 9, else 0.8 (risk/reward)', () => {
    const ab = getAbility('adult_gon')!
    expect(ab.modifier({ ...ctx, challengerRoll: 9 })).toBe(1.5)
    expect(ab.modifier({ ...ctx, challengerRoll: 12 })).toBe(1.5)
    expect(ab.modifier({ ...ctx, challengerRoll: 8 })).toBe(0.8)
    expect(ab.modifier({ ...ctx, challengerRoll: 2 })).toBe(0.8)
  })

  it('ko returns 1.18 on roll >= 8, else 0.95 (risk/reward)', () => {
    const ab = getAbility('ko')!
    expect(ab.modifier({ ...ctx, challengerRoll: 8 })).toBe(1.18)
    expect(ab.modifier({ ...ctx, challengerRoll: 7 })).toBe(0.95)
  })

  it('autopilot returns 1.3 on roll >= 9, else 0.9 (risk/reward)', () => {
    const ab = getAbility('autopilot')!
    expect(ab.modifier({ ...ctx, challengerRoll: 9 })).toBe(1.3)
    expect(ab.modifier({ ...ctx, challengerRoll: 8 })).toBe(0.9)
  })

  it('holy_chain returns 1.22 on roll <= 4, else 1.0', () => {
    const ab = getAbility('holy_chain')!
    expect(ab.modifier({ ...ctx, challengerRoll: 4 })).toBe(1.22)
    expect(ab.modifier({ ...ctx, challengerRoll: 2 })).toBe(1.22)
    expect(ab.modifier({ ...ctx, challengerRoll: 5 })).toBe(1.0)
  })

  it('lovely_ghostwriter returns 2.0 on roll 12, 1.3 on roll 10-11, else 1.0', () => {
    const ab = getAbility('lovely_ghostwriter')!
    expect(ab.modifier({ ...ctx, challengerRoll: 12 })).toBe(2.0)
    expect(ab.modifier({ ...ctx, challengerRoll: 11 })).toBe(1.3)
    expect(ab.modifier({ ...ctx, challengerRoll: 10 })).toBe(1.3)
    expect(ab.modifier({ ...ctx, challengerRoll: 9 })).toBe(1.0)
  })

  // Opponent-roll-conditional abilities
  it('godspeed returns 1.3 when opponent rolls <= 5, else 1.05', () => {
    const ab = getAbility('godspeed')!
    expect(ab.modifier({ ...ctx, opponentRoll: 5 })).toBe(1.3)
    expect(ab.modifier({ ...ctx, opponentRoll: 2 })).toBe(1.3)
    expect(ab.modifier({ ...ctx, opponentRoll: 6 })).toBe(1.05)
  })

  it('black_voice returns 1.35 when opponent rolls >= 10, else 1.0', () => {
    const ab = getAbility('black_voice')!
    expect(ab.modifier({ ...ctx, opponentRoll: 10 })).toBe(1.35)
    expect(ab.modifier({ ...ctx, opponentRoll: 9 })).toBe(1.0)
  })

  it('order_stamp returns 1.28 when opponent rolls <= 5, else 1.0', () => {
    const ab = getAbility('order_stamp')!
    expect(ab.modifier({ ...ctx, opponentRoll: 5 })).toBe(1.28)
    expect(ab.modifier({ ...ctx, opponentRoll: 6 })).toBe(1.0)
  })

  it('little_flower returns 1.28 when opponent rolls <= 6, else 1.0', () => {
    const ab = getAbility('little_flower')!
    expect(ab.modifier({ ...ctx, opponentRoll: 6 })).toBe(1.28)
    expect(ab.modifier({ ...ctx, opponentRoll: 7 })).toBe(1.0)
  })

  it('ricochet returns 1.25 when opponent rolls >= 8, else 1.0', () => {
    const ab = getAbility('ricochet')!
    expect(ab.modifier({ ...ctx, opponentRoll: 8 })).toBe(1.25)
    expect(ab.modifier({ ...ctx, opponentRoll: 7 })).toBe(1.0)
  })

  // Power-gap-conditional abilities
  it('rage_blast returns 1.22 when weaker, 1.05 when stronger', () => {
    const ab = getAbility('power_surge')!
    expect(ab.modifier(weakCtx)).toBe(1.22)
    expect(ab.modifier(strongCtx)).toBe(1.05)
    expect(ab.modifier(ctx)).toBe(1.05) // equal power => not weaker
  })

  it('judgment_chain returns 1.4 when opponent is 20%+ stronger, else 1.0', () => {
    const ab = getAbility('judgment_chain')!
    expect(ab.modifier({ ...ctx, challengerPower: 100, opponentPower: 121 })).toBe(1.4)
    expect(ab.modifier({ ...ctx, challengerPower: 100, opponentPower: 120 })).toBe(1.0)
    expect(ab.modifier(strongCtx)).toBe(1.0)
  })

  it('dowsing_chain returns 1.18 when opponent is stronger, 1.05 otherwise', () => {
    const ab = getAbility('dowsing_chain')!
    expect(ab.modifier(weakCtx)).toBe(1.18)
    expect(ab.modifier(strongCtx)).toBe(1.05)
  })

  it('smoky_jail returns 1.15 when opponent is stronger, 1.08 otherwise', () => {
    const ab = getAbility('smoky_jail')!
    expect(ab.modifier(weakCtx)).toBe(1.15)
    expect(ab.modifier(strongCtx)).toBe(1.08)
  })

  // Scaling siphon abilities
  it('chain_jail scales with opponent power (siphons 8%)', () => {
    const ab = getAbility('chain_jail')!
    const result = ab.modifier({ ...ctx, challengerPower: 100, opponentPower: 200 })
    const expected = 1.0 + (200 * 0.08) / 100
    expect(result).toBeCloseTo(expected)
  })

  it('needle_people scales with opponent power (siphons 10%)', () => {
    const ab = getAbility('needle_people')!
    const result = ab.modifier({ ...ctx, challengerPower: 100, opponentPower: 200 })
    const expected = 1.0 + (200 * 0.1) / 100
    expect(result).toBeCloseTo(expected)
  })

  it('skill_hunter scales with opponent power (mirrors 12%)', () => {
    const ab = getAbility('skill_hunter')!
    const result = ab.modifier({ ...ctx, challengerPower: 100, opponentPower: 200 })
    const expected = 1.0 + (200 * 0.12) / 100
    expect(result).toBeCloseTo(expected)
  })

  it('siphon abilities never divide by zero (challengerPower = 0)', () => {
    const siphonIds = ['chain_jail', 'needle_people', 'skill_hunter']
    for (const id of siphonIds) {
      const result = getAbility(id)!.modifier({ ...ctx, challengerPower: 0, opponentPower: 100 })
      expect(isFinite(result)).toBe(true)
      expect(result).toBeGreaterThan(0)
    }
  })

  // Scarlet Eyes (random range)
  it('scarlet_eyes always returns a value between 0.9 and 1.5', () => {
    const ab = getAbility('scarlet_eyes')!
    for (let i = 0; i < 200; i++) {
      const result = ab.modifier(ctx)
      expect(result).toBeGreaterThanOrEqual(0.9)
      expect(result).toBeLessThanOrEqual(1.5)
    }
  })

  // Bungee Gum (cross-roll comparison)
  it('bungee_gum returns 1.2 when challenger rolled less, else 1.1', () => {
    const ab = getAbility('bungee_gum')!
    expect(ab.modifier({ ...ctx, challengerRoll: 5, opponentRoll: 8 })).toBe(1.2)
    expect(ab.modifier({ ...ctx, challengerRoll: 8, opponentRoll: 5 })).toBe(1.1)
    expect(ab.modifier({ ...ctx, challengerRoll: 7, opponentRoll: 7 })).toBe(1.1)
  })

  // Texture Surprise (cross-roll comparison)
  it('texture_surprise returns 1.2 when opponent rolled more, else 1.05', () => {
    const ab = getAbility('texture_surprise')!
    expect(ab.modifier({ ...ctx, opponentRoll: 9, challengerRoll: 6 })).toBe(1.2)
    expect(ab.modifier({ ...ctx, opponentRoll: 6, challengerRoll: 9 })).toBe(1.05)
    expect(ab.modifier({ ...ctx, opponentRoll: 7, challengerRoll: 7 })).toBe(1.05)
  })
})

// ── NPC ability pools ───────────────────────────────────────────────────────

describe('NPC ability pools', () => {
  it('every NPC has a non-empty ability_pool', () => {
    for (const npc of npcs) {
      expect(npc.ability_pool.length).toBeGreaterThan(0)
    }
  })

  it('all ability ids in NPC pools reference real abilities', () => {
    for (const npc of npcs) {
      for (const id of npc.ability_pool) {
        expect(getAbility(id), `NPC ${npc.name} references unknown ability "${id}"`).toBeDefined()
      }
    }
  })

  it('all ability ids in NPC pools are unique per NPC', () => {
    for (const npc of npcs) {
      const unique = new Set(npc.ability_pool)
      expect(unique.size).toBe(npc.ability_pool.length)
    }
  })
})

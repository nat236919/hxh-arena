import { describe, it, expect } from 'vitest'
import { npcs } from '../app/data/npcs'

const ALL_NEN_TYPES = ['enhancer', 'transmuter', 'emitter', 'conjurer', 'manipulator', 'specialist']

describe('npcs data', () => {
  it('has at least one NPC', () => {
    expect(npcs.length).toBeGreaterThan(0)
  })

  it('all NPC ids are unique', () => {
    const ids = npcs.map(n => n.id)
    expect(new Set(ids).size).toBe(npcs.length)
  })

  it('all NPC ids are prefixed with "npc-"', () => {
    for (const npc of npcs) {
      expect(npc.id).toMatch(/^npc-/)
    }
  })

  it.each(npcs.map(n => [n.name, n] as [string, typeof n]))('%s has required fields', (_name, npc) => {
    expect(npc.id).toBeTruthy()
    expect(npc.name).toBeTruthy()
    expect(ALL_NEN_TYPES).toContain(npc.nen_type)
    expect(npc.strength_speed).toBeGreaterThanOrEqual(1)
    expect(npc.aura).toBeGreaterThanOrEqual(1)
    expect(npc.defense).toBeGreaterThanOrEqual(1)
    expect(npc.intelligence).toBeGreaterThanOrEqual(1)
  })

  it('all stat values are positive integers', () => {
    for (const npc of npcs) {
      for (const stat of [npc.strength_speed, npc.aura, npc.defense, npc.intelligence]) {
        expect(Number.isInteger(stat)).toBe(true)
        expect(stat).toBeGreaterThan(0)
      }
    }
  })

  it('portrait paths start with "/" when present', () => {
    for (const npc of npcs) {
      if (npc.portrait !== undefined) {
        expect(npc.portrait).toMatch(/^\//)
      }
    }
  })

  it('covers at least 3 different Nen types', () => {
    const types = new Set(npcs.map(n => n.nen_type))
    expect(types.size).toBeGreaterThanOrEqual(3)
  })
})

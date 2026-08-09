import { describe, it, expect } from 'vitest'
import { nenTypes } from '../app/data/nenTypes'
import type { NenTypeId } from '../app/data/nenTypes'

const ALL_TYPES: NenTypeId[] = ['enhancer', 'transmuter', 'emitter', 'conjurer', 'manipulator', 'specialist']

describe('nenTypes data', () => {
  it('contains all 6 Nen types', () => {
    expect(Object.keys(nenTypes)).toHaveLength(6)
    for (const id of ALL_TYPES) {
      expect(nenTypes).toHaveProperty(id)
    }
  })

  it.each(ALL_TYPES)('%s has required fields', (id) => {
    const type = nenTypes[id]
    expect(type.id).toBe(id)
    expect(type.name).toBeTruthy()
    expect(type.japaneseName).toBeTruthy()
    expect(type.color).toMatch(/^#[0-9a-f]{6}$/i)
    expect(type.glowColor).toBeTruthy()
    expect(type.auraColor).toBeTruthy()
    expect(type.description).toBeTruthy()
    expect(type.traits.length).toBeGreaterThan(0)
    expect(type.characters.length).toBeGreaterThan(0)
    expect(type.weakness).toBeTruthy()
  })

  it.each(ALL_TYPES)('%s has unique color', (id) => {
    const colors = ALL_TYPES.map((t) => nenTypes[t].color)
    const unique = new Set(colors)
    expect(unique.size).toBe(ALL_TYPES.length)
  })
})

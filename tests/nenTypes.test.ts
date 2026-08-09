import { describe, it, expect } from 'vitest'
import { nenTypes, nenCompatibility } from '../app/data/nenTypes'
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

describe('nenCompatibility data', () => {
  it('covers all 6 Nen types', () => {
    expect(Object.keys(nenCompatibility)).toHaveLength(6)
    for (const id of ALL_TYPES) {
      expect(nenCompatibility).toHaveProperty(id)
    }
  })

  it.each(ALL_TYPES)('%s has exactly 2 compatible types and 1 opposed', (id) => {
    const compat = nenCompatibility[id]
    expect(compat.compatible).toHaveLength(2)
    expect(typeof compat.opposed).toBe('string')
  })

  it.each(ALL_TYPES)('%s compatible types are valid NenTypeIds', (id) => {
    for (const c of nenCompatibility[id].compatible) {
      expect(ALL_TYPES).toContain(c)
      expect(nenTypes).toHaveProperty(c)
    }
  })

  it.each(ALL_TYPES)('%s opposed type is a valid NenTypeId', (id) => {
    const opposed = nenCompatibility[id].opposed
    expect(ALL_TYPES).toContain(opposed)
    expect(nenTypes).toHaveProperty(opposed)
  })

  it.each(ALL_TYPES)('%s is not in its own compatible or opposed list', (id) => {
    const compat = nenCompatibility[id]
    expect(compat.compatible).not.toContain(id)
    expect(compat.opposed).not.toBe(id)
  })

  it('opposition is symmetric (if A opposes B, B opposes A)', () => {
    for (const id of ALL_TYPES) {
      const opposed = nenCompatibility[id].opposed
      expect(nenCompatibility[opposed].opposed).toBe(id)
    }
  })

  it('compatibility is symmetric (if A is compatible with B, B is compatible with A)', () => {
    for (const id of ALL_TYPES) {
      for (const c of nenCompatibility[id].compatible) {
        expect(nenCompatibility[c].compatible).toContain(id)
      }
    }
  })
})

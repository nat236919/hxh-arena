import { describe, it, expect } from 'vitest'
import { nenTypes } from '../app/data/nenTypes'
import type { NenTypeId } from '../app/data/nenTypes'

const VALID_TYPES: NenTypeId[] = ['enhancer', 'transmuter', 'emitter', 'conjurer', 'manipulator', 'specialist']

// Mirrors the shared-link resolution logic in result.vue
function resolveTypeFromParam(param: string | undefined) {
  if (!param) return null
  const type = nenTypes[param as NenTypeId]
  return type ?? null
}

describe('result URL sharing', () => {
  it('resolves a valid type param to a NenType', () => {
    for (const id of VALID_TYPES) {
      const resolved = resolveTypeFromParam(id)
      expect(resolved).not.toBeNull()
      expect(resolved?.id).toBe(id)
    }
  })

  it('returns null for an invalid type param', () => {
    expect(resolveTypeFromParam('unknown')).toBeNull()
    expect(resolveTypeFromParam('gon')).toBeNull()
    expect(resolveTypeFromParam('')).toBeNull()
  })

  it('returns null for undefined param', () => {
    expect(resolveTypeFromParam(undefined)).toBeNull()
  })

  it('resolved type has all required fields for the result page', () => {
    for (const id of VALID_TYPES) {
      const type = resolveTypeFromParam(id)!
      expect(type.id).toBe(id)
      expect(type.name).toBeTruthy()
      expect(type.color).toBeTruthy()
      expect(type.description).toBeTruthy()
      expect(type.characterProfiles.length).toBeGreaterThan(0)
    }
  })

  it('all valid type IDs produce a shareable URL segment', () => {
    for (const id of VALID_TYPES) {
      const url = `/result?type=${id}`
      const param = new URLSearchParams(url.split('?')[1]).get('type')
      expect(resolveTypeFromParam(param!)).not.toBeNull()
    }
  })
})

// Mirrors the quizSkipped computed in result.vue.
function deriveQuizSkipped(quizResultId: string | null, typeParam: string | undefined, totalScore: number): boolean {
  if (!quizResultId) return true
  if (typeParam !== quizResultId) return true
  return totalScore === 0
}

describe('quizSkipped flag', () => {
  it('is false when quiz result matches URL param and scores are non-zero', () => {
    for (const id of VALID_TYPES) {
      expect(deriveQuizSkipped(id, id, 42)).toBe(false)
    }
  })

  it('is true when no quiz result is stored (direct URL share)', () => {
    for (const id of VALID_TYPES) {
      expect(deriveQuizSkipped(null, id, 0)).toBe(true)
    }
  })

  it('is true when URL param was changed to a different type', () => {
    expect(deriveQuizSkipped('transmuter', 'specialist', 42)).toBe(true)
    expect(deriveQuizSkipped('enhancer', 'conjurer', 42)).toBe(true)
  })

  it('is true when user changes back to their real type but scores are zero', () => {
    // URL matches stored result but quiz was never actually answered
    expect(deriveQuizSkipped('transmuter', 'transmuter', 0)).toBe(true)
  })

  it('is true when param is undefined and no quiz result stored', () => {
    expect(deriveQuizSkipped(null, undefined, 0)).toBe(true)
  })
})

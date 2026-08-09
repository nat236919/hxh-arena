import { describe, it, expect } from 'vitest'
import { questions } from '../app/data/questions'
import type { NenTypeId } from '../app/data/nenTypes'

const VALID_TYPES: NenTypeId[] = ['enhancer', 'transmuter', 'emitter', 'conjurer', 'manipulator', 'specialist']

describe('questions data', () => {
  it('has at least 10 questions', () => {
    expect(questions.length).toBeGreaterThanOrEqual(10)
  })

  it('has unique ids', () => {
    const ids = questions.map((q) => q.id)
    expect(new Set(ids).size).toBe(questions.length)
  })

  it.each(questions)('question $id has valid structure', (q) => {
    expect(q.text).toBeTruthy()
    expect(q.answers.length).toBeGreaterThanOrEqual(2)
    expect(q.answers.length).toBeLessThanOrEqual(6)
  })

  it.each(questions)('question $id answers have valid Nen type scores', (q) => {
    for (const answer of q.answers) {
      expect(answer.text).toBeTruthy()
      const scoredTypes = Object.keys(answer.scores) as NenTypeId[]
      expect(scoredTypes.length).toBeGreaterThan(0)
      for (const type of scoredTypes) {
        expect(VALID_TYPES).toContain(type)
        expect(answer.scores[type]).toBeGreaterThan(0)
      }
    }
  })

  it('every Nen type is scored at least once across all questions', () => {
    const covered = new Set<NenTypeId>()
    for (const q of questions) {
      for (const answer of q.answers) {
        for (const type of Object.keys(answer.scores) as NenTypeId[]) {
          covered.add(type)
        }
      }
    }
    for (const type of VALID_TYPES) {
      expect(covered).toContain(type)
    }
  })
})

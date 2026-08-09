import { describe, it, expect } from 'vitest'
import { questions } from '../app/data/questions'
import type { NenTypeId } from '../app/data/nenTypes'

const VALID_TYPES: NenTypeId[] = ['enhancer', 'transmuter', 'emitter', 'conjurer', 'manipulator', 'specialist']

describe('questions data', () => {
  it('has exactly 20 questions', () => {
    expect(questions.length).toBe(20)
  })

  it('has unique ids', () => {
    const ids = questions.map((q) => q.id)
    expect(new Set(ids).size).toBe(questions.length)
  })

  it('ids are sequential starting from 1', () => {
    const ids = questions.map((q) => q.id).sort((a, b) => a - b)
    ids.forEach((id, i) => expect(id).toBe(i + 1))
  })

  it.each(questions)('question $id has valid structure', (q) => {
    expect(q.text).toBeTruthy()
    expect(q.answers.length).toBeGreaterThanOrEqual(2)
    expect(q.answers.length).toBeLessThanOrEqual(6)
  })

  it.each(questions)('question $id has between 4 and 6 answers', (q) => {
    expect(q.answers.length).toBeGreaterThanOrEqual(4)
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

  it.each(questions)('question $id has no duplicate answer texts', (q) => {
    const texts = q.answers.map(a => a.text)
    expect(new Set(texts).size).toBe(texts.length)
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

  it('every Nen type appears as a dominant score (score >= 2) in at least one answer', () => {
    const dominant = new Set<NenTypeId>()
    for (const q of questions) {
      for (const answer of q.answers) {
        for (const [type, pts] of Object.entries(answer.scores) as [NenTypeId, number][]) {
          if (pts >= 2) dominant.add(type)
        }
      }
    }
    for (const type of VALID_TYPES) {
      expect(dominant).toContain(type)
    }
  })
})

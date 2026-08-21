import { describe, it, expect } from 'vitest'
import { containsProfanity, validateHunterName } from '../app/lib/profanity'

describe('containsProfanity', () => {
  it('returns false for clean names', () => {
    expect(containsProfanity('Gon')).toBe(false)
    expect(containsProfanity('Shadow Hunter')).toBe(false)
    expect(containsProfanity('Killua.Z')).toBe(false)
  })

  it('detects a blocked word', () => {
    expect(containsProfanity('fuck')).toBe(true)
    expect(containsProfanity('shit')).toBe(true)
  })

  it('is case-insensitive', () => {
    expect(containsProfanity('FUCK')).toBe(true)
    expect(containsProfanity('Shit')).toBe(true)
  })

  it('detects l33t substitutions', () => {
    expect(containsProfanity('sh1t')).toBe(true)   // 1 -> i: sh1t -> shit
    expect(containsProfanity('@ss')).toBe(true)    // @ -> a: @ss -> ass
    expect(containsProfanity('$hit')).toBe(true)   // $ -> s: $hit -> shit
    expect(containsProfanity('a55')).toBe(true)    // 5 -> s: a55 -> ass
    expect(containsProfanity('pr1ck')).toBe(true)  // 1 -> i: pr1ck -> prick
    expect(containsProfanity('f3ck')).toBe(false)  // 3->e produces 'feck' which is not blocked
  })

  it('strips spaces and punctuation before checking', () => {
    expect(containsProfanity('f u c k')).toBe(true)
    expect(containsProfanity('s.h.i.t')).toBe(true)
  })
})

describe('validateHunterName', () => {
  it('returns null for valid names', () => {
    expect(validateHunterName('Gon')).toBeNull()
    expect(validateHunterName('Shadow Hunter')).toBeNull()
    expect(validateHunterName("D'Angelo")).toBeNull()
    expect(validateHunterName('Jon-Snow')).toBeNull()
    expect(validateHunterName('Mr. Smith')).toBeNull()
  })

  it('rejects names shorter than 2 characters', () => {
    expect(validateHunterName('A')).toBe('Name must be at least 2 characters.')
    expect(validateHunterName('')).toBe('Name must be at least 2 characters.')
    expect(validateHunterName('  ')).toBe('Name must be at least 2 characters.')
  })

  it('rejects names longer than 24 characters', () => {
    expect(validateHunterName('A'.repeat(25))).toBe('Name must be 24 characters or fewer.')
    expect(validateHunterName('A'.repeat(24))).toBeNull()
  })

  it('rejects names with disallowed characters', () => {
    expect(validateHunterName('Ha<script>')).toBeTruthy()
    expect(validateHunterName('name!')).toBeTruthy()
    expect(validateHunterName('name@domain')).toBeTruthy()
  })

  it('rejects names containing profanity', () => {
    expect(validateHunterName('FuckHunter')).toBe('That name is not allowed.')
  })

  it('trims leading/trailing whitespace before length check', () => {
    expect(validateHunterName(' A ')).toBe('Name must be at least 2 characters.')
    expect(validateHunterName(' Gon ')).toBeNull()
  })
})

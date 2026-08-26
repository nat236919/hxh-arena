import { describe, it, expect } from 'vitest'

const PAGE_SIZE = 10

// Mirrors pagination logic in profile.vue
function totalPages(total: number, pageSize = PAGE_SIZE): number {
  return Math.ceil(total / pageSize)
}

function pageRange(page: number, pageSize = PAGE_SIZE): { from: number; to: number } {
  return { from: page * pageSize, to: page * pageSize + pageSize - 1 }
}

// Mirrors win rate logic in profile.vue: W/L/D from character record, not fight log count
function calcWinRate(wins: number, losses: number, draws: number): number {
  const total = wins + losses + draws
  if (total === 0) return 0
  return Math.round((wins / total) * 100)
}

// Mirrors totalFights in profile.vue: always W+L+D from character record
function calcTotalFights(wins: number, losses: number, draws: number): number {
  return wins + losses + draws
}

describe('fight history pagination', () => {
  it('single page when total fits in one page', () => {
    expect(totalPages(5)).toBe(1)
    expect(totalPages(10)).toBe(1)
  })

  it('multiple pages when total exceeds page size', () => {
    expect(totalPages(11)).toBe(2)
    expect(totalPages(20)).toBe(2)
    expect(totalPages(21)).toBe(3)
    expect(totalPages(91)).toBe(10)
  })

  it('zero pages when no fights', () => {
    expect(totalPages(0)).toBe(0)
  })

  it('page 0 fetches rows 0-9', () => {
    expect(pageRange(0)).toEqual({ from: 0, to: 9 })
  })

  it('page 1 fetches rows 10-19', () => {
    expect(pageRange(1)).toEqual({ from: 10, to: 19 })
  })

  it('page 8 fetches rows 80-89', () => {
    expect(pageRange(8)).toEqual({ from: 80, to: 89 })
  })

  it('last page range is consistent with total', () => {
    const total = 91
    const lastPage = totalPages(total) - 1 // page 9
    const { from, to } = pageRange(lastPage)
    expect(from).toBe(90)
    expect(to).toBe(99) // Supabase range is inclusive; server returns only the 1 remaining row
  })
})

describe('profile win rate', () => {
  it('uses W+L+D from character record, not fight log count', () => {
    // Fight log may have 90 rows but character record shows 91 total
    const wins = 57; const losses = 24; const draws = 10
    expect(calcTotalFights(wins, losses, draws)).toBe(91)
    expect(calcWinRate(wins, losses, draws)).toBe(63)
  })

  it('is 0 when no fights recorded', () => {
    expect(calcWinRate(0, 0, 0)).toBe(0)
    expect(calcTotalFights(0, 0, 0)).toBe(0)
  })

  it('is 100 when all fights are wins', () => {
    expect(calcWinRate(10, 0, 0)).toBe(100)
  })

  it('rounds to nearest integer', () => {
    // 1 win out of 3 = 33.33% -> 33
    expect(calcWinRate(1, 2, 0)).toBe(33)
    // 2 wins out of 3 = 66.66% -> 67
    expect(calcWinRate(2, 1, 0)).toBe(67)
  })
})

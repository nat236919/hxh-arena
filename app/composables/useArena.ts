import { useSupabase } from '~/lib/supabase'
import type { Character, NenTypeId } from '~/lib/supabase'
import { npcs } from '~/data/npcs'
import type { NPC } from '~/data/npcs'
import { nenCompatibility } from '~/data/nenTypes'

export type { Character }

export interface FightOpponent {
  id: string
  name: string
  nen_type: NenTypeId
  strength_speed: number
  aura: number
  defense: number
  intelligence: number
  is_npc: boolean
  portrait?: string
  wins?: number
  losses?: number
  draws?: number
}

export type MatchupLabel = 'affinity' | 'clash' | 'neutral'

export interface FightResult {
  winner: 'challenger' | 'opponent' | 'draw'
  challengerRoll: number
  opponentRoll: number
  challengerPower: number
  opponentPower: number
  opponent: FightOpponent
  challengerMatchup: MatchupLabel
  opponentMatchup: MatchupLabel
}

const NEN_BONUS: Record<NenTypeId, number> = {
  enhancer: 1.4,
  emitter: 1.3,
  transmuter: 1.2,
  conjurer: 1.1,
  manipulator: 1.0,
  specialist: 1.0, // specialist uses random 0.8–1.6 at fight time
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

function getMatchupLabel(attackerType: NenTypeId, defenderType: NenTypeId): MatchupLabel {
  const m = getMatchupMultiplier(attackerType, defenderType)
  if (m > 1) return 'affinity'
  if (m < 1) return 'clash'
  return 'neutral'
}

function calcPower(char: Pick<Character | NPC, 'nen_type' | 'strength_speed' | 'aura' | 'defense' | 'intelligence'>, roll: number, opponentNenType?: NenTypeId): number {
  const bonus = char.nen_type === 'specialist'
    ? 0.8 + Math.random() * 0.8
    : NEN_BONUS[char.nen_type]
  const basePower = (char.strength_speed * bonus) + char.aura + (char.defense * 0.8) + (char.intelligence * 0.9) + roll
  const matchup = opponentNenType ? getMatchupMultiplier(char.nen_type as NenTypeId, opponentNenType) : 1.0
  return basePower * matchup
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyTable = any

export function useArena() {
  const supabase = useSupabase()
  const db = supabase as unknown as { from: (table: string) => AnyTable }

  async function registerCharacter(nenType: NenTypeId, name: string): Promise<{ id: string; token: string }> {
    const token = crypto.randomUUID()
    const { data, error } = await db
      .from('characters')
      .insert({ nen_type: nenType, name: name.trim(), secret_token: token })
      .select('id')
      .single()
    if (error) throw error
    return { id: data.id, token }
  }

  async function loadCharacter(id: string): Promise<Character | null> {
    const { data, error } = await db
      .from('characters')
      .select('id, nen_type, name, strength_speed, aura, defense, intelligence, stats_locked, wins, losses, draws, secret_token')
      .eq('id', id)
      .single()
    if (error) return null
    return data as Character
  }

  async function lockStats(id: string, token: string, stats: { strength_speed: number; aura: number; defense: number; intelligence: number }): Promise<void> {
    const { error } = await db
      .from('characters')
      .update({ ...stats, stats_locked: true })
      .eq('id', id)
      .eq('secret_token', token)
    if (error) throw error
  }

  async function loadOpponentPool(excludeId: string): Promise<FightOpponent[]> {
    const { data } = await db
      .from('characters')
      .select('id, name, nen_type, strength_speed, aura, defense, intelligence, wins, losses, draws')
      .neq('id', excludeId)
      .eq('stats_locked', true)

    const registered: FightOpponent[] = (data ?? []).map((c: any) => ({
      id: c.id,
      name: c.name ?? `Hunter #${c.id.slice(0, 8).toUpperCase()}`,
      nen_type: c.nen_type,
      strength_speed: c.strength_speed,
      aura: c.aura,
      defense: c.defense,
      intelligence: c.intelligence,
      is_npc: false,
      wins: c.wins,
      losses: c.losses,
      draws: c.draws,
    }))

    const npcOpponents: FightOpponent[] = npcs.map(n => ({
      ...n,
      is_npc: true,
    }))

    return [...registered, ...npcOpponents]
  }

  function pickRandomOpponent(pool: FightOpponent[]): FightOpponent {
    return pool[Math.floor(Math.random() * pool.length)]!
  }

  async function conductFight(challenger: Character, opponent: FightOpponent, challengerToken: string): Promise<FightResult> {
    const challengerRoll = roll2d6()
    const opponentRoll = roll2d6()
    const challengerPower = calcPower(challenger, challengerRoll, opponent.nen_type)
    const opponentPower = calcPower(opponent, opponentRoll, challenger.nen_type as NenTypeId)
    const challengerMatchup = getMatchupLabel(challenger.nen_type as NenTypeId, opponent.nen_type)
    const opponentMatchup = getMatchupLabel(opponent.nen_type, challenger.nen_type as NenTypeId)

    let winner: 'challenger' | 'opponent' | 'draw'
    const diff = Math.abs(challengerPower - opponentPower)
    if (diff < 0.5) {
      winner = 'draw'
    } else if (challengerPower > opponentPower) {
      winner = 'challenger'
    } else {
      winner = 'opponent'
    }

    // update W/L/D for challenger
    const challengerUpdate = winner === 'challenger'
      ? { wins: challenger.wins + 1 }
      : winner === 'opponent'
        ? { losses: challenger.losses + 1 }
        : { draws: challenger.draws + 1 }

    await db.from('characters').update(challengerUpdate).eq('id', challenger.id).eq('secret_token', challengerToken)

    // update W/L/D for registered opponent
    if (!opponent.is_npc) {
      const opponentUpdate = winner === 'opponent'
        ? { wins: (opponent.wins ?? 0) + 1 }
        : winner === 'challenger'
          ? { losses: (opponent.losses ?? 0) + 1 }
          : { draws: (opponent.draws ?? 0) + 1 }
      await db.from('characters').update(opponentUpdate).eq('id', opponent.id)
    }

    // log the fight
    await db.from('fight_log').insert({
      challenger_id: challenger.id,
      opponent_id: opponent.is_npc ? null : opponent.id,
      opponent_is_npc: opponent.is_npc,
      challenger_roll: challengerRoll,
      opponent_roll: opponentRoll,
      winner,
    })

    return { winner, challengerRoll, opponentRoll, challengerPower, opponentPower, opponent, challengerMatchup, opponentMatchup }
  }

  async function loadLeaderboard(limit = 10): Promise<{ id: string; name: string | null; nen_type: NenTypeId; wins: number; losses: number; draws: number; winRate: number }[]> {
    const { data } = await db
      .from('characters')
      .select('id, name, nen_type, wins, losses, draws')
      .eq('stats_locked', true)
      .order('wins', { ascending: false })
      .limit(100)
    const rows = (data ?? []) as { id: string; name: string | null; nen_type: NenTypeId; wins: number; losses: number; draws: number }[]
    return rows
      .map(r => {
        const total = r.wins + r.losses + r.draws
        return { ...r, winRate: total > 0 ? r.wins / total : 0 }
      })
      .filter(r => (r.wins + r.losses + r.draws) >= 10)
      .sort((a, b) => b.winRate - a.winRate || b.wins - a.wins)
      .slice(0, limit)
  }

  async function loadLatestFight(): Promise<{
    challengerName: string
    challengerNen: NenTypeId
    challengerRoll: number
    opponentName: string
    opponentNen: NenTypeId
    opponentRoll: number
    winner: 'challenger' | 'opponent' | 'draw'
  } | null> {
    const { data: log } = await db
      .from('fight_log')
      .select('challenger_id, opponent_id, opponent_is_npc, challenger_roll, opponent_roll, winner')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    if (!log) return null

    const challengerPromise = db
      .from('characters')
      .select('name, nen_type')
      .eq('id', log.challenger_id)
      .single()

    let opponentName = 'Unknown'
    let opponentNen: NenTypeId = 'enhancer'

    if (log.opponent_is_npc) {
      const npc = npcs.find(n => n.id === log.opponent_id) ?? null
      if (npc) { opponentName = npc.name; opponentNen = npc.nen_type }
      const { data: challenger } = await challengerPromise
      return {
        challengerName: challenger?.name ?? `Hunter #${log.challenger_id.slice(0, 8).toUpperCase()}`,
        challengerNen: challenger?.nen_type as NenTypeId ?? 'enhancer',
        challengerRoll: log.challenger_roll,
        opponentName,
        opponentNen,
        opponentRoll: log.opponent_roll,
        winner: log.winner,
      }
    }

    const opponentPromise = log.opponent_id
      ? db.from('characters').select('name, nen_type').eq('id', log.opponent_id).single()
      : Promise.resolve({ data: null })

    const [{ data: challenger }, { data: opp }] = await Promise.all([challengerPromise, opponentPromise])

    if (opp) {
      opponentName = opp.name ?? `Hunter #${log.opponent_id.slice(0, 8).toUpperCase()}`
      opponentNen = opp.nen_type as NenTypeId
    }

    return {
      challengerName: challenger?.name ?? `Hunter #${log.challenger_id.slice(0, 8).toUpperCase()}`,
      challengerNen: challenger?.nen_type as NenTypeId ?? 'enhancer',
      challengerRoll: log.challenger_roll,
      opponentName,
      opponentNen,
      opponentRoll: log.opponent_roll,
      winner: log.winner,
    }
  }

  return { registerCharacter, loadCharacter, lockStats, loadOpponentPool, pickRandomOpponent, conductFight, loadLeaderboard, loadLatestFight }
}

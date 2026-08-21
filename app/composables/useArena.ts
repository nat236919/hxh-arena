import { useSupabase } from '~/lib/supabase'
import type { Character, NenTypeId } from '~/lib/supabase'
import { npcs } from '~/data/npcs'
import type { NPC } from '~/data/npcs'

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

export interface FightResult {
  winner: 'challenger' | 'opponent' | 'draw'
  challengerRoll: number
  opponentRoll: number
  challengerPower: number
  opponentPower: number
  opponent: FightOpponent
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

function calcPower(char: Pick<Character | NPC, 'nen_type' | 'strength_speed' | 'aura' | 'defense' | 'intelligence'>, roll: number): number {
  const bonus = char.nen_type === 'specialist'
    ? 0.8 + Math.random() * 0.8
    : NEN_BONUS[char.nen_type]
  return (char.strength_speed * bonus) + char.aura + (char.defense * 0.8) + (char.intelligence * 0.9) + roll
}

export function useArena() {
  const supabase = useSupabase()

  async function registerCharacter(nenType: NenTypeId, name: string): Promise<string> {
    const { data, error } = await supabase
      .from('characters')
      .insert({ nen_type: nenType, name: name.trim() })
      .select('id')
      .single()
    if (error) throw error
    return data.id
  }

  async function loadCharacter(id: string): Promise<Character | null> {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .eq('id', id)
      .single()
    if (error) return null
    return data as Character
  }

  async function lockStats(id: string, stats: { strength_speed: number; aura: number; defense: number; intelligence: number }): Promise<void> {
    const { error } = await supabase
      .from('characters')
      .update({ ...stats, stats_locked: true })
      .eq('id', id)
    if (error) throw error
  }

  async function loadOpponentPool(excludeId: string): Promise<FightOpponent[]> {
    const { data } = await supabase
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
    return pool[Math.floor(Math.random() * pool.length)]
  }

  async function conductFight(challenger: Character, opponent: FightOpponent): Promise<FightResult> {
    const challengerRoll = roll2d6()
    const opponentRoll = roll2d6()
    const challengerPower = calcPower(challenger, challengerRoll)
    const opponentPower = calcPower(opponent, opponentRoll)

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

    await supabase.from('characters').update(challengerUpdate).eq('id', challenger.id)

    // update W/L/D for registered opponent
    if (!opponent.is_npc) {
      const opponentUpdate = winner === 'opponent'
        ? { wins: (opponent.wins ?? 0) + 1 }
        : winner === 'challenger'
          ? { losses: (opponent.losses ?? 0) + 1 }
          : { draws: (opponent.draws ?? 0) + 1 }
      await supabase.from('characters').update(opponentUpdate).eq('id', opponent.id)
    }

    // log the fight
    await supabase.from('fight_log').insert({
      challenger_id: challenger.id,
      opponent_id: opponent.is_npc ? null : opponent.id,
      opponent_is_npc: opponent.is_npc,
      challenger_roll: challengerRoll,
      opponent_roll: opponentRoll,
      winner,
    })

    return { winner, challengerRoll, opponentRoll, challengerPower, opponentPower, opponent }
  }

  async function loadLeaderboard(limit = 10): Promise<{ id: string; name: string | null; nen_type: NenTypeId; wins: number; losses: number; draws: number; winRate: number }[]> {
    const { data } = await supabase
      .from('characters')
      .select('id, name, nen_type, wins, losses, draws')
      .eq('stats_locked', true)
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
    const { data: log } = await supabase
      .from('fight_log')
      .select('challenger_id, opponent_id, opponent_is_npc, challenger_roll, opponent_roll, winner')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    if (!log) return null

    const { data: challenger } = await supabase
      .from('characters')
      .select('name, nen_type')
      .eq('id', log.challenger_id)
      .single()

    let opponentName = 'Unknown'
    let opponentNen: NenTypeId = 'enhancer'

    if (log.opponent_is_npc) {
      const npc = npcs.find(n => n.id === log.opponent_id) ?? null
      if (npc) { opponentName = npc.name; opponentNen = npc.nen_type }
    } else if (log.opponent_id) {
      const { data: opp } = await supabase
        .from('characters')
        .select('name, nen_type')
        .eq('id', log.opponent_id)
        .single()
      if (opp) {
        opponentName = opp.name ?? `Hunter #${log.opponent_id.slice(0, 8).toUpperCase()}`
        opponentNen = opp.nen_type as NenTypeId
      }
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

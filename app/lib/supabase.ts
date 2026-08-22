import { createClient } from '@supabase/supabase-js'

export type NenTypeId = 'enhancer' | 'transmuter' | 'emitter' | 'conjurer' | 'manipulator' | 'specialist'

export interface Character {
  id: string
  name: string | null
  nen_type: NenTypeId
  strength_speed: number
  aura: number
  defense: number
  intelligence: number
  stats_locked: boolean
  wins: number
  losses: number
  draws: number
  created_at?: string
  secret_token?: string
}

export interface FightLog {
  id: string
  challenger_id: string
  opponent_id: string | null
  opponent_is_npc: boolean
  challenger_roll: number
  opponent_roll: number
  winner: 'challenger' | 'opponent' | 'draw'
  created_at: string
}

let _client: ReturnType<typeof createClient> | null = null

export function useSupabase() {
  if (_client) return _client
  const config = useRuntimeConfig()
  _client = createClient(config.public.supabaseUrl, config.public.supabaseKey)
  return _client
}

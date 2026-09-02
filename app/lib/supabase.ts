import { createClient } from '@supabase/supabase-js'
import type { Database, Tables } from '~/lib/database.types'

export type NenTypeId = 'enhancer' | 'transmuter' | 'emitter' | 'conjurer' | 'manipulator' | 'specialist'

export type Character = Omit<Tables<'characters'>, 'secret_token' | 'created_at'> & {
  nen_type: NenTypeId
  created_at?: string
}

export type FightLog = Tables<'fight_log'> & {
  winner: 'challenger' | 'opponent' | 'draw'
  challenger_nen_type: NenTypeId | null
  opponent_nen_type: NenTypeId | null
}

let _client: ReturnType<typeof createClient<Database>> | null = null

export function useSupabase() {
  if (_client) return _client
  const config = useRuntimeConfig()
  _client = createClient<Database>(config.public.supabaseUrl, config.public.supabaseKey)
  return _client
}

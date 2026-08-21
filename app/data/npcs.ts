import type { NenTypeId } from '~/lib/supabase'

export interface NPC {
  id: string
  name: string
  nen_type: NenTypeId
  strength_speed: number
  aura: number
  defense: number
  intelligence: number
  portrait?: string
}

export const npcs: NPC[] = [
  {
    id: 'npc-gon',
    name: 'Gon Freecss',
    nen_type: 'enhancer',
    strength_speed: 8,
    aura: 5,
    defense: 4,
    intelligence: 3,
    portrait: '/characters/gon.webp',
  },
  {
    id: 'npc-killua',
    name: 'Killua Zoldyck',
    nen_type: 'transmuter',
    strength_speed: 7,
    aura: 5,
    defense: 4,
    intelligence: 4,
    portrait: '/characters/killua.webp',
  },
  {
    id: 'npc-kurapika',
    name: 'Kurapika',
    nen_type: 'conjurer',
    strength_speed: 4,
    aura: 6,
    defense: 4,
    intelligence: 6,
    portrait: '/characters/kurapika.webp',
  },
  {
    id: 'npc-leorio',
    name: 'Leorio Paradinight',
    nen_type: 'emitter',
    strength_speed: 5,
    aura: 7,
    defense: 4,
    intelligence: 4,
    portrait: '/characters/leorio.webp',
  },
  {
    id: 'npc-hisoka',
    name: 'Hisoka Morow',
    nen_type: 'transmuter',
    strength_speed: 8,
    aura: 6,
    defense: 3,
    intelligence: 3,
    portrait: '/characters/hisoka.webp',
  },
  {
    id: 'npc-illumi',
    name: 'Illumi Zoldyck',
    nen_type: 'manipulator',
    strength_speed: 5,
    aura: 5,
    defense: 4,
    intelligence: 6,
    portrait: '/characters/illumi.webp',
  },
  {
    id: 'npc-chrollo',
    name: 'Chrollo Lucilfer',
    nen_type: 'specialist',
    strength_speed: 5,
    aura: 6,
    defense: 4,
    intelligence: 5,
    portrait: '/characters/chrollo.webp',
  },
  {
    id: 'npc-uvogin',
    name: 'Uvogin',
    nen_type: 'enhancer',
    strength_speed: 10,
    aura: 5,
    defense: 4,
    intelligence: 1,
    portrait: '/characters/uvogin.webp',
  },
  {
    id: 'npc-morel',
    name: 'Morel Mackernasey',
    nen_type: 'manipulator',
    strength_speed: 4,
    aura: 6,
    defense: 4,
    intelligence: 6,
    portrait: '/characters/morel.webp',
  },
  {
    id: 'npc-franklin',
    name: 'Franklin Bordeau',
    nen_type: 'emitter',
    strength_speed: 6,
    aura: 8,
    defense: 3,
    intelligence: 3,
    portrait: '/characters/franklin.webp',
  },
]

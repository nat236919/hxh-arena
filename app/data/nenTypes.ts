export type NenTypeId = 'enhancer' | 'transmuter' | 'emitter' | 'conjurer' | 'manipulator' | 'specialist'

export interface NenType {
  id: NenTypeId
  name: string
  japaneseName: string
  color: string
  glowColor: string
  auraColor: string
  description: string
  traits: string[]
  characters: string[]
  weakness: string
}

export const nenTypes: Record<NenTypeId, NenType> = {
  enhancer: {
    id: 'enhancer',
    name: 'Enhancer',
    japaneseName: '強化系',
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.6)',
    auraColor: '#fca5a5',
    description:
      'Enhancers are straightforward and determined. You amplify the natural properties of things — your body, your will, your resolve. The most physically powerful of all Nen types, Enhancers charge forward without hesitation. Simple goals, iron conviction.',
    traits: ['Determined', 'Straightforward', 'Strong-willed', 'Stubborn', 'Reliable'],
    characters: ['Gon Freecss', 'Uvogin', 'Rammot'],
    weakness: 'Can be too single-minded; strategy is not your strength.',
  },
  transmuter: {
    id: 'transmuter',
    name: 'Transmuter',
    japaneseName: '変化系',
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.6)',
    auraColor: '#d8b4fe',
    description:
      'Transmuters are whimsical and unpredictable. You change the properties of your aura into something entirely different — lightning, rubber, poison. Clever and adaptable, you thrive on creativity and surprise. No one can predict your next move.',
    traits: ['Whimsical', 'Deceptive', 'Creative', 'Adaptable', 'Unpredictable'],
    characters: ['Killua Zoldyck', 'Hisoka Morow', 'Biscuit Krueger'],
    weakness: 'Can be inconsistent; your nature makes long-term focus difficult.',
  },
  emitter: {
    id: 'emitter',
    name: 'Emitter',
    japaneseName: '放出系',
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.6)',
    auraColor: '#fdba74',
    description:
      'Emitters are impatient and hot-blooded. You project your aura far beyond your body, striking at a distance with raw force. Quick to act and quick to anger, you do not like to wait. Distance means nothing to your power.',
    traits: ['Impatient', 'Hot-tempered', 'Action-oriented', 'Persistent', 'Bold'],
    characters: ['Leorio Paradinight', 'Franklin Bordeau', 'Razor'],
    weakness: 'Impatience can lead to rash decisions under pressure.',
  },
  conjurer: {
    id: 'conjurer',
    name: 'Conjurer',
    japaneseName: '具現化系',
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.6)',
    auraColor: '#93c5fd',
    description:
      'Conjurers are neurotic and detail-obsessed. You materialize physical objects from your aura with painstaking precision. Your abilities require strict rules and conditions — but within those rules, you create something no one else can. Discipline is your power.',
    traits: ['Meticulous', 'Disciplined', 'Anxious', 'Rule-bound', 'Precise'],
    characters: ['Kurapika', 'Shizuku Murasaki', 'Kortopi'],
    weakness: 'Rigid rules can be exploited by flexible opponents.',
  },
  manipulator: {
    id: 'manipulator',
    name: 'Manipulator',
    japaneseName: '操作系',
    color: '#22c55e',
    glowColor: 'rgba(34, 197, 94, 0.6)',
    auraColor: '#86efac',
    description:
      'Manipulators are logical and self-interested. You impose your will on others — people, animals, objects — bending them to your purpose. Cold, calculating, and strategic, you always think several moves ahead. You prefer to control the situation rather than fight directly.',
    traits: ['Logical', 'Calculated', 'Self-interested', 'Patient', 'Controlling'],
    characters: ['Illumi Zoldyck', 'Shalnark', 'Morel Mackernasey'],
    weakness: 'Overconfidence in your plans can leave you exposed to the unexpected.',
  },
  specialist: {
    id: 'specialist',
    name: 'Specialist',
    japaneseName: '特質系',
    color: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.6)',
    auraColor: '#fde047',
    description:
      'Specialists are rare and enigmatic. Your Nen does not fit neatly into any category — it is uniquely your own. Often misunderstood, you walk a path others cannot follow. Your power is singular, strange, and beyond classification. You were simply born different.',
    traits: ['Unique', 'Mysterious', 'Unpredictable', 'Independent', 'Rare'],
    characters: ['Chrollo Lucilfer', 'Neon Nostrade', 'Ging Freecss'],
    weakness: 'Your uniqueness can make you isolated and hard to support.',
  },
}

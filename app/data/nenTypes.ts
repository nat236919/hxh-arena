export type NenTypeId = 'enhancer' | 'transmuter' | 'emitter' | 'conjurer' | 'manipulator' | 'specialist'

export interface CharacterProfile {
  name: string
  title: string
  portrait?: string
  abilities: { name: string; description: string }[]
}

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
  characterProfiles: CharacterProfile[]
  weakness: string
}

// Nen wheel order (HxH canon): Enhancer - Transmuter - Conjurer - Specialist - Manipulator - Emitter
// Adjacent = compatible (easiest to learn), opposite = most opposed
export const nenCompatibility: Record<NenTypeId, { compatible: NenTypeId[]; opposed: NenTypeId }> = {
  enhancer: { compatible: ['transmuter', 'emitter'], opposed: 'specialist' },
  transmuter: { compatible: ['enhancer', 'conjurer'], opposed: 'manipulator' },
  conjurer: { compatible: ['transmuter', 'specialist'], opposed: 'emitter' },
  specialist: { compatible: ['conjurer', 'manipulator'], opposed: 'enhancer' },
  manipulator: { compatible: ['specialist', 'emitter'], opposed: 'transmuter' },
  emitter: { compatible: ['manipulator', 'enhancer'], opposed: 'conjurer' },
}

export const nenTypes: Record<NenTypeId, NenType> = {
  enhancer: {
    id: 'enhancer',
    name: 'Enhancer',
    japaneseName: '強化系',
    color: '#E8A000',
    glowColor: 'rgba(232, 160, 0, 0.6)',
    auraColor: '#FFD060',
    description:
      'Enhancers are straightforward and determined. You amplify the natural properties of things — your body, your will, your resolve. The most physically powerful of all Nen types, Enhancers charge forward without hesitation. Simple goals, iron conviction.',
    traits: ['Determined', 'Straightforward', 'Strong-willed', 'Stubborn', 'Reliable'],
    characters: ['Gon Freecss', 'Uvogin', 'Rammot'],
    characterProfiles: [
      {
        name: 'Gon Freecss',
        title: 'Rookie Hunter',
        portrait: '/characters/gon.webp',
        abilities: [
          { name: 'Jajanken: Rock', description: 'Concentrates all aura into the fist for a devastating punch.' },
          { name: 'Jajanken: Scissors', description: 'Fires a blade of aura from two extended fingers.' },
          { name: 'Jajanken: Paper', description: 'Releases a burst of aura in a powerful shockwave.' },
          { name: 'Adult Gon Transformation', description: 'Sacrifices all future potential to achieve maximum power instantly.' },
        ],
      },
      {
        name: 'Uvogin',
        title: 'Phantom Troupe Member #11',
        portrait: '/characters/uvogin.webp',
        abilities: [
          { name: 'Big Bang Impact', description: 'A single punch loaded with concentrated aura — the most powerful Enhancer strike shown.' },
          { name: 'Scream', description: 'Releases aura as sound, creating a shockwave powerful enough to destroy the ground.' },
        ],
      },
    ],
    weakness: 'Can be too single-minded; strategy is not your strength.',
  },
  transmuter: {
    id: 'transmuter',
    name: 'Transmuter',
    japaneseName: '変化系',
    color: '#6B3FD4',
    glowColor: 'rgba(107, 63, 212, 0.6)',
    auraColor: '#A888FF',
    description:
      'Transmuters are whimsical and unpredictable. You change the properties of your aura into something entirely different — lightning, rubber, poison. Clever and adaptable, you thrive on creativity and surprise. No one can predict your next move.',
    traits: ['Whimsical', 'Deceptive', 'Creative', 'Adaptable', 'Unpredictable'],
    characters: ['Killua Zoldyck', 'Hisoka Morow', 'Biscuit Krueger'],
    characterProfiles: [
      {
        name: 'Killua Zoldyck',
        title: 'Assassin & Hunter',
        portrait: '/characters/killua.webp',
        abilities: [
          { name: 'Godspeed (Kanmuru)', description: 'Electricity flows through his body, moving at the speed of lightning reflexes.' },
          { name: 'Thunderbolt', description: 'Discharges a bolt of electricity powerful enough to stun or kill.' },
          { name: 'Whirlwind (Raikou)', description: 'Electricity coats his hands for instantaneous strikes.' },
        ],
      },
      {
        name: 'Hisoka Morow',
        title: 'Magician & Hunter Exam Examiner',
        portrait: '/characters/hisoka.webp',
        abilities: [
          { name: 'Bungee Gum', description: 'Aura with the properties of both rubber and gum — stretches, sticks, and snaps back.' },
          { name: 'Texture Surprise', description: 'Prints any texture or pattern onto a flat surface, used for deception.' },
        ],
      },
    ],
    weakness: 'Can be inconsistent; your nature makes long-term focus difficult.',
  },
  emitter: {
    id: 'emitter',
    name: 'Emitter',
    japaneseName: '放出系',
    color: '#E05010',
    glowColor: 'rgba(224, 80, 16, 0.6)',
    auraColor: '#FF8844',
    description:
      'Emitters are impatient and hot-blooded. You project your aura far beyond your body, striking at a distance with raw force. Quick to act and quick to anger, you do not like to wait. Distance means nothing to your power.',
    traits: ['Impatient', 'Hot-tempered', 'Action-oriented', 'Persistent', 'Bold'],
    characters: ['Leorio Paradinight', 'Franklin Bordeau', 'Razor'],
    characterProfiles: [
      {
        name: 'Leorio Paradinight',
        title: 'Hunter & Medical Student',
        portrait: '/characters/leorio.webp',
        abilities: [
          { name: 'Remote Punch', description: 'Opens a rift in space to deliver a long-range punch anywhere within sight.' },
        ],
      },
      {
        name: 'Franklin Bordeau',
        title: 'Phantom Troupe Member #7',
        abilities: [
          { name: 'Double Machine Gun', description: 'Fires dozens of aura bullets per second from his severed fingertips.' },
        ],
      },
      {
        name: 'Razor',
        title: 'Game Master of Greed Island',
        abilities: [
          { name: 'Nen Constructs', description: 'Creates powerful aura constructs including a massive barrier and sport-like attacks.' },
          { name: 'Devil\'s Volleyball', description: 'Fires an explosive ball of pure aura with enough force to shatter anything.' },
        ],
      },
    ],
    weakness: 'Impatience can lead to rash decisions under pressure.',
  },
  conjurer: {
    id: 'conjurer',
    name: 'Conjurer',
    japaneseName: '具現化系',
    color: '#1E7A40',
    glowColor: 'rgba(30, 122, 64, 0.6)',
    auraColor: '#50C878',
    description:
      'Conjurers are neurotic and detail-obsessed. You materialize physical objects from your aura with painstaking precision. Your abilities require strict rules and conditions — but within those rules, you create something no one else can. Discipline is your power.',
    traits: ['Meticulous', 'Disciplined', 'Anxious', 'Rule-bound', 'Precise'],
    characters: ['Kurapika', 'Shizuku Murasaki', 'Kortopi'],
    characterProfiles: [
      {
        name: 'Kurapika',
        title: 'Kurta Survivor & Hunter',
        portrait: '/characters/kurapika.webp',
        abilities: [
          { name: 'Dowsing Chain', description: 'A chain that swings toward truth — used to detect lies.' },
          { name: 'Chain Jail', description: 'Imprisons a target in an unbreakable chain; activated by a Nen contract.' },
          { name: 'Holy Chain', description: 'Heals wounds by drawing on Enhancer abilities.' },
          { name: 'Judgment Chain', description: 'Places a blade near the heart — the target dies if they break their vow.' },
          { name: 'Emperor Time', description: 'Converts all aura to 100% efficiency across all types — at the cost of his lifespan.' },
        ],
      },
      {
        name: 'Shizuku Murasaki',
        title: 'Phantom Troupe Member #8',
        abilities: [
          { name: 'Blinky (Deme-chan)', description: 'A conjured vacuum cleaner that sucks up non-living matter infinitely.' },
        ],
      },
    ],
    weakness: 'Rigid rules can be exploited by flexible opponents.',
  },
  manipulator: {
    id: 'manipulator',
    name: 'Manipulator',
    japaneseName: '操作系',
    color: '#CC1A1A',
    glowColor: 'rgba(204, 26, 26, 0.6)',
    auraColor: '#FF5555',
    description:
      'Manipulators are logical and self-interested. You impose your will on others — people, animals, objects — bending them to your purpose. Cold, calculating, and strategic, you always think several moves ahead. You prefer to control the situation rather than fight directly.',
    traits: ['Logical', 'Calculated', 'Self-interested', 'Patient', 'Controlling'],
    characters: ['Illumi Zoldyck', 'Shalnark', 'Morel Mackernasey'],
    characterProfiles: [
      {
        name: 'Illumi Zoldyck',
        title: 'Assassin & Phantom Troupe Member',
        abilities: [
          { name: 'Needle People', description: 'Inserts needles into people\'s brains to control their actions completely.' },
          { name: 'Hypnotic Spell', description: 'Alters a person\'s face, personality, and behavior through needle insertion.' },
        ],
      },
      {
        name: 'Shalnark',
        title: 'Phantom Troupe Member & Hunter',
        abilities: [
          { name: 'Black Voice', description: 'Attaches an antenna to a target, granting full remote control over their body.' },
          { name: 'Autopilot Mode', description: 'Inserts an antenna into himself, unlocking extreme physical performance at the cost of consciousness.' },
        ],
      },
      {
        name: 'Morel Mackernasey',
        title: 'Single-Star Hunter',
        abilities: [
          { name: 'Deep Purple', description: 'Exhales smoke from his pipe to create controllable Nen puppets.' },
          { name: 'Smoky Jail', description: 'Erects a massive cylindrical smoke barrier to trap opponents.' },
        ],
      },
    ],
    weakness: 'Overconfidence in your plans can leave you exposed to the unexpected.',
  },
  specialist: {
    id: 'specialist',
    name: 'Specialist',
    japaneseName: '特質系',
    color: '#8030A8',
    glowColor: 'rgba(128, 48, 168, 0.6)',
    auraColor: '#C060E0',
    description:
      'Specialists are rare and enigmatic. Your Nen does not fit neatly into any category — it is uniquely your own. Often misunderstood, you walk a path others cannot follow. Your power is singular, strange, and beyond classification. You were simply born different.',
    traits: ['Unique', 'Mysterious', 'Unpredictable', 'Independent', 'Rare'],
    characters: ['Chrollo Lucilfer', 'Neon Nostrade', 'Ging Freecss'],
    characterProfiles: [
      {
        name: 'Chrollo Lucilfer',
        title: 'Phantom Troupe Leader',
        portrait: '/characters/chrollo.webp',
        abilities: [
          { name: 'Skill Hunter (Bandit\'s Secret)', description: 'Steals the Nen abilities of others and stores them in his Conjured book.' },
          { name: 'Indoor Fish', description: 'A stolen ability that conjures a fish that devours anyone trapped in a closed space.' },
          { name: 'The Sun and Moon', description: 'Marks targets with symbols that cause a massive explosion when they touch.' },
        ],
      },
      {
        name: 'Neon Nostrade',
        title: 'Nostrade Family Daughter',
        abilities: [
          { name: 'Lovely Ghostwriter', description: 'Enters a trance to write poems that predict the future with frightening accuracy.' },
        ],
      },
      {
        name: 'Ging Freecss',
        title: 'Double-Star Ruins Hunter',
        abilities: [
          { name: 'Replication', description: 'Can copy any ability he has seen, heard, or been hit by — and return it amplified.' },
        ],
      },
    ],
    weakness: 'Your uniqueness can make you isolated and hard to support.',
  },
}

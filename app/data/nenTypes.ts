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
      'Enhancers are the bulldozers of the Nen world. You pour everything into raw power, your body, your aura, your sheer stubbornness. No elaborate plans, no tricks. Just a goal and the will to smash through anything in the way. It sounds simple, but that simplicity is exactly what makes Enhancers terrifying.',
    traits: ['Determined', 'Hardheaded', 'Loyal', 'Stubborn', 'Reliable'],
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
          { name: 'Big Bang Impact', description: 'A single punch loaded with concentrated aura. Widely considered the most devastating Enhancer strike in the series.' },
          { name: 'Scream', description: 'Releases aura as sound, creating a shockwave powerful enough to destroy the ground.' },
        ],
      },
    ],
    weakness: 'Tunnel vision is real. If a plan falls apart or an opponent outsmart them, Enhancers often have no answer.',
  },
  transmuter: {
    id: 'transmuter',
    name: 'Transmuter',
    japaneseName: '変化系',
    color: '#6B3FD4',
    glowColor: 'rgba(107, 63, 212, 0.6)',
    auraColor: '#A888FF',
    description:
      'Transmuters are the weirdos of the Nen world, and that is a compliment. You take your aura and reshape it into something it was never supposed to be: electricity, rubber, poison, whatever fits your personality. The best part? Your ability says a lot about who you are deep down, which is probably why Killua\'s is lightning and Hisoka\'s is literal gum.',
    traits: ['Whimsical', 'Deceptive', 'Creative', 'Moody', 'Unpredictable'],
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
          { name: 'Bungee Gum', description: 'Aura that behaves like rubber and gum at once. It stretches, sticks to surfaces, and snaps back with force.' },
          { name: 'Texture Surprise', description: 'Prints any texture or pattern onto a flat surface, used for deception.' },
        ],
      },
    ],
    weakness: 'Transmuters get bored. When the excitement fades or something stops being fun, their commitment tends to go with it.',
  },
  emitter: {
    id: 'emitter',
    name: 'Emitter',
    japaneseName: '放出系',
    color: '#E05010',
    glowColor: 'rgba(224, 80, 16, 0.6)',
    auraColor: '#FF8844',
    description:
      'Emitters fire their aura away from their body and that pretty much sums up the personality too. Why get close when you can just blast from across the room? They tend to be loud, direct, and not great at sitting still. Think Leorio punching someone through a wall from a hundred meters away and you\'ve got the vibe.',
    traits: ['Impatient', 'Hot-tempered', 'Outspoken', 'Persistent', 'Bold'],
    characters: ['Leorio Paradinight', 'Franklin Bordeau', 'Razor'],
    characterProfiles: [
      {
        name: 'Leorio Paradinight',
        title: 'Hunter & Medical Student',
        portrait: '/characters/leorio.webp',
        abilities: [
          { name: 'Remote Punch', description: 'Projects a punch over a long distance, allowing him to strike targets far from his location.' },
        ],
      },
      {
        name: 'Franklin Bordeau',
        title: 'Phantom Troupe Member #7',
        portrait: '/characters/franklin.webp',
        abilities: [
          { name: 'Double Machine Gun', description: 'Fires dozens of aura bullets per second from his severed fingertips.' },
        ],
      },
      {
        name: 'Razor',
        title: 'Game Master of Greed Island',
        portrait: '/characters/razor.webp',
        abilities: [
          { name: 'Aura Barrier', description: 'An enormous dome of pure aura that seals off a massive area. In Greed Island, it enclosed the entire island coastline.' },
          { name: 'Aura Ball', description: 'Fires a condensed ball of emitted aura with devastating striking force, used in a volleyball-style exchange during the Greed Island arc.' },
        ],
      },
    ],
    weakness: 'They move fast, sometimes too fast. Emitters can overcommit before they have read the situation and it costs them.',
  },
  conjurer: {
    id: 'conjurer',
    name: 'Conjurer',
    japaneseName: '具現化系',
    color: '#1E7A40',
    glowColor: 'rgba(30, 122, 64, 0.6)',
    auraColor: '#50C878',
    description:
      'Conjurers summon real, physical objects out of nothing and they pay for that power with rules. Lots of them. The stricter the conditions, the stronger the ability. Most Conjurers are a little high-strung, which honestly tracks when your entire fighting style depends on not breaking your own terms and conditions.',
    traits: ['Meticulous', 'Disciplined', 'Anxious', 'Principled', 'Precise'],
    characters: ['Kurapika', 'Shizuku Murasaki', 'Kortopi'],
    characterProfiles: [
      {
        name: 'Kurapika',
        title: 'Kurta Survivor & Hunter',
        portrait: '/characters/kurapika.webp',
        abilities: [
          { name: 'Dowsing Chain', description: 'A chain that swings toward truth and is used to detect lies.' },
          { name: 'Chain Jail', description: 'Imprisons a target in an unbreakable chain; activated by a Nen contract.' },
          { name: 'Holy Chain', description: 'Heals wounds by drawing on Enhancer abilities.' },
          { name: 'Judgment Chain', description: 'Places a blade near the target\'s heart. They die if they break the vow Kurapika extracts.' },
          { name: 'Emperor Time', description: 'Pushes all aura to 100% efficiency across every Nen type, at the cost of hours off his lifespan per second active.' },
        ],
      },
      {
        name: 'Shizuku Murasaki',
        title: 'Phantom Troupe Member #8',
        portrait: '/characters/shizuku.webp',
        abilities: [
          { name: 'Blinky (Deme-chan)', description: 'A conjured vacuum cleaner that sucks up non-living matter infinitely.' },
        ],
      },
    ],
    weakness: 'The rules that make a Conjurer powerful can also become a cage. A clever opponent who figures out your conditions can turn your own ability against you.',
  },
  manipulator: {
    id: 'manipulator',
    name: 'Manipulator',
    japaneseName: '操作系',
    color: '#CC1A1A',
    glowColor: 'rgba(204, 26, 26, 0.6)',
    auraColor: '#FF5555',
    description:
      'Manipulators control things: people, animals, objects, whole situations. They rarely throw the first punch because they have already arranged things so the fight goes their way before it starts. Every decision is calculated, and they are very good at not letting you know what they actually want. Living inside a Manipulator\'s head sounds exhausting.',
    traits: ['Logical', 'Calculated', 'Self-sufficient', 'Patient', 'Controlling'],
    characters: ['Illumi Zoldyck', 'Shalnark', 'Morel Mackernasey'],
    characterProfiles: [
      {
        name: 'Illumi Zoldyck',
        title: 'Assassin & Phantom Troupe Member',
        portrait: '/characters/illumi.webp',
        abilities: [
          { name: 'Needle People', description: 'Inserts needles into people\'s brains to control their actions completely.' },
          { name: 'Hypnotic Spell', description: 'Alters a person\'s face, personality, and behavior through needle insertion.' },
        ],
      },
      {
        name: 'Shalnark',
        title: 'Phantom Troupe Member & Hunter',
        portrait: '/characters/shalnark.webp',
        abilities: [
          { name: 'Black Voice', description: 'Attaches an antenna to a target, granting full remote control over their body.' },
          { name: 'Autopilot Mode', description: 'Inserts an antenna into himself, unlocking extreme physical performance at the cost of consciousness.' },
        ],
      },
      {
        name: 'Morel Mackernasey',
        title: 'Single-Star Hunter',
        portrait: '/characters/morel.webp',
        abilities: [
          { name: 'Deep Purple', description: 'Exhales smoke from his pipe to create controllable Nen puppets.' },
          { name: 'Smoky Jail', description: 'Erects a massive cylindrical smoke barrier to trap opponents.' },
        ],
      },
    ],
    weakness: 'Manipulators trust their plans maybe a bit too much. When something truly random throws the board, they can freeze up because there was no contingency for chaos.',
  },
  specialist: {
    id: 'specialist',
    name: 'Specialist',
    japaneseName: '特質系',
    color: '#8030A8',
    glowColor: 'rgba(128, 48, 168, 0.6)',
    auraColor: '#C060E0',
    description:
      'Specialists are the outliers, the ones Nen can\'t quite classify. Their abilities don\'t follow the rules other types follow because they are genuinely one-of-a-kind. Chrollo steals other people\'s Nen. Neon writes prophecies. Ging does... whatever Ging does. The only thing they have in common is that nobody really knows how to prepare for them.',
    traits: ['Unique', 'Mysterious', 'Hard to read', 'Independent', 'Rare'],
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
        portrait: '/characters/neon.webp',
        abilities: [
          { name: 'Lovely Ghostwriter', description: 'Enters a trance to write poems that predict the future with frightening accuracy.' },
        ],
      },
      {
        name: 'Ging Freecss',
        title: 'Double-Star Ruins Hunter',
        portrait: '/characters/ging.webp',
        abilities: [
          { name: 'Unknown Specialist Ability', description: 'Ging\'s Nen is confirmed as Specialist type and described as extraordinary, but his specific abilities have not been fully revealed in the manga.' },
        ],
      },
    ],
    weakness: 'Walking your own path means nobody fully understands you, including allies. Specialists often have no one who can train them or cover their blind spots.',
  },
}

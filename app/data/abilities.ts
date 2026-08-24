import type { NenTypeId } from '~/lib/supabase'

export interface AbilityModifierContext {
  challengerRoll: number
  opponentRoll: number
  challengerPower: number
  opponentPower: number
}

export interface Ability {
  id: string
  name: string
  nen_type: NenTypeId
  description: string
  flavorText: string
  effect: string
  // Returns a multiplier applied to challengerPower (1.0 = no change)
  modifier: (ctx: AbilityModifierContext) => number
}

export const abilities: Ability[] = [
  // ── Enhancer ──────────────────────────────────────────────────────────────
  {
    id: 'jajanken_rock',
    name: 'Jajanken: Rock',
    nen_type: 'enhancer',
    description: 'Concentrates all aura into a single devastating punch. Gon\'s signature strike.',
    flavorText: 'JAN KEN PON — all power in one strike.',
    effect: '+25% power if your roll is 10 or higher',
    modifier: ({ challengerRoll }) => challengerRoll >= 10 ? 1.25 : 1.0,
  },
  {
    id: 'big_bang_impact',
    name: 'Big Bang Impact',
    nen_type: 'enhancer',
    description: 'A single punch loaded with concentrated aura — Uvogin\'s most devastating technique.',
    flavorText: 'There is no defense for this.',
    effect: '+15% power, always',
    modifier: () => 1.15,
  },
  {
    id: 'power_surge',
    name: 'Rage Blast',
    nen_type: 'enhancer',
    description: 'Floods the body with aura when injured, converting pain into explosive power.',
    flavorText: 'Pain only makes them stronger.',
    effect: '+22% power if outmatched in strength, +5% otherwise',
    modifier: ({ challengerPower, opponentPower }) => challengerPower < opponentPower ? 1.22 : 1.05,
  },
  {
    id: 'ko',
    name: 'Ko',
    nen_type: 'enhancer',
    description: 'Concentrates all aura into one body part for a focused, overwhelming strike.',
    flavorText: 'Everything into one point.',
    effect: '+18% power on roll 8+, -5% on low rolls (high risk)',
    modifier: ({ challengerRoll }) => challengerRoll >= 8 ? 1.18 : 0.95,
  },
  {
    id: 'shu',
    name: 'Shu',
    nen_type: 'enhancer',
    description: 'Extends aura to coat a weapon or object, amplifying its reach and force.',
    flavorText: 'The weapon and the fighter become one.',
    effect: '+12% power, always',
    modifier: () => 1.12,
  },
  {
    id: 'adult_gon',
    name: 'Adult Gon Transformation',
    nen_type: 'enhancer',
    description: 'Sacrifices all future potential for a single moment of absolute power.',
    flavorText: 'Everything, for just this one fight.',
    effect: '+50% power on roll 9+, -20% on low rolls (extreme risk)',
    modifier: ({ challengerRoll }) => challengerRoll >= 9 ? 1.5 : 0.8,
  },

  // ── Transmuter ────────────────────────────────────────────────────────────
  {
    id: 'godspeed',
    name: 'Godspeed',
    nen_type: 'transmuter',
    description: 'Electricity flows through the body, moving at the speed of lightning reflexes.',
    flavorText: 'You can\'t hit what you can\'t see.',
    effect: '+30% power if opponent rolls 5 or less, +5% otherwise',
    modifier: ({ opponentRoll }) => opponentRoll <= 5 ? 1.3 : 1.05,
  },
  {
    id: 'bungee_gum',
    name: 'Bungee Gum',
    nen_type: 'transmuter',
    description: 'Aura that acts like rubber and gum — stretches, sticks, and snaps back with force.',
    flavorText: 'It has the properties of both rubber and gum.',
    effect: '+20% power if opponent out-rolled you, +10% otherwise',
    modifier: ({ challengerRoll, opponentRoll }) => challengerRoll < opponentRoll ? 1.2 : 1.1,
  },
  {
    id: 'whirlwind',
    name: 'Whirlwind',
    nen_type: 'transmuter',
    description: 'Electricity coats the hands for instantaneous multi-hit strikes.',
    flavorText: 'No single blow — a storm of them.',
    effect: '+12% power, always',
    modifier: () => 1.12,
  },
  {
    id: 'thunderbolt',
    name: 'Thunderbolt',
    nen_type: 'transmuter',
    description: 'Discharges a concentrated bolt of electricity powerful enough to stun or kill.',
    flavorText: 'One bolt. One chance.',
    effect: '+35% power on roll 10+, no bonus otherwise',
    modifier: ({ challengerRoll }) => challengerRoll >= 10 ? 1.35 : 1.0,
  },

  {
    id: 'clean_up',
    name: 'Clean Up',
    nen_type: 'transmuter',
    description: 'Channels aura as a razor-thin blade capable of precise, surgical strikes.',
    flavorText: 'Precision over power.',
    effect: '+15% power if opponent is stronger, +8% otherwise',
    modifier: ({ opponentPower, challengerPower }) => opponentPower > challengerPower ? 1.15 : 1.08,
  },
  {
    id: 'biscuit_cast_off',
    name: 'Cast Off',
    nen_type: 'transmuter',
    description: "Biscuit sheds her disguise, unleashing her true muscular form and full aura output.",
    flavorText: 'The real body was always this.',
    effect: '+20% power, always',
    modifier: () => 1.2,
  },

  // ── Emitter ───────────────────────────────────────────────────────────────
  {
    id: 'double_machine_gun',
    name: 'Double Machine Gun',
    nen_type: 'emitter',
    description: 'Fires dozens of aura bullets per second from severed fingertips.',
    flavorText: 'Quantity is its own quality.',
    effect: '+15% power, always',
    modifier: () => 1.15,
  },
  {
    id: 'remote_punch',
    name: 'Remote Punch',
    nen_type: 'emitter',
    description: 'Projects a full-force punch across a long distance through emitted aura.',
    flavorText: 'Distance is irrelevant.',
    effect: '+20% power on roll 9+, no bonus otherwise',
    modifier: ({ challengerRoll }) => challengerRoll >= 9 ? 1.2 : 1.0,
  },
  {
    id: 'ricochet',
    name: 'Ricochet',
    nen_type: 'emitter',
    description: 'Aura bullets bounce off surfaces, striking from angles the opponent cannot guard.',
    flavorText: 'Every wall is a weapon.',
    effect: '+25% power if opponent rolls 8 or higher, no bonus otherwise',
    modifier: ({ opponentRoll }) => opponentRoll >= 8 ? 1.25 : 1.0,
  },
  {
    id: 'aura_ball',
    name: 'Aura Ball',
    nen_type: 'emitter',
    description: 'Fires a condensed ball of emitted aura with devastating striking force.',
    flavorText: 'Razor used this to seal an entire island.',
    effect: '+18% power on roll 8+, +5% otherwise',
    modifier: ({ challengerRoll }) => challengerRoll >= 8 ? 1.18 : 1.05,
  },
  {
    id: 'little_flower',
    name: 'Little Flower',
    nen_type: 'emitter',
    description: 'Discharges a burst of aura at point-blank range — immense power at close quarters.',
    flavorText: 'Beautiful and catastrophic.',
    effect: '+28% power if opponent rolls 6 or less, no bonus otherwise',
    modifier: ({ opponentRoll }) => opponentRoll <= 6 ? 1.28 : 1.0,
  },
  {
    id: 'gallery_fake',
    name: 'Silent Waltz',
    nen_type: 'emitter',
    description: 'Releases a sustained stream of aura that overwhelms defenses over time.',
    flavorText: 'Relentless. Exhausting. Inevitable.',
    effect: '+10% power, always',
    modifier: () => 1.1,
  },

  // ── Conjurer ──────────────────────────────────────────────────────────────
  {
    id: 'chain_jail',
    name: 'Chain Jail',
    nen_type: 'conjurer',
    description: 'Binds the opponent in unbreakable conjured chains, sealing their Nen entirely.',
    flavorText: 'No one breaks the chain.',
    effect: 'Siphons 8% of opponent\'s power as a bonus multiplier',
    modifier: ({ opponentPower, challengerPower }) => {
      const stolen = opponentPower * 0.08
      return 1.0 + stolen / Math.max(challengerPower, 1)
    },
  },
  {
    id: 'dowsing_chain',
    name: 'Dowsing Chain',
    nen_type: 'conjurer',
    description: 'Reads the opponent\'s intent before they act, granting a defensive advantage.',
    flavorText: 'The chain never lies.',
    effect: '+18% power if opponent is stronger, +5% otherwise',
    modifier: ({ challengerPower, opponentPower }) => opponentPower > challengerPower ? 1.18 : 1.05,
  },
  {
    id: 'holy_chain',
    name: 'Holy Chain',
    nen_type: 'conjurer',
    description: 'Channels Enhancer energy to recover from damage mid-fight.',
    flavorText: 'Even wounds can be tools.',
    effect: '+22% power if your roll is 4 or less (turns bad luck into resilience)',
    modifier: ({ challengerRoll }) => challengerRoll <= 4 ? 1.22 : 1.0,
  },
  {
    id: 'judgment_chain',
    name: 'Judgment Chain',
    nen_type: 'conjurer',
    description: 'Places a blade near the opponent\'s heart — any vow broken means instant death.',
    flavorText: 'The contract is absolute.',
    effect: '+40% power if opponent is 20%+ stronger — otherwise no effect',
    modifier: ({ opponentPower, challengerPower }) => opponentPower > challengerPower * 1.2 ? 1.4 : 1.0,
  },
  {
    id: 'blinky',
    name: 'Blinky',
    nen_type: 'conjurer',
    description: 'A conjured vacuum that sucks up non-living matter — strips the field of any advantage.',
    flavorText: 'The battlefield is already hers.',
    effect: '+20% power if opponent rolls 9+, +5% otherwise',
    modifier: ({ opponentRoll }) => opponentRoll >= 9 ? 1.2 : 1.05,
  },

  // ── Manipulator ───────────────────────────────────────────────────────────
  {
    id: 'needle_people',
    name: 'Needle People',
    nen_type: 'manipulator',
    description: 'Inserts needles into the brain to seize full control of a target\'s actions.',
    flavorText: 'A puppet doesn\'t choose its moves.',
    effect: 'Siphons 10% of opponent\'s power as a bonus multiplier',
    modifier: ({ opponentPower, challengerPower }) => {
      const debuff = opponentPower * 0.1
      return 1.0 + debuff / Math.max(challengerPower, 1)
    },
  },
  {
    id: 'black_voice',
    name: 'Black Voice',
    nen_type: 'manipulator',
    description: 'Attaches an antenna to the target, granting complete remote control of their body.',
    flavorText: 'They move, but not by their own will.',
    effect: '+35% power if opponent rolls 10+, no bonus otherwise',
    modifier: ({ opponentRoll }) => opponentRoll >= 10 ? 1.35 : 1.0,
  },
  {
    id: 'deep_purple',
    name: 'Deep Purple',
    nen_type: 'manipulator',
    description: 'Exhales smoke puppets that absorb strikes and fight on the user\'s behalf.',
    flavorText: 'The smoke fights for you.',
    effect: '+10% power, always',
    modifier: () => 1.1,
  },
  {
    id: 'autopilot',
    name: 'Autopilot Mode',
    nen_type: 'manipulator',
    description: 'Inserts an antenna into himself, unlocking extreme physical performance at the cost of consciousness.',
    flavorText: 'He doesn\'t need to think. Only fight.',
    effect: '+30% power on roll 9+, -10% on low rolls (high risk)',
    modifier: ({ challengerRoll }) => challengerRoll >= 9 ? 1.3 : 0.9,
  },
  {
    id: 'order_stamp',
    name: 'Order Stamp',
    nen_type: 'manipulator',
    description: 'Stamps a command onto a target, forcing them to obey a single absolute order.',
    flavorText: 'One stamp. One outcome.',
    effect: '+28% power if opponent rolls 5 or less, no bonus otherwise',
    modifier: ({ opponentRoll }) => opponentRoll <= 5 ? 1.28 : 1.0,
  },
  {
    id: 'smoky_jail',
    name: 'Smoky Jail',
    nen_type: 'manipulator',
    description: 'Erects a massive cylindrical smoke barrier, trapping and isolating the opponent.',
    flavorText: 'There is no escape from the smoke.',
    effect: '+15% power if opponent is stronger, +8% otherwise',
    modifier: ({ challengerPower, opponentPower }) => opponentPower > challengerPower ? 1.15 : 1.08,
  },

  // ── Specialist ────────────────────────────────────────────────────────────
  {
    id: 'skill_hunter',
    name: 'Skill Hunter',
    nen_type: 'specialist',
    description: "Deploys a stolen ability from the Bandit's Secret book, drawn from a vast arsenal.",
    flavorText: 'The book holds everything. Pick the right page.',
    effect: 'Mirrors 12% of opponent\'s power as a bonus multiplier',
    modifier: ({ opponentPower, challengerPower }) => {
      const mirror = opponentPower * 0.12
      return 1.0 + mirror / Math.max(challengerPower, 1)
    },
  },
  {
    id: 'lovely_ghostwriter',
    name: 'Lovely Ghostwriter',
    nen_type: 'specialist',
    description: 'Enters a prophetic trance — when the vision strikes, it reveals a fatal opening.',
    flavorText: 'The future has already been written.',
    effect: '+30% power on roll 10+, double power on a perfect 12',
    modifier: ({ challengerRoll }) => challengerRoll === 12 ? 2.0 : challengerRoll >= 10 ? 1.3 : 1.0,
  },
  {
    id: 'scarlet_eyes',
    name: 'Scarlet Eyes',
    nen_type: 'specialist',
    description: 'The Kurta clan\'s awakened state — Nen mastery across all types with no limits.',
    flavorText: 'In this state, there are no limits.',
    effect: 'Random multiplier between 0.9x and 1.5x — unpredictable but potent',
    modifier: () => 0.9 + Math.random() * 0.6,
  },
  {
    id: 'indoor_fish',
    name: 'Indoor Fish',
    nen_type: 'specialist',
    description: 'Conjures a predatory fish inside a sealed space — lethal in enclosed environments.',
    flavorText: 'The walls become the trap.',
    effect: '+30% power if opponent rolls 6 or less, no bonus otherwise',
    modifier: ({ opponentRoll }) => opponentRoll <= 6 ? 1.3 : 1.0,
  },
  {
    id: 'sun_and_moon',
    name: 'The Sun and Moon',
    nen_type: 'specialist',
    description: 'Marks the opponent with symbols that detonate on contact — delayed but catastrophic.',
    flavorText: 'You are already marked.',
    effect: '+38% power on roll 9+, no bonus otherwise',
    modifier: ({ challengerRoll }) => challengerRoll >= 9 ? 1.38 : 1.0,
  },
  {
    id: 'texture_surprise',
    name: 'Texture Surprise',
    nen_type: 'specialist',
    description: 'Alters perceived reality — the opponent cannot trust what they see or feel.',
    flavorText: 'Nothing is what it appears to be.',
    effect: '+20% power if opponent out-rolled you, +5% otherwise',
    modifier: ({ opponentRoll, challengerRoll }) => opponentRoll > challengerRoll ? 1.2 : 1.05,
  },
]

export const abilitiesByNenType: Record<NenTypeId, Ability[]> = {
  enhancer: abilities.filter(a => a.nen_type === 'enhancer'),
  transmuter: abilities.filter(a => a.nen_type === 'transmuter'),
  emitter: abilities.filter(a => a.nen_type === 'emitter'),
  conjurer: abilities.filter(a => a.nen_type === 'conjurer'),
  manipulator: abilities.filter(a => a.nen_type === 'manipulator'),
  specialist: abilities.filter(a => a.nen_type === 'specialist'),
}

export function getAbility(id: string): Ability | undefined {
  return abilities.find(a => a.id === id)
}

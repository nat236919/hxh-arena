import type { NenTypeId } from './nenTypes'

export interface Answer {
  text: string
  scores: Partial<Record<NenTypeId, number>>
}

export interface Question {
  id: number
  text: string
  answers: Answer[]
}

export const questions: Question[] = [
  {
    id: 1,
    text: 'A powerful enemy is blocking your path. What\'s your first move?',
    answers: [
      { text: 'Go straight at them. Hesitation is just fear in a suit.', scores: { enhancer: 3, emitter: 1 } },
      { text: 'Watch them first. Every fighter has a pattern.', scores: { manipulator: 3, conjurer: 1 } },
      { text: 'Let them think they\'re winning. Then pull the rug.', scores: { transmuter: 3, specialist: 1 } },
      { text: 'Open up from range before they can close the distance.', scores: { emitter: 3, conjurer: 1 } },
    ],
  },
  {
    id: 2,
    text: 'Your friend is in danger and there\'s no time to think. What do you do?',
    answers: [
      { text: 'Get between them and whatever\'s coming. That\'s it.', scores: { enhancer: 3, emitter: 1 } },
      { text: 'Keep your head. Panic helps no one, including them.', scores: { manipulator: 3, specialist: 1 } },
      { text: 'Figure something out on the fly. You always do.', scores: { transmuter: 2, specialist: 2 } },
      { text: 'This is what you prepared for. Time to use it.', scores: { conjurer: 3, emitter: 1 } },
    ],
  },
  {
    id: 3,
    text: 'How do you actually feel about rules and conditions?',
    answers: [
      { text: 'They slow me down. I\'d rather trust my instincts.', scores: { enhancer: 3, transmuter: 1 } },
      { text: 'Rules are what make power real. The stricter, the better.', scores: { conjurer: 3, manipulator: 1 } },
      { text: 'Rules are just where creativity starts, not where it ends.', scores: { transmuter: 3, specialist: 1 } },
      { text: 'I set the rules. Other people follow them.', scores: { manipulator: 3, conjurer: 1 } },
    ],
  },
  {
    id: 4,
    text: 'What actually gets you out of bed and moving?',
    answers: [
      { text: 'One goal. That\'s it. I don\'t need it to be complicated.', scores: { enhancer: 3, emitter: 1 } },
      { text: 'There\'s something I have to make right. I haven\'t forgotten.', scores: { conjurer: 3, manipulator: 1 } },
      { text: 'Honestly? I just want things to be interesting.', scores: { transmuter: 3, specialist: 1 } },
      { text: 'Freedom. To do what I want, when I want, on my own terms.', scores: { specialist: 2, manipulator: 2 } },
    ],
  },
  {
    id: 5,
    text: 'You know a fight is coming. How do you spend the time before it?',
    answers: [
      { text: 'Training. My body needs to be ready, not my notes.', scores: { enhancer: 3 } },
      { text: 'Learning everything about who I\'m facing. I want zero surprises.', scores: { conjurer: 2, manipulator: 2 } },
      { text: 'Setting things up so the fight is basically already over when it starts.', scores: { manipulator: 3, conjurer: 1 } },
      { text: 'Drilling the specific moves I\'ll need until I can do them without thinking.', scores: { emitter: 2, conjurer: 2 } },
    ],
  },
  {
    id: 6,
    text: 'You do your Water Divination test. What does the leaf show?',
    answers: [
      { text: 'The glass overflows. A lot. The water just keeps going.', scores: { enhancer: 3 } },
      { text: 'The taste shifts into something completely different, like nothing anyone can name.', scores: { transmuter: 3 } },
      { text: 'The water shoots away from the leaf like it\'s been repelled.', scores: { emitter: 3 } },
      { text: 'Something solid and intricate forms inside the glass.', scores: { conjurer: 3 } },
      { text: 'Little shapes appear in the water and start moving on their own.', scores: { manipulator: 3 } },
      { text: 'Something happens that makes Wing stare in silence for a moment.', scores: { specialist: 3 } },
    ],
  },
  {
    id: 7,
    text: 'How would the people around you describe you?',
    answers: [
      { text: 'Reliable. No hidden layers, no games. What you see is what you get.', scores: { enhancer: 3, emitter: 1 } },
      { text: 'Hard to pin down. They never quite know what I\'m going to do.', scores: { transmuter: 2, specialist: 2 } },
      { text: 'Intense. I notice things people don\'t expect me to notice.', scores: { conjurer: 3, manipulator: 1 } },
      { text: 'Calculating. People get the feeling there\'s always something going on behind my eyes.', scores: { manipulator: 3, specialist: 1 } },
    ],
  },
  {
    id: 8,
    text: 'There\'s a crisis and no clear answer. What do you do?',
    answers: [
      { text: 'Move first, think later. Freezing up is the worst option.', scores: { enhancer: 3, emitter: 1 } },
      { text: 'Slow down. Panic makes everything harder and I refuse to panic.', scores: { manipulator: 2, conjurer: 2 } },
      { text: 'Look for the angle nobody else is seeing.', scores: { transmuter: 2, specialist: 2 } },
      { text: 'I prepared for this. Not this exactly, but something like it.', scores: { conjurer: 3 } },
    ],
  },
  {
    id: 9,
    text: 'If you could have any Nen ability, which sounds most like you?',
    answers: [
      { text: 'Pure physical enhancement. A hundredfold stronger, nothing else needed.', scores: { enhancer: 3 } },
      { text: 'Transform my aura into electricity and hit like a bolt of lightning.', scores: { transmuter: 3 } },
      { text: 'Shoot compressed aura from a distance. One shot, decisive.', scores: { emitter: 3 } },
      { text: 'Conjure a weapon that comes with its own unbreakable rules.', scores: { conjurer: 3 } },
      { text: 'Control anything nearby with threads they can\'t see or feel.', scores: { manipulator: 3 } },
      { text: 'Something weird that nobody has a name for yet.', scores: { specialist: 3 } },
    ],
  },
  {
    id: 10,
    text: 'You finally achieved the thing you were working toward. Now what?',
    answers: [
      { text: 'Good. So what\'s next?', scores: { enhancer: 2, transmuter: 2 } },
      { text: 'That\'s it. It\'s done. I can breathe now.', scores: { conjurer: 3, manipulator: 1 } },
      { text: 'Honestly a little restless. Winning is great but now there\'s nothing to chase.', scores: { transmuter: 2, specialist: 2 } },
      { text: 'The goal was never the point. The point was what I got along the way.', scores: { manipulator: 3, specialist: 1 } },
    ],
  },
  {
    id: 11,
    text: 'Someone you trusted just betrayed you. What happens next?',
    answers: [
      { text: 'I go find them and we have a very direct conversation about it.', scores: { enhancer: 3, emitter: 1 } },
      { text: 'I remove them from my life like a variable I no longer need.', scores: { manipulator: 3, conjurer: 1 } },
      { text: 'I let them think everything is fine. Then I wait.', scores: { transmuter: 2, specialist: 2 } },
      { text: 'I start keeping records. When I\'m ready, I\'ll have everything I need.', scores: { conjurer: 3, manipulator: 1 } },
    ],
  },
  {
    id: 12,
    text: 'How do you handle pain?',
    answers: [
      { text: 'It makes me sharper. I just push harder.', scores: { enhancer: 3, emitter: 1 } },
      { text: 'I want to understand what caused it before I react.', scores: { conjurer: 2, manipulator: 2 } },
      { text: 'It doesn\'t hit me the way it seems to hit other people.', scores: { specialist: 3, transmuter: 1 } },
      { text: 'I take it and turn it into something useful.', scores: { transmuter: 2, enhancer: 2 } },
    ],
  },
  {
    id: 13,
    text: 'One shot to finish the fight. What does that look like?',
    answers: [
      { text: 'Everything I have, all at once, straight at them.', scores: { enhancer: 3 } },
      { text: 'A shot from somewhere they didn\'t know I was.', scores: { emitter: 3, manipulator: 1 } },
      { text: 'The trap I set at the start of the fight finally closes.', scores: { manipulator: 3, conjurer: 1 } },
      { text: 'Something they\'ve never seen and therefore never prepared for.', scores: { transmuter: 2, specialist: 2 } },
    ],
  },
  {
    id: 14,
    text: 'How do you feel about teaming up with others?',
    answers: [
      { text: 'There\'s nobody I fight harder for than the people I actually trust.', scores: { enhancer: 3, emitter: 1 } },
      { text: 'Alliances make sense when they\'re useful. I don\'t pretend otherwise.', scores: { manipulator: 3, specialist: 1 } },
      { text: 'Honestly, I prefer to work alone. Fewer variables.', scores: { conjurer: 2, specialist: 2 } },
      { text: 'I\'ll join if it seems interesting and leave when it stops being so.', scores: { transmuter: 2, specialist: 2 } },
    ],
  },
  {
    id: 15,
    text: 'What does power actually mean to you?',
    answers: [
      { text: 'Being strong enough that the people I care about don\'t have to be afraid.', scores: { enhancer: 3, conjurer: 1 } },
      { text: 'Being able to do whatever I want without asking anyone for permission.', scores: { specialist: 2, transmuter: 2 } },
      { text: 'Control. Over situations, over people, over what happens next.', scores: { manipulator: 3, emitter: 1 } },
      { text: 'Getting so good at something that nobody in the world can touch you at it.', scores: { conjurer: 3, emitter: 1 } },
    ],
  },
  {
    id: 16,
    text: 'When you\'re learning something new, how do you go about it?',
    answers: [
      { text: 'Repetition. I do it until my body knows it without me thinking.', scores: { enhancer: 3, conjurer: 1 } },
      { text: 'I break the rules early. That\'s usually where the good stuff hides.', scores: { transmuter: 3, specialist: 1 } },
      { text: 'I want to understand the whole system before I try anything.', scores: { conjurer: 2, manipulator: 2 } },
      { text: 'I learn the minimum needed to start, then fix it as I go.', scores: { emitter: 2, enhancer: 2 } },
    ],
  },
  {
    id: 17,
    text: 'How do people usually read your emotions?',
    answers: [
      { text: 'Clearly. I don\'t really hide how I feel.', scores: { enhancer: 3, emitter: 1 } },
      { text: 'They can\'t. I\'ve been told I\'m impossible to read.', scores: { manipulator: 2, specialist: 2 } },
      { text: 'All over the place. My mood shifts fast and I don\'t suppress it.', scores: { transmuter: 3, emitter: 1 } },
      { text: 'I decide when to show something. It doesn\'t just happen.', scores: { conjurer: 3, manipulator: 1 } },
    ],
  },
  {
    id: 18,
    text: 'What kind of Nen training sounds most right for you?',
    answers: [
      { text: 'Something physically brutal that keeps pushing until I hit a new ceiling.', scores: { enhancer: 3 } },
      { text: 'Experimenting with my aura in ways nobody has tried before.', scores: { transmuter: 2, specialist: 2 } },
      { text: 'Building an ability with very specific rules that make it dramatically stronger.', scores: { conjurer: 3, manipulator: 1 } },
      { text: 'Getting my aura as far from my body as I possibly can.', scores: { emitter: 3 } },
    ],
  },
  {
    id: 19,
    text: 'You just discovered a secret that could change everything. What do you do with it?',
    answers: [
      { text: 'Use it now. Sitting on information is just letting it go stale.', scores: { enhancer: 2, emitter: 2 } },
      { text: 'Say nothing. I\'ll decide when and if it gets used.', scores: { manipulator: 3, conjurer: 1 } },
      { text: 'Deploy it at the most dramatic moment possible.', scores: { transmuter: 2, specialist: 2 } },
      { text: 'Check it three times before I do anything. I need to be sure.', scores: { conjurer: 3, manipulator: 1 } },
    ],
  },
  {
    id: 20,
    text: 'If your aura had a sound, what would it be?',
    answers: [
      { text: 'A roar. Raw, overwhelming, the kind you feel before you hear.', scores: { enhancer: 3, emitter: 1 } },
      { text: 'A shifting hum that changes pitch without warning.', scores: { transmuter: 3, specialist: 1 } },
      { text: 'A crack. Sharp and sudden and already far away by the time you register it.', scores: { emitter: 3 } },
      { text: 'A clean, precise tone. Like a blade clearing its sheath.', scores: { conjurer: 2, manipulator: 2 } },
    ],
  },
]

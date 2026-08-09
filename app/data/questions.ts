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
    text: 'You encounter a powerful enemy blocking your path. What is your first instinct?',
    answers: [
      { text: 'Charge straight at them — hesitation is weakness.', scores: { enhancer: 3, emitter: 1 } },
      { text: 'Study them first. Find the pattern, then strike.', scores: { manipulator: 3, conjurer: 1 } },
      { text: 'Trick them. Make them think they have the upper hand.', scores: { transmuter: 3, specialist: 1 } },
      { text: 'Blast them from a safe distance before they close in.', scores: { emitter: 3, conjurer: 1 } },
    ],
  },
  {
    id: 2,
    text: 'A friend is in danger. You have no time to think. You...',
    answers: [
      { text: 'Throw yourself between them and the threat, no matter what.', scores: { enhancer: 3, emitter: 1 } },
      { text: 'Use the situation to your advantage — emotion clouds judgment.', scores: { manipulator: 3, specialist: 1 } },
      { text: 'Improvise something clever on the spot.', scores: { transmuter: 2, specialist: 2 } },
      { text: 'Deploy a carefully prepared ability for exactly this kind of emergency.', scores: { conjurer: 3, emitter: 1 } },
    ],
  },
  {
    id: 3,
    text: 'How do you feel about rules and conditions?',
    answers: [
      { text: 'Rules slow me down. I go with my gut.', scores: { enhancer: 3, transmuter: 1 } },
      { text: 'I thrive on rules — they give my power structure and strength.', scores: { conjurer: 3, manipulator: 1 } },
      { text: 'I bend rules creatively. They are a starting point, not a limit.', scores: { transmuter: 3, specialist: 1 } },
      { text: 'Rules are tools. I impose them on others, not myself.', scores: { manipulator: 3, conjurer: 1 } },
    ],
  },
  {
    id: 4,
    text: 'What motivates you most deeply?',
    answers: [
      { text: 'A simple, burning goal I will never abandon.', scores: { enhancer: 3, emitter: 1 } },
      { text: 'Revenge. Justice for those I lost.', scores: { conjurer: 3, manipulator: 1 } },
      { text: 'The thrill of the game. Life without excitement is empty.', scores: { transmuter: 3, specialist: 1 } },
      { text: 'Power and freedom to do exactly what I want.', scores: { specialist: 2, manipulator: 2 } },
    ],
  },
  {
    id: 5,
    text: 'You are given time to prepare before a fight. How do you use it?',
    answers: [
      { text: 'Train harder. When the time comes, my body will not fail me.', scores: { enhancer: 3 } },
      { text: 'Research every detail about my opponent. Knowledge is victory.', scores: { conjurer: 2, manipulator: 2 } },
      { text: 'Construct an elaborate trap and wait for them to walk into it.', scores: { manipulator: 3, conjurer: 1 } },
      { text: 'Practice the abilities I will use, sharpen their precision.', scores: { emitter: 2, conjurer: 2 } },
    ],
  },
  {
    id: 6,
    text: 'Your Water Divination test reveals something unusual about the water. What happens?',
    answers: [
      { text: 'The water overflows violently — pure force radiates out.', scores: { enhancer: 3 } },
      { text: 'The taste changes completely, into something impossible to describe.', scores: { transmuter: 3 } },
      { text: 'The water surges away from you, repelled by your aura.', scores: { emitter: 3 } },
      { text: 'Intricate shapes form inside the water, solid and precise.', scores: { conjurer: 3 } },
      { text: 'Small creatures appear and move at your unspoken direction.', scores: { manipulator: 3 } },
      { text: 'The water does something no one has ever seen before.', scores: { specialist: 3 } },
    ],
  },
  {
    id: 7,
    text: 'People around you would describe you as...',
    answers: [
      { text: 'Reliable and direct. What you see is what you get.', scores: { enhancer: 3, emitter: 1 } },
      { text: 'Unpredictable and hard to read.', scores: { transmuter: 2, specialist: 2 } },
      { text: 'Intense and meticulous. You notice everything.', scores: { conjurer: 3, manipulator: 1 } },
      { text: 'Calculating. You always seem to have an agenda.', scores: { manipulator: 3, specialist: 1 } },
    ],
  },
  {
    id: 8,
    text: 'In a crisis with no clear answer, you...',
    answers: [
      { text: 'Act immediately on instinct. Thinking too long costs lives.', scores: { enhancer: 3, emitter: 1 } },
      { text: 'Stay calm and analyze. Panic is the real enemy.', scores: { manipulator: 2, conjurer: 2 } },
      { text: 'Find the unexpected angle no one else considered.', scores: { transmuter: 2, specialist: 2 } },
      { text: 'Fall back on your preparation — you planned for this.', scores: { conjurer: 3 } },
    ],
  },
  {
    id: 9,
    text: 'Which of these abilities sounds most like you?',
    answers: [
      { text: 'Multiply my physical strength a hundredfold.', scores: { enhancer: 3 } },
      { text: 'Coat my aura in electricity and strike like lightning.', scores: { transmuter: 3 } },
      { text: 'Fire a concentrated blast of aura from my fingertip.', scores: { emitter: 3 } },
      { text: 'Summon a weapon with absolute rules that governs the battle.', scores: { conjurer: 3 } },
      { text: 'Attach invisible threads to control everything around me.', scores: { manipulator: 3 } },
      { text: 'Something no one could predict or categorize.', scores: { specialist: 3 } },
    ],
  },
  {
    id: 10,
    text: 'You have achieved your goal. How do you feel?',
    answers: [
      { text: 'Satisfied — but already looking for the next challenge.', scores: { enhancer: 2, transmuter: 2 } },
      { text: 'Complete. The mission is done. That is enough.', scores: { conjurer: 3, manipulator: 1 } },
      { text: 'Restless. Victory feels hollow without a new game to play.', scores: { transmuter: 2, specialist: 2 } },
      { text: 'Indifferent. The goal was the means — what matters is what I gained.', scores: { manipulator: 3, specialist: 1 } },
    ],
  },
]

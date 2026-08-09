import { questions as rawQuestions } from '~/data/questions'
import type { Question } from '~/data/questions'
import { nenTypes } from '~/data/nenTypes'
import type { NenTypeId, NenType } from '~/data/nenTypes'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!]
  }
  return a
}

export const QUESTIONS_PER_RUN = 15

function buildShuffledQuestions(): Question[] {
  return shuffle(rawQuestions)
    .slice(0, QUESTIONS_PER_RUN)
    .map(q => ({ ...q, answers: shuffle(q.answers) }))
}

// Shared state outside the function so all pages see the same instance
const questions = ref<Question[]>(buildShuffledQuestions())
const currentQuestionIndex = ref(0)
const scores = ref<Record<NenTypeId, number>>({
  enhancer: 0,
  transmuter: 0,
  emitter: 0,
  conjurer: 0,
  manipulator: 0,
  specialist: 0,
})
const isComplete = ref(false)
const result = ref<NenType | null>(null)

export function useNenQuiz() {

  const currentQuestion = computed((): Question => questions.value[currentQuestionIndex.value]!)
  const progress = computed(() => (currentQuestionIndex.value / questions.value.length) * 100)
  const dominantType = computed((): NenTypeId => {
    let max = -1
    let dominant: NenTypeId = 'enhancer'
    for (const [type, score] of Object.entries(scores.value)) {
      if (score > max) {
        max = score
        dominant = type as NenTypeId
      }
    }
    return dominant
  })

  function answerQuestion(answerIndex: number) {
    const answer = currentQuestion.value.answers[answerIndex]!
    for (const [type, points] of Object.entries(answer.scores)) {
      scores.value[type as NenTypeId] += points ?? 0
    }

    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value++
    } else {
      result.value = nenTypes[dominantType.value]
      isComplete.value = true
    }
  }

  function reset() {
    questions.value = buildShuffledQuestions()
    currentQuestionIndex.value = 0
    scores.value = { enhancer: 0, transmuter: 0, emitter: 0, conjurer: 0, manipulator: 0, specialist: 0 }
    isComplete.value = false
    result.value = null
  }

  return {
    questions: questions.value,
    currentQuestion,
    currentQuestionIndex,
    progress,
    scores,
    dominantType,
    isComplete,
    result,
    answerQuestion,
    reset,
  }
}

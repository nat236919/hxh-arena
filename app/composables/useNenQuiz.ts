import { questions } from '~/data/questions'
import { nenTypes } from '~/data/nenTypes'
import type { NenTypeId, NenType } from '~/data/nenTypes'

// Shared state outside the function so all pages see the same instance
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

  const currentQuestion = computed(() => questions[currentQuestionIndex.value])
  const progress = computed(() => (currentQuestionIndex.value / questions.length) * 100)
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
    const answer = currentQuestion.value.answers[answerIndex]
    for (const [type, points] of Object.entries(answer.scores)) {
      scores.value[type as NenTypeId] += points ?? 0
    }

    if (currentQuestionIndex.value < questions.length - 1) {
      currentQuestionIndex.value++
    } else {
      result.value = nenTypes[dominantType.value]
      isComplete.value = true
    }
  }

  function reset() {
    currentQuestionIndex.value = 0
    scores.value = { enhancer: 0, transmuter: 0, emitter: 0, conjurer: 0, manipulator: 0, specialist: 0 }
    isComplete.value = false
    result.value = null
  }

  return {
    questions,
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

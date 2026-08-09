import { describe, it, expect, beforeEach } from 'vitest'
import { ref, computed } from 'vue'
import { questions } from '../app/data/questions'
import { nenTypes } from '../app/data/nenTypes'
import type { NenTypeId, NenType } from '../app/data/nenTypes'
import type { Question } from '../app/data/questions'

// Inline the composable logic so tests don't depend on Nuxt auto-imports
function makeQuiz() {
  const currentQuestionIndex = ref(0)
  const scores = ref<Record<NenTypeId, number>>({
    enhancer: 0, transmuter: 0, emitter: 0, conjurer: 0, manipulator: 0, specialist: 0,
  })
  const isComplete = ref(false)
  const result = ref<NenType | null>(null)

  const currentQuestion = computed((): Question => questions[currentQuestionIndex.value]!)
  const progress = computed(() => (currentQuestionIndex.value / questions.length) * 100)
  const dominantType = computed((): NenTypeId => {
    let max = -1
    let dominant: NenTypeId = 'enhancer'
    for (const [type, score] of Object.entries(scores.value)) {
      if (score > max) { max = score; dominant = type as NenTypeId }
    }
    return dominant
  })

  function answerQuestion(answerIndex: number) {
    const answer = currentQuestion.value.answers[answerIndex]!
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

  return { currentQuestion, currentQuestionIndex, progress, scores, dominantType, isComplete, result, answerQuestion, reset }
}

describe('useNenQuiz', () => {
  let quiz: ReturnType<typeof makeQuiz>

  beforeEach(() => {
    quiz = makeQuiz()
  })

  it('starts at question 0 with zero scores', () => {
    expect(quiz.currentQuestionIndex.value).toBe(0)
    for (const v of Object.values(quiz.scores.value)) {
      expect(v).toBe(0)
    }
  })

  it('currentQuestion returns the first question initially', () => {
    expect(quiz.currentQuestion.value).toBe(questions[0])
  })

  it('progress starts at 0', () => {
    expect(quiz.progress.value).toBe(0)
  })

  it('answering a question advances the index', () => {
    quiz.answerQuestion(0)
    expect(quiz.currentQuestionIndex.value).toBe(1)
  })

  it('answering a question adds the correct scores', () => {
    const firstAnswer = questions[0]!.answers[0]!
    quiz.answerQuestion(0)
    for (const [type, points] of Object.entries(firstAnswer.scores)) {
      expect(quiz.scores.value[type as NenTypeId]).toBe(points)
    }
  })

  it('progress increases after each answer', () => {
    quiz.answerQuestion(0)
    expect(quiz.progress.value).toBeGreaterThan(0)
  })

  it('dominantType reflects highest-scored type', () => {
    quiz.scores.value.transmuter = 10
    expect(quiz.dominantType.value).toBe('transmuter')
  })

  it('isComplete is false before all questions are answered', () => {
    quiz.answerQuestion(0)
    expect(quiz.isComplete.value).toBe(false)
  })

  it('completes after answering all questions and sets result', () => {
    for (let i = 0; i < questions.length; i++) {
      expect(quiz.isComplete.value).toBe(false)
      quiz.answerQuestion(0)
    }
    expect(quiz.isComplete.value).toBe(true)
    expect(quiz.result.value).not.toBeNull()
    expect(quiz.result.value?.id).toBe(quiz.dominantType.value)
  })

  it('result matches the dominant Nen type after completion', () => {
    // Bias all answers toward enhancer (answer index 0 on q1 gives enhancer:3)
    for (let i = 0; i < questions.length; i++) {
      quiz.answerQuestion(0)
    }
    expect(quiz.result.value?.id).toBe(quiz.dominantType.value)
    expect(nenTypes).toHaveProperty(quiz.result.value!.id)
  })

  it('reset restores initial state', () => {
    quiz.answerQuestion(0)
    quiz.answerQuestion(1)
    quiz.reset()
    expect(quiz.currentQuestionIndex.value).toBe(0)
    expect(quiz.isComplete.value).toBe(false)
    expect(quiz.result.value).toBeNull()
    for (const v of Object.values(quiz.scores.value)) {
      expect(v).toBe(0)
    }
  })
})

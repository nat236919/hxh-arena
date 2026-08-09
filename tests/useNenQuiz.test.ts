import { describe, it, expect, beforeEach } from 'vitest'
import { ref, computed } from 'vue'
import { questions as rawQuestions } from '../app/data/questions'
import { nenTypes } from '../app/data/nenTypes'
import type { NenTypeId, NenType } from '../app/data/nenTypes'
import type { Question } from '../app/data/questions'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!]
  }
  return a
}

function buildShuffledQuestions(): Question[] {
  return rawQuestions.map(q => ({ ...q, answers: shuffle(q.answers) }))
}

// Inline composable logic — mirrors useNenQuiz.ts without Nuxt auto-imports
function makeQuiz() {
  const questions = ref<Question[]>(buildShuffledQuestions())
  const currentQuestionIndex = ref(0)
  const scores = ref<Record<NenTypeId, number>>({
    enhancer: 0, transmuter: 0, emitter: 0, conjurer: 0, manipulator: 0, specialist: 0,
  })
  const isComplete = ref(false)
  const result = ref<NenType | null>(null)

  const currentQuestion = computed((): Question => questions.value[currentQuestionIndex.value]!)
  const progress = computed(() => (currentQuestionIndex.value / questions.value.length) * 100)
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

  return { questions, currentQuestion, currentQuestionIndex, progress, scores, dominantType, isComplete, result, answerQuestion, reset }
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
    expect(quiz.currentQuestion.value.id).toBe(quiz.questions.value[0]!.id)
  })

  it('progress starts at 0', () => {
    expect(quiz.progress.value).toBe(0)
  })

  it('answering a question advances the index', () => {
    quiz.answerQuestion(0)
    expect(quiz.currentQuestionIndex.value).toBe(1)
  })

  it('answering a question adds the correct scores', () => {
    const firstAnswer = quiz.currentQuestion.value.answers[0]!
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
    for (let i = 0; i < rawQuestions.length; i++) {
      expect(quiz.isComplete.value).toBe(false)
      quiz.answerQuestion(0)
    }
    expect(quiz.isComplete.value).toBe(true)
    expect(quiz.result.value).not.toBeNull()
    expect(quiz.result.value?.id).toBe(quiz.dominantType.value)
  })

  it('result matches the dominant Nen type after completion', () => {
    for (let i = 0; i < rawQuestions.length; i++) {
      quiz.answerQuestion(0)
    }
    expect(quiz.result.value?.id).toBe(quiz.dominantType.value)
    expect(nenTypes).toHaveProperty(quiz.result.value!.id)
  })

  it('reset restores initial state and reshuffles answers', () => {
    const orderBefore = quiz.questions.value[0]!.answers.map(a => a.text)
    quiz.answerQuestion(0)
    quiz.answerQuestion(1)
    quiz.reset()
    expect(quiz.currentQuestionIndex.value).toBe(0)
    expect(quiz.isComplete.value).toBe(false)
    expect(quiz.result.value).toBeNull()
    for (const v of Object.values(quiz.scores.value)) {
      expect(v).toBe(0)
    }
    // Answer texts should still all be present after reshuffle (order may differ)
    const orderAfter = quiz.questions.value[0]!.answers.map(a => a.text)
    expect(orderAfter.sort()).toEqual(orderBefore.sort())
  })

  it('shuffled questions contain the same answers as the originals', () => {
    for (let i = 0; i < rawQuestions.length; i++) {
      const original = rawQuestions[i]!.answers.map(a => a.text).sort()
      const shuffled = quiz.questions.value[i]!.answers.map(a => a.text).sort()
      expect(shuffled).toEqual(original)
    }
  })

  it('scores accumulate correctly across multiple answers', () => {
    const a0 = quiz.currentQuestion.value.answers[0]!
    quiz.answerQuestion(0)
    const a1 = quiz.currentQuestion.value.answers[0]!
    quiz.answerQuestion(0)

    for (const [type, points] of Object.entries(a0.scores)) {
      const extra = a1.scores[type as NenTypeId] ?? 0
      expect(quiz.scores.value[type as NenTypeId]).toBe((points ?? 0) + extra)
    }
  })
})

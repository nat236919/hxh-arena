<template>
  <div class="quiz-root" :style="rootVars">
    <div class="aura-bloom" />
    <div class="scanline-overlay" aria-hidden="true" />

    <header class="quiz-header">
      <NuxtLink to="/" class="back-link">
        <span class="back-arrow">‹</span>
        <span class="back-text">Withdraw</span>
      </NuxtLink>
      <div class="exam-number">
        <span class="exam-number-label">Question</span>
        <span class="exam-number-value">{{ currentQuestionIndex + 1 }}<span class="exam-number-total">/{{
          questions.length }}</span></span>
      </div>
    </header>

    <div class="progress-track">
      <div class="progress-fill" :style="{ width: `${progress}%`, background: dominantColor }" />
      <div class="progress-aura" :style="{ width: `${progress}%`, background: dominantColor }" />
    </div>

    <main class="quiz-main">
      <QuizGlass :dominant-color="dominantColor" :aura-fill="auraFill" :is-dark="isDark" :progress="progress"
        :current-index="currentQuestionIndex" :total="questions.length" />
      <QuizQuestion :question="currentQuestion" :current-index="currentQuestionIndex" :dominant-color="dominantColor"
        :selected-answer="selectedAnswer" @answer="handleAnswer" />
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const { questions, currentQuestion, currentQuestionIndex, progress, isComplete, result, answerQuestion } = useNenQuiz()
const { isDark } = useTheme()

const selectedAnswer = ref<number | null>(null)

const dominantColor = computed(() =>
  isDark.value ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.25)'
)
const auraFill = computed(() =>
  isDark.value ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'
)
const rootVars = computed(() => ({
  '--dominant': dominantColor.value,
  '--dominant-glow': isDark.value ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
}))

function handleAnswer(idx: number) {
  if (selectedAnswer.value !== null) return
  selectedAnswer.value = idx
  setTimeout(() => {
    answerQuestion(idx)
    selectedAnswer.value = null
    if (isComplete.value) {
      router.push(`/result?type=${result.value?.id}`)
    }
  }, 650)
}
</script>

<style scoped>
.quiz-root {
  position: relative;
  min-height: 100vh;
  background: var(--hxh-bg-deep);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.aura-bloom {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(ellipse, var(--dominant-glow, rgba(201, 162, 39, 0.15)) 0%, transparent 70%);
  pointer-events: none;
  animation: bloom-breathe 5s ease-in-out infinite;
  transition: background 0.8s ease;
}

@keyframes bloom-breathe {

  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }

  50% {
    transform: translate(-50%, -50%) scale(1.12);
    opacity: 1;
  }
}

.scanline-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(0deg, transparent, transparent 3px,
      rgba(0, 0, 0, 0.04) 3px, rgba(0, 0, 0, 0.04) 4px);
  z-index: 1;
}

.quiz-header {
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px 12px;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  color: rgba(220, 220, 220, 0.55);
  font-family: var(--font-heading);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: color 0.2s;
}

.back-link:hover {
  color: rgba(255, 255, 255, 0.9);
}

.back-arrow {
  font-size: 1.1rem;
  line-height: 1;
}

.exam-number {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--font-heading);
}

.exam-number-label {
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(220, 220, 220, 0.55);
}

.exam-number-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.1;
}

.exam-number-total {
  font-size: 0.75rem;
  color: rgba(220, 220, 220, 0.55);
  font-weight: 400;
}

.progress-track {
  position: relative;
  z-index: 20;
  height: 3px;
  background: rgba(255, 255, 255, 0.05);
  overflow: visible;
  margin: 0 24px;
}

.progress-fill {
  height: 100%;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1), background 0.6s ease;
  position: relative;
  z-index: 2;
}

.progress-aura {
  position: absolute;
  top: -2px;
  left: 0;
  height: 7px;
  filter: blur(4px);
  opacity: 0.6;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1), background 0.6s ease;
}

.quiz-main {
  position: relative;
  z-index: 10;
  flex: 1;
  display: flex;
  gap: 0;
  padding: 28px 24px 32px;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 600px) {
  .quiz-main {
    flex-direction: column;
    gap: 16px;
    padding: 12px 16px 24px;
  }

  .progress-track {
    display: none;
  }
}
</style>

<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen px-4 py-12 overflow-hidden">
    <!-- Dynamic background based on dominant type -->
    <div class="absolute inset-0 pointer-events-none transition-colors duration-1000"
      :style="{ background: `radial-gradient(ellipse at center, ${dominantGlow} 0%, transparent 70%)` }" />

    <!-- Header -->
    <div class="relative z-10 w-full max-w-2xl mb-8">
      <div class="flex items-center justify-between mb-3">
        <NuxtLink to="/" class="text-gray-500 hover:text-gray-300 transition-colors text-sm">
          ← Back
        </NuxtLink>
        <span class="text-gray-500 text-sm">
          {{ currentQuestionIndex + 1 }} / {{ questions.length }}
        </span>
      </div>
      <!-- Progress bar -->
      <div class="h-1 bg-gray-800 rounded-full overflow-hidden">
        <div class="h-full rounded-full transition-all duration-700 ease-out"
          :style="{ width: `${progress}%`, background: dominantColor }" />
      </div>
    </div>

    <!-- Bowl indicator (shrunk, reactive) -->
    <div class="relative z-10 mb-8">
      <div class="bowl-mini" :style="{ '--glow': dominantGlow }">
        <svg viewBox="0 0 120 90" class="w-28 h-20" xmlns="http://www.w3.org/2000/svg">
          <path d="M 18 36 Q 18 84 60 87 Q 102 84 102 36 Z" fill="#1f2937" stroke="#374151" stroke-width="1" />
          <ellipse cx="60" cy="36" rx="42" ry="7" fill="#374151" stroke="#6b7280" stroke-width="0.8" />
          <ellipse cx="60" cy="37" rx="37" ry="6" :fill="waterFill" class="water-surface" />
          <ellipse cx="60" cy="37" rx="30" ry="5" :fill="auraFill" class="aura-layer" />
          <ellipse cx="60" cy="37" rx="15" ry="3" fill="none" :stroke="dominantColor" stroke-width="0.8" class="ripple"
            style="animation-delay:0s" />
          <ellipse cx="60" cy="37" rx="28" ry="5" fill="none" :stroke="dominantColor" stroke-width="0.5" class="ripple"
            style="animation-delay:0.5s" />
        </svg>
      </div>
    </div>

    <!-- Question card -->
    <Transition name="slide-up" mode="out-in">
      <div v-if="currentQuestion" :key="currentQuestion.id" class="relative z-10 w-full max-w-2xl">
        <div class="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-6 shadow-2xl">
          <p class="text-gray-400 text-xs tracking-widest uppercase mb-4">Question {{ currentQuestionIndex + 1 }}</p>
          <h2 class="text-xl md:text-2xl font-medium text-white leading-relaxed">
            {{ currentQuestion.text }}
          </h2>
        </div>

        <!-- Answers -->
        <div class="grid gap-3">
          <button v-for="(answer, idx) in currentQuestion.answers" :key="idx"
            class="answer-btn group text-left px-6 py-4 bg-gray-900 border border-gray-800 rounded-xl text-gray-300 hover:text-white transition-all duration-200 hover:border-gray-600 hover:bg-gray-800 active:scale-[0.98]"
            :class="{ 'selected': selectedAnswer === idx }"
            :style="selectedAnswer === idx ? { borderColor: dominantColor, boxShadow: `0 0 20px ${dominantGlow}` } : {}"
            :disabled="selectedAnswer !== null" @click="handleAnswer(idx)">
            <span class="inline-flex items-center gap-3">
              <span
                class="w-6 h-6 rounded-full border border-gray-700 flex items-center justify-center text-xs font-bold group-hover:border-gray-400 transition-colors"
                :style="selectedAnswer === idx ? { background: dominantColor, borderColor: dominantColor, color: '#111' } : {}">
                {{ String.fromCharCode(65 + idx) }}
              </span>
              {{ answer.text }}
            </span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { nenTypes } from '~/data/nenTypes'

const router = useRouter()
const { questions, currentQuestion, currentQuestionIndex, progress, dominantType, isComplete, answerQuestion } = useNenQuiz()

const selectedAnswer = ref<number | null>(null)

const dominantColor = computed(() => nenTypes[dominantType.value]?.color ?? '#a78bfa')
const dominantGlow = computed(() => nenTypes[dominantType.value]?.glowColor ?? 'rgba(167,139,250,0.3)')
const waterFill = computed(() => nenTypes[dominantType.value]?.color ?? '#60a5fa')
const auraFill = computed(() => nenTypes[dominantType.value]?.glowColor ?? 'rgba(167,139,250,0.2)')

function handleAnswer(idx: number) {
  if (selectedAnswer.value !== null) return
  selectedAnswer.value = idx

  setTimeout(() => {
    answerQuestion(idx)
    selectedAnswer.value = null
    if (isComplete.value) {
      router.push('/result')
    }
  }, 600)
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.35s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.bowl-mini {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 12px var(--glow));
}

.water-surface {
  animation: water-shimmer 2s ease-in-out infinite;
}

@keyframes water-shimmer {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.8;
  }
}

.aura-layer {
  animation: aura-pulse 2.5s ease-in-out infinite;
}

@keyframes aura-pulse {

  0%,
  100% {
    opacity: 0.4;
  }

  50% {
    opacity: 0.8;
  }
}

.ripple {
  transform-origin: center;
  animation: ripple-out 2s ease-out infinite;
}

@keyframes ripple-out {
  0% {
    opacity: 1;
    transform: scale(0.5);
  }

  100% {
    opacity: 0;
    transform: scale(1.3);
  }
}

.answer-btn:disabled {
  cursor: default;
}

.answer-btn:not(:disabled):hover {
  transform: translateX(4px);
}
</style>

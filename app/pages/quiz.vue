<template>
  <div class="quiz-root" :style="rootVars">
    <!-- Background aura bloom -->
    <div class="aura-bloom" />
    <div class="scanline-overlay" aria-hidden="true" />

    <!-- Top bar -->
    <header class="quiz-header">
      <NuxtLink to="/" class="back-link">
        <span class="back-arrow">‹</span>
        <span class="back-text">Withdraw</span>
      </NuxtLink>

      <!-- Exam number badge -->
      <div class="exam-number">
        <span class="exam-number-label">Question</span>
        <span class="exam-number-value">{{ currentQuestionIndex + 1 }}<span class="exam-number-total">/{{
          questions.length }}</span></span>
      </div>

      <!-- Nen type hidden until result -->
    </header>

    <!-- Progress track -->
    <div class="progress-track">
      <div class="progress-fill" :style="{ width: `${progress}%`, background: dominantColor }" />
      <div class="progress-aura" :style="{ width: `${progress}%`, background: dominantColor }" />
    </div>

    <!-- Main area -->
    <main class="quiz-main">

      <!-- Left: animated glass -->
      <aside class="glass-side">
        <div class="mini-glass-wrap" :style="{ '--glow': dominantColor }">
          <!-- Nen seal background -->
          <svg class="nen-seal-bg" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(184,36,75,0.08)" stroke-width="0.5" />
            <polygon points="24,4 41,13.5 41,34.5 24,44 7,34.5 7,13.5"
              fill="none" stroke="rgba(184,36,75,0.18)" stroke-width="0.8" stroke-linejoin="round" />
            <circle cx="24" cy="24" r="9" fill="none" stroke="rgba(232,66,10,0.12)" stroke-width="0.6" />
            <line x1="24" y1="15" x2="24" y2="4"   stroke="rgba(184,36,75,0.1)" stroke-width="0.5" />
            <line x1="24" y1="33" x2="24" y2="44"  stroke="rgba(184,36,75,0.1)" stroke-width="0.5" />
            <line x1="15.7" y1="19.5" x2="7" y2="13.5"  stroke="rgba(184,36,75,0.1)" stroke-width="0.5" />
            <line x1="32.3" y1="28.5" x2="41" y2="34.5" stroke="rgba(184,36,75,0.1)" stroke-width="0.5" />
            <line x1="32.3" y1="19.5" x2="41" y2="13.5" stroke="rgba(184,36,75,0.1)" stroke-width="0.5" />
            <line x1="15.7" y1="28.5" x2="7" y2="34.5"  stroke="rgba(184,36,75,0.1)" stroke-width="0.5" />
            <circle cx="24" cy="24" r="2" fill="rgba(232,66,10,0.18)" />
          </svg>
          <svg viewBox="0 0 160 130" class="mini-glass-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="qz-glass-fill" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" :stop-color="isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'" />
                <stop offset="45%" :stop-color="isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'" />
                <stop offset="100%" :stop-color="isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'" />
              </linearGradient>
              <linearGradient id="qz-glass-stroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" :stop-color="isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)'" />
                <stop offset="35%" :stop-color="isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)'" />
                <stop offset="65%" :stop-color="isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)'" />
                <stop offset="100%" :stop-color="isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.38)'" />
              </linearGradient>
              <linearGradient id="qz-spec" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" :stop-color="isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.18)'" />
                <stop offset="100%" stop-color="rgba(0,0,0,0)" />
              </linearGradient>
              <linearGradient id="qz-rim-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" :stop-color="isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'" />
                <stop offset="100%" :stop-color="isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.4)'" />
              </linearGradient>
              <radialGradient id="qz-water-fill" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="rgba(184,36,75,0.18)" />
                <stop offset="100%" stop-color="rgba(0,111,68,0.10)" />
              </radialGradient>
            </defs>

            <!-- Ground shadow -->
            <ellipse cx="80" cy="126" rx="30" ry="3" :fill="isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.12)'" />

            <!-- Glass body -->
            <path d="
              M 44,18
              Q 40,46 56,66
              Q 66,78 75,81
              L 74,98
              Q 71,101 63,102
              L 63,106
              L 97,106
              L 97,102
              Q 89,101 86,98
              L 85,81
              Q 94,78 104,66
              Q 120,46 116,18
              Z" fill="url(#qz-glass-fill)" stroke="url(#qz-glass-stroke)" stroke-width="1.2"
              stroke-linejoin="round" />

            <!-- Left specular highlight streak -->
            <path d="M 47,21 Q 44,44 57,62 Q 65,74 73,78" fill="none" stroke="url(#qz-spec)" stroke-width="2.5"
              stroke-linecap="round" opacity="0.5" />

            <!-- Stem highlight -->
            <line x1="78" y1="82" x2="77" y2="100" :stroke="isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'"
              stroke-width="0.8" stroke-linecap="round" />

            <!-- Base ellipse -->
            <ellipse cx="80" cy="107" rx="17" ry="3.5" :fill="isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'"
              :stroke="isDark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.28)'" stroke-width="1" />

            <!-- Rim ellipse (3D opening) -->
            <ellipse cx="80" cy="18" rx="36" ry="7" fill="url(#qz-water-fill)" stroke="url(#qz-rim-grad)"
              stroke-width="1.2" />

            <!-- Aura glow on water surface -->
            <ellipse cx="80" cy="18" rx="30" ry="5.5" :fill="auraFill" class="aura-anim" />

            <!-- Ripples in dominant Nen color -->
            <ellipse cx="80" cy="18" rx="10" ry="2" fill="none" :stroke="dominantColor" stroke-width="1"
              class="ripple rp1" />
            <ellipse cx="80" cy="18" rx="20" ry="3.5" fill="none" :stroke="dominantColor" stroke-width="0.7"
              class="ripple rp2" />
            <ellipse cx="80" cy="18" rx="28" ry="5" fill="none" :stroke="dominantColor" stroke-width="0.5"
              class="ripple rp3" />

            <!-- Floating leaf at water surface -->
            <g class="leaf-anim">
              <ellipse cx="80" cy="17" rx="7" ry="2" fill="#3A7A3A" opacity="0.9" />
              <line x1="74" y1="17" x2="86" y2="17" stroke="#2A5A2A" stroke-width="0.6" />
            </g>
          </svg>

        </div>

        <!-- Aura flow lines -->
        <div class="aura-lines" aria-hidden="true">
          <div v-for="n in 5" :key="n" class="aura-line" :style="auraLineStyle(n)" />
        </div>
      </aside>

      <!-- Right: question + answers -->
      <section class="question-side">
        <Transition name="q-slide" mode="out-in">
          <div v-if="currentQuestion" :key="currentQuestion.id" class="question-block">

            <!-- Question label -->
            <div class="question-tag">
              <span class="question-x">×</span>
              <span class="question-label-text">Scenario {{ currentQuestionIndex + 1 }}</span>
            </div>

            <!-- Question text -->
            <div class="question-card">
              <p class="question-text">{{ currentQuestion.text }}</p>
            </div>

            <!-- Answers -->
            <div class="answers-list">
              <button v-for="(answer, idx) in currentQuestion.answers" :key="idx" class="answer-btn" :class="{
                'answer-btn--selected': selectedAnswer === idx,
                'answer-btn--disabled': selectedAnswer !== null && selectedAnswer !== idx,
              }" :style="selectedAnswer === idx
                ? { borderColor: dominantColor, '--aura': dominantColor }
                : {}" :disabled="selectedAnswer !== null" @click="handleAnswer(idx)">
                <span class="answer-key"
                  :style="selectedAnswer === idx ? { background: dominantColor, color: '#08111e', borderColor: dominantColor } : {}">
                  {{ String.fromCharCode(65 + idx) }}
                </span>
                <span class="answer-text">{{ answer.text }}</span>
                <span v-if="selectedAnswer === idx" class="answer-check">✓</span>
              </button>
            </div>
          </div>
        </Transition>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const { questions, currentQuestion, currentQuestionIndex, progress, isComplete, answerQuestion } = useNenQuiz()
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

function auraLineStyle(n: number) {
  const delay = n * 0.4
  const duration = 3 + n * 0.5
  const width = 60 + n * 10
  const lineColor = isDark.value ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'
  return {
    width: `${width}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    background: `linear-gradient(90deg, transparent, ${lineColor}, transparent)`,
  }
}

function handleAnswer(idx: number) {
  if (selectedAnswer.value !== null) return
  selectedAnswer.value = idx
  setTimeout(() => {
    answerQuestion(idx)
    selectedAnswer.value = null
    if (isComplete.value) {
      router.push('/result')
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

/* Aura bloom behind content */
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

/* ---- Header ---- */
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

.nen-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(220, 220, 220, 0.6);
  transition: color 0.5s;
}

.nen-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  transition: background 0.5s, box-shadow 0.5s;
}

.nen-type-name {
  min-width: 5rem;
  text-align: right;
  color: var(--dominant, rgba(201, 162, 39, 0.7));
  transition: color 0.5s;
}

/* ---- Progress ---- */
.progress-track {
  position: relative;
  z-index: 20;
  height: 3px;
  background: rgba(255, 255, 255, 0.05);
  overflow: visible;
  margin: 0 24px 0;
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

/* ---- Main layout ---- */
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

/* ---- Glass side ---- */
.glass-side {
  flex-shrink: 0;
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
  padding-right: 24px;
}

.mini-glass-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: drop-shadow(0 0 14px var(--glow, rgba(201, 162, 39, 0.4)));
  transition: filter 0.5s;
}

.mini-glass-svg {
  width: 80px;
  position: relative;
  z-index: 1;
}

.nen-seal-bg {
  position: absolute;
  inset: -30%;
  width: 160%;
  height: 160%;
  opacity: 0.8;
  animation: seal-rotate 24s linear infinite;
  pointer-events: none;
}

@keyframes seal-rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.glass-type-tag {
  margin-top: 10px;
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border: 1px solid;
  padding: 4px 12px;
  border-radius: 2px;
  opacity: 0.9;
  transition: color 0.5s, border-color 0.5s;
}

.aura-lines {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.aura-line {
  height: 1px;
  border-radius: 1px;
  animation: line-pulse linear infinite;
  opacity: 0;
}

@keyframes line-pulse {
  0% {
    opacity: 0;
    transform: scaleX(0.3);
  }

  30% {
    opacity: 0.7;
    transform: scaleX(1);
  }

  70% {
    opacity: 0.7;
    transform: scaleX(1);
  }

  100% {
    opacity: 0;
    transform: scaleX(0.3);
  }
}

/* Glass water/aura animations */
.water-anim {
  animation: water-flicker 2s ease-in-out infinite;
}

@keyframes water-flicker {

  0%,
  100% {
    opacity: 0.85;
  }

  50% {
    opacity: 0.65;
  }
}

.aura-anim {
  animation: aura-breathe 3s ease-in-out infinite;
}

@keyframes aura-breathe {

  0%,
  100% {
    opacity: 0.3;
  }

  50% {
    opacity: 0.65;
  }
}

.ripple {
  transform-origin: center;
  animation: ripple-out 2.8s ease-out infinite;
}

.rp1 {
  animation-delay: 0s;
}

.rp2 {
  animation-delay: 0.6s;
}

.rp3 {
  animation-delay: 1.2s;
}

@keyframes ripple-out {
  0% {
    opacity: 1;
    transform: scale(0.3);
  }

  100% {
    opacity: 0;
    transform: scale(1.2);
  }
}

.leaf-anim {
  animation: leaf-drift 2.2s ease-in-out infinite;
  transform-origin: center;
}

@keyframes leaf-drift {

  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(1.5px, -2px);
  }
}

/* ---- Question side ---- */
.question-side {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

/* Transition */
.q-slide-enter-active,
.q-slide-leave-active {
  transition: all 0.3s ease;
}

.q-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.q-slide-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}

.question-block {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}

/* Question tag */
.question-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(220, 220, 220, 0.6);
}

.question-x {
  color: var(--dominant, #E8A000);
  font-size: 0.8rem;
  opacity: 0.7;
}

/* Question card */
.question-card {
  background: rgba(255, 255, 255, 0.06);
  border-left: 3px solid var(--dominant, rgba(201, 162, 39, 0.7));
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 22px 24px;
  border-radius: 0 6px 6px 0;
  transition: border-color 0.5s;
}

.question-text {
  font-family: var(--font-body);
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
}

/* Answers */
.answers-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.answer-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: all 0.22s ease;
  overflow: hidden;
}

.answer-btn::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: var(--aura, rgba(201, 162, 39, 0.12));
  transition: width 0.3s ease;
}

.answer-btn:not(:disabled):hover {
  border-color: rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.07);
  transform: translateX(3px);
}

.answer-btn:not(:disabled):hover::before {
  width: 100%;
}

.answer-btn--selected {
  border-color: var(--aura, #E8A000) !important;
  background: rgba(255, 255, 255, 0.05) !important;
}

.answer-btn--selected::before {
  width: 100%;
}

.answer-btn--disabled {
  opacity: 0.35;
  cursor: default;
}

.answer-key {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(220, 220, 220, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 700;
  color: rgba(220, 220, 220, 0.75);
  letter-spacing: 0;
  transition: all 0.25s;
}

.answer-text {
  font-family: var(--font-body);
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.45;
  position: relative;
  z-index: 1;
}

.answer-check {
  margin-left: auto;
  color: var(--dominant, #E8A000);
  font-size: 0.9rem;
  position: relative;
  z-index: 1;
  font-weight: 700;
}

/* ---- Responsive ---- */
@media (max-width: 600px) {
  .glass-side {
    display: none;
  }

  .quiz-main {
    padding: 16px 16px 24px;
  }
}
</style>

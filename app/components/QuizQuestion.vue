<template>
  <section class="question-side">
    <Transition name="q-slide" mode="out-in">
      <div v-if="question" :key="question.id" class="question-block">

        <div class="question-tag">
          <span class="question-x">×</span>
          <span class="question-label-text">Scenario {{ currentIndex + 1 }}</span>
        </div>

        <div class="question-card">
          <p class="question-text">{{ question.text }}</p>
        </div>

        <div class="answers-list">
          <button v-for="(answer, idx) in question.answers" :key="idx" class="answer-btn" :class="{
            'answer-btn--selected': selectedAnswer === idx,
            'answer-btn--disabled': selectedAnswer !== null && selectedAnswer !== idx,
          }" :style="selectedAnswer === idx ? { borderColor: dominantColor, '--aura': dominantColor } : {}"
            :disabled="selectedAnswer !== null" @click="emit('answer', idx)">
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
</template>

<script setup lang="ts">
defineProps<{
  question: { id: string | number; text: string; answers: { text: string }[] } | null
  currentIndex: number
  dominantColor: string
  selectedAnswer: number | null
}>()

const emit = defineEmits<{ answer: [idx: number] }>()
</script>

<style scoped>
.question-side {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

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
</style>

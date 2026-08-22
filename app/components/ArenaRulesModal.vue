<template>
  <Transition name="modal-fade">
    <div v-if="open" class="modal-backdrop" @click.self="emit('close')">
      <div class="modal-box">
        <div class="modal-accent" />
        <button class="modal-close" @click="emit('close')">&times;</button>

        <div class="modal-header">
          <h2 class="modal-title">How Fights Work</h2>
          <p class="modal-subtitle">闘技場ルール &middot; Arena Rules</p>
        </div>

        <div class="rules-body">
          <div class="rule-section">
            <h3 class="rule-heading">Power Formula</h3>
            <p class="rule-formula">
              Power = (Str/Spd &times; Nen Bonus) + Aura + (Def &times; 0.8) + (Int &times; 0.9) + Dice (2d6)
            </p>
          </div>

          <div class="rule-section">
            <h3 class="rule-heading">Nen Type Bonuses</h3>
            <div class="bonus-grid">
              <div v-for="entry in nenBonuses" :key="entry.type" class="bonus-row">
                <span class="bonus-type" :style="{ color: entry.color }">{{ entry.label }}</span>
                <span class="bonus-value">{{ entry.value }}</span>
              </div>
            </div>
          </div>

          <div class="rule-section">
            <h3 class="rule-heading">Nen Matchups</h3>
            <div class="matchup-list">
              <div class="matchup-item matchup-item--affinity">
                <span class="matchup-label">NEN AFFINITY</span>
                <span class="matchup-desc">Compatible types on the Nen wheel get +5% power</span>
              </div>
              <div class="matchup-item matchup-item--clash">
                <span class="matchup-label">NEN CLASH</span>
                <span class="matchup-desc">Opposed types on the Nen wheel get -5% power</span>
              </div>
            </div>
          </div>

          <div class="rule-section">
            <h3 class="rule-heading">Victory</h3>
            <p class="rule-text">Higher power wins. If the difference is less than 0.5, it is a draw.</p>
          </div>

          <div class="rule-section">
            <h3 class="rule-heading">Leaderboard</h3>
            <p class="rule-text">You need at least 10 fights to appear on the leaderboard. Ranked by win rate.</p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { nenTypes } from '~/data/nenTypes'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const nenBonuses = [
  { type: 'enhancer', label: 'Enhancer', value: '1.4x', color: nenTypes.enhancer.color },
  { type: 'emitter', label: 'Emitter', value: '1.3x', color: nenTypes.emitter.color },
  { type: 'transmuter', label: 'Transmuter', value: '1.2x', color: nenTypes.transmuter.color },
  { type: 'conjurer', label: 'Conjurer', value: '1.1x', color: nenTypes.conjurer.color },
  { type: 'manipulator', label: 'Manipulator', value: '1.0x', color: nenTypes.manipulator.color },
  { type: 'specialist', label: 'Specialist', value: '0.8-1.6x', color: nenTypes.specialist.color },
]
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
}

.modal-box {
  position: relative;
  background: var(--hxh-bg-mid);
  border: 1px solid var(--hxh-border-subtle);
  border-radius: 6px;
  max-width: 440px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 0 40px rgba(184, 36, 75, 0.15), 0 16px 48px rgba(0, 0, 0, 0.8);
  animation: modal-slide-in 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modal-slide-in {
  from {
    transform: translateY(12px) scale(0.97);
    opacity: 0;
  }

  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.modal-accent {
  height: 3px;
  width: 100%;
  background: #b8244b;
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 16px;
  background: transparent;
  border: none;
  color: var(--hxh-text-muted);
  font-size: 1.2rem;
  cursor: pointer;
  line-height: 1;
  padding: 4px 6px;
  transition: color 0.2s;
}

.modal-close:hover {
  color: var(--hxh-text-primary);
}

.modal-header {
  padding: 18px 20px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.modal-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--hxh-text-primary);
  letter-spacing: 0.06em;
  margin: 0 0 4px;
}

.modal-subtitle {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--hxh-text-muted);
  margin: 0;
}

.rules-body {
  padding: 16px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.rule-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.rule-heading {
  font-family: var(--font-heading);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(184, 36, 75, 0.8);
  margin: 0;
}

.rule-formula {
  font-family: var(--font-heading);
  font-size: 0.78rem;
  color: var(--hxh-text-secondary);
  line-height: 1.6;
  margin: 0;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  padding: 10px 12px;
}

.rule-text {
  font-family: var(--font-body);
  font-size: 0.82rem;
  color: var(--hxh-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.bonus-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 16px;
}

.bonus-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}

.bonus-type {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.bonus-value {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  color: var(--hxh-text-muted);
  letter-spacing: 0.05em;
}

.matchup-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.matchup-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  border-radius: 3px;
}

.matchup-item--affinity {
  background: rgba(80, 200, 120, 0.06);
  border: 1px solid rgba(80, 200, 120, 0.15);
}

.matchup-item--clash {
  background: rgba(232, 160, 0, 0.06);
  border: 1px solid rgba(232, 160, 0, 0.15);
}

.matchup-label {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  flex-shrink: 0;
  min-width: 85px;
}

.matchup-item--affinity .matchup-label {
  color: #50c878;
}

.matchup-item--clash .matchup-label {
  color: #e8a000;
}

.matchup-desc {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--hxh-text-muted);
  line-height: 1.4;
}
</style>

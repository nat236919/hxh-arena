<template>
  <div class="fight-result">
    <div class="verdict" :class="`verdict--${result.winner}`">
      <span class="verdict-label">{{ verdictLabel }}</span>
    </div>

    <div class="combatants">
      <div class="combatant">
        <div class="portrait portrait--you" :style="{ '--pc': challengerColor }">
          <svg viewBox="0 0 64 80" xmlns="http://www.w3.org/2000/svg" class="silhouette">
            <ellipse cx="32" cy="22" rx="14" ry="16" fill="currentColor" opacity="0.7" />
            <path d="M8 80 Q8 50 32 46 Q56 50 56 80Z" fill="currentColor" opacity="0.7" />
          </svg>
          <span class="portrait-label">YOU</span>
        </div>
        <span class="combatant-type" :style="{ color: challengerColor }">
          {{ challenger.nen_type }}
        </span>
        <div class="roll-display">
          <span class="die">{{ diceA }}</span>
          <span class="die">{{ diceB }}</span>
          <span class="roll-total">= {{ result.challengerRoll }}</span>
        </div>
        <span class="power-label">Power: {{ result.challengerPower.toFixed(1) }}</span>
      </div>

      <span class="vs-glyph">VS</span>

      <div class="combatant">
        <div class="portrait portrait--opponent">
          <img v-if="result.opponent.portrait" :src="result.opponent.portrait" :alt="result.opponent.name"
            class="portrait-img" />
          <svg v-else viewBox="0 0 64 80" xmlns="http://www.w3.org/2000/svg" class="silhouette"
            :style="{ color: opponentColor }">
            <ellipse cx="32" cy="22" rx="14" ry="16" fill="currentColor" opacity="0.7" />
            <path d="M8 80 Q8 50 32 46 Q56 50 56 80Z" fill="currentColor" opacity="0.7" />
          </svg>
          <span class="portrait-label">{{ result.opponent.name }}</span>
        </div>
        <span class="combatant-type" :style="{ color: opponentColor }">
          {{ result.opponent.nen_type }}
        </span>
        <div class="roll-display">
          <span class="die">{{ diceC }}</span>
          <span class="die">{{ diceD }}</span>
          <span class="roll-total">= {{ result.opponentRoll }}</span>
        </div>
        <span class="power-label">Power: {{ result.opponentPower.toFixed(1) }}</span>
      </div>
    </div>

    <div class="record-box">
      <span class="record-label">Updated Record</span>
      <span class="record-value">{{ updatedWins }}W / {{ updatedLosses }}L / {{ updatedDraws }}D</span>
    </div>

    <div class="result-actions">
      <button class="action-btn action-btn--primary" @click="emit('fight-again')">Fight Again</button>
      <NuxtLink to="/" class="action-btn action-btn--ghost">Return to Arena</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nenTypes } from '~/data/nenTypes'
import type { FightResult } from '~/composables/useArena'
import type { Character } from '~/composables/useArena'
import type { NenTypeId } from '~/lib/supabase'

const props = defineProps<{
  result: FightResult
  challenger: Character
  diceA: number
  diceB: number
  diceC: number
  diceD: number
}>()

const emit = defineEmits<{ 'fight-again': [] }>()

const verdictLabel = computed(() => {
  if (props.result.winner === 'challenger') return 'VICTORY'
  if (props.result.winner === 'opponent') return 'DEFEAT'
  return 'DRAW'
})

const challengerColor = computed(() =>
  nenTypes[props.challenger.nen_type as NenTypeId]?.color ?? '#E8A000'
)

const opponentColor = computed(() =>
  nenTypes[props.result.opponent.nen_type as NenTypeId]?.color ?? '#E8A000'
)

const updatedWins = computed(() =>
  props.result.winner === 'challenger' ? props.challenger.wins + 1 : props.challenger.wins
)
const updatedLosses = computed(() =>
  props.result.winner === 'opponent' ? props.challenger.losses + 1 : props.challenger.losses
)
const updatedDraws = computed(() =>
  props.result.winner === 'draw' ? props.challenger.draws + 1 : props.challenger.draws
)
</script>

<style scoped>
.fight-result {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.verdict {
  text-align: center;
  padding: 16px 40px;
  border-radius: 4px;
}

.verdict--challenger {
  background: rgba(80, 200, 120, 0.12);
  border: 1px solid rgba(80, 200, 120, 0.3);
}

.verdict--opponent {
  background: rgba(184, 36, 75, 0.12);
  border: 1px solid rgba(184, 36, 75, 0.3);
}

.verdict--draw {
  background: rgba(232, 160, 0, 0.12);
  border: 1px solid rgba(232, 160, 0, 0.3);
}

.verdict-label {
  font-family: var(--font-display);
  font-size: 2.5rem;
  letter-spacing: 0.2em;
}

.verdict--challenger .verdict-label {
  color: #50c878;
}

.verdict--opponent .verdict-label {
  color: #b8244b;
}

.verdict--draw .verdict-label {
  color: #e8a000;
}

.combatants {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
}

.combatant {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

/* Portrait */
.portrait {
  position: relative;
  width: 96px;
  height: 108px;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.portrait--you {
  background: radial-gradient(ellipse at 50% 30%, color-mix(in srgb, var(--pc) 20%, transparent), transparent 70%);
  border: 1px solid color-mix(in srgb, var(--pc) 30%, transparent);
  color: var(--pc);
}

.portrait--opponent {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.portrait-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.silhouette {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.portrait-label {
  position: relative;
  z-index: 1;
  font-family: var(--font-heading);
  font-size: 0.55rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(220, 220, 220, 0.6);
  background: rgba(0, 0, 0, 0.55);
  width: 100%;
  text-align: center;
  padding: 3px 0;
}

.combatant-type {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.roll-display {
  display: flex;
  align-items: center;
  gap: 6px;
}

.die {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--hxh-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.roll-total {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  color: rgba(220, 220, 220, 0.5);
}

.power-label {
  font-family: var(--font-body);
  font-size: 0.78rem;
  color: rgba(220, 220, 220, 0.4);
}

.vs-glyph {
  font-family: var(--font-display);
  font-size: 1.5rem;
  letter-spacing: 0.1em;
  color: rgba(220, 220, 220, 0.2);
}

.record-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px 32px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 6px;
}

.record-label {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(220, 220, 220, 0.3);
}

.record-value {
  font-family: var(--font-display);
  font-size: 1.6rem;
  letter-spacing: 0.1em;
  color: var(--hxh-text-primary);
}

.result-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.action-btn {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border-radius: 4px;
  padding: 12px 28px;
  cursor: pointer;
  transition: opacity 0.2s, background 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.action-btn--primary {
  background: #b8244b;
  border: none;
  color: #fff;
}

.action-btn--primary:hover {
  background: #d42a56;
}

.action-btn--ghost {
  background: transparent;
  border: 1px solid rgba(184, 36, 75, 0.4);
  color: rgba(220, 220, 220, 0.7);
}

.action-btn--ghost:hover {
  background: rgba(184, 36, 75, 0.07);
}
</style>

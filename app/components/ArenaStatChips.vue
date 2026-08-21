<template>
  <div class="stat-card">
    <span v-if="label" class="stat-card-label">{{ label }}</span>

    <div class="stat-bars">
      <div v-for="s in statRows" :key="s.key" class="stat-row">
        <span class="stat-name">{{ s.label }}</span>
        <div class="stat-track">
          <div class="stat-fill" :style="{ width: `${(s.value / MAX_STAT) * 100}%`, background: nenColor }" />
        </div>
        <span class="stat-value">{{ s.value }}</span>
      </div>
    </div>

    <div class="record-row">
      <div class="record-cell record-cell--win">
        <span class="record-num">{{ character.wins }}</span>
        <span class="record-letter">W</span>
      </div>
      <span class="record-sep" />
      <div class="record-cell record-cell--loss">
        <span class="record-num">{{ character.losses }}</span>
        <span class="record-letter">L</span>
      </div>
      <span class="record-sep" />
      <div class="record-cell record-cell--draw">
        <span class="record-num">{{ character.draws }}</span>
        <span class="record-letter">D</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '~/composables/useArena'
import { nenTypes } from '~/data/nenTypes'
import type { NenTypeId } from '~/lib/supabase'

const props = defineProps<{
  character: Character
  label?: string
}>()

const MAX_STAT = 20

const nenColor = computed(() =>
  nenTypes[props.character.nen_type as NenTypeId]?.color ?? '#E8A000'
)

const statRows = computed(() => [
  { key: 'strength_speed', label: 'STR / SPD', value: props.character.strength_speed },
  { key: 'aura', label: 'AURA', value: props.character.aura },
  { key: 'defense', label: 'DEF', value: props.character.defense },
  { key: 'intelligence', label: 'INT', value: props.character.intelligence },
])
</script>

<style scoped>
.stat-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.stat-card-label {
  font-family: var(--font-heading);
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(220, 220, 220, 0.3);
}

.stat-bars {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stat-row {
  display: grid;
  grid-template-columns: 68px 1fr 28px;
  align-items: center;
  gap: 10px;
}

.stat-name {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(220, 220, 220, 0.45);
}

.stat-track {
  height: 5px;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  min-width: 4px;
}

.stat-value {
  font-family: var(--font-display);
  font-size: 0.95rem;
  color: rgba(220, 220, 220, 0.85);
  text-align: right;
}

.record-row {
  display: flex;
  align-items: center;
  gap: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 14px;
}

.record-cell {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.record-num {
  font-family: var(--font-display);
  font-size: 1.6rem;
  line-height: 1;
}

.record-letter {
  font-family: var(--font-heading);
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.record-cell--win .record-num {
  color: #50c878;
}

.record-cell--win .record-letter {
  color: rgba(80, 200, 120, 0.5);
}

.record-cell--loss .record-num {
  color: #b8244b;
}

.record-cell--loss .record-letter {
  color: rgba(184, 36, 75, 0.5);
}

.record-cell--draw .record-num {
  color: rgba(220, 220, 220, 0.55);
}

.record-cell--draw .record-letter {
  color: rgba(220, 220, 220, 0.3);
}

.record-sep {
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.07);
}
</style>

<template>
  <div class="page-root">
    <ArenaBackground />

    <ArenaHeader back-to="/arena" back-label="Change Licence" label="ATTRIBUTE ALLOCATION" />

    <main class="setup-main">
      <div v-if="loading" class="state-center">
        <div class="spinner" />
      </div>

      <template v-else-if="character">
        <div class="setup-hero">
          <p class="setup-tag">ONE-TIME SETUP</p>
          <h1 class="setup-title">Allocate Your Aura</h1>
          <p class="setup-lead">
            You have <strong>{{ TOTAL_POINTS }} points</strong> to distribute.
            This cannot be changed after you confirm.
          </p>
          <div class="nen-badge"
            :style="{ color: nenColor, borderColor: `${nenColor}55`, background: `${nenColor}12` }">
            {{ character.nen_type.charAt(0).toUpperCase() + character.nen_type.slice(1) }}
          </div>
        </div>

        <div class="stats-panel">
          <div v-for="stat in stats" :key="stat.key" class="stat-row">
            <div class="stat-info">
              <span class="stat-name">{{ stat.label }}</span>
              <span class="stat-desc">{{ stat.desc }}</span>
            </div>
            <div class="stat-controls">
              <button class="ctrl-btn" :disabled="values[stat.key] <= MIN_PER_STAT"
                @click="decrement(stat.key)">-</button>
              <span class="stat-value">{{ values[stat.key] }}</span>
              <button class="ctrl-btn" :disabled="remaining <= 0" @click="increment(stat.key)">+</button>
            </div>
          </div>
        </div>

        <div class="points-bar">
          <div class="points-track">
            <div class="points-fill" :style="{ width: `${(spent / TOTAL_POINTS) * 100}%` }" />
          </div>
          <span class="points-label">{{ remaining }} points remaining</span>
        </div>

        <button class="confirm-btn" :disabled="remaining !== 0 || saving" @click="confirm">
          <span v-if="saving" class="btn-spinner" />
          <span v-else>Confirm &amp; Enter Arena</span>
        </button>

        <p class="warning-text">
          Warning: your attributes are permanent. Choose carefully.
        </p>
      </template>

      <div v-else class="state-center">
        <p class="error-text">No Hunter Licence found. <NuxtLink to="/arena" class="inline-link">Go back</NuxtLink>
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useArena } from '~/composables/useArena'
import { nenTypes } from '~/data/nenTypes'
import type { NenTypeId } from '~/lib/supabase'

useHead({ title: 'Setup - HxH Arena' })

const router = useRouter()
const { loadCharacter, lockStats } = useArena()

const TOTAL_POINTS = 20
const MIN_PER_STAT = 1

const stats = [
  { key: 'strength_speed' as const, label: 'Strength / Speed', desc: 'Raw power and movement' },
  { key: 'aura' as const, label: 'Aura', desc: 'Nen output and energy' },
  { key: 'defense' as const, label: 'Defense', desc: 'Resilience and endurance' },
  { key: 'intelligence' as const, label: 'Intelligence', desc: 'Strategy and calculation' },
]

const character = ref<Awaited<ReturnType<typeof loadCharacter>>>(null)
const loading = ref(true)
const saving = ref(false)

const values = reactive({
  strength_speed: MIN_PER_STAT,
  aura: MIN_PER_STAT,
  defense: MIN_PER_STAT,
  intelligence: MIN_PER_STAT,
})

const spent = computed(() => values.strength_speed + values.aura + values.defense + values.intelligence)
const remaining = computed(() => TOTAL_POINTS - spent.value)

const nenColor = computed(() => {
  if (!character.value) return '#E8A000'
  return nenTypes[character.value.nen_type as NenTypeId]?.color ?? '#E8A000'
})

onMounted(async () => {
  const id = sessionStorage.getItem('hunter_licence')
  if (!id) { router.replace('/arena'); return }
  const c = await loadCharacter(id)
  if (!c) { router.replace('/arena'); return }
  if (c.stats_locked) { router.replace('/arena/fight'); return }
  character.value = c
  loading.value = false
})

function increment(key: keyof typeof values) {
  if (remaining.value > 0) values[key]++
}

function decrement(key: keyof typeof values) {
  if (values[key] > MIN_PER_STAT) values[key]--
}

async function confirm() {
  if (!character.value || remaining.value !== 0) return
  const token = sessionStorage.getItem('hunter_token')
  if (!token) { router.replace('/arena'); return }
  saving.value = true
  try {
    const lockedStats = {
      strength_speed: values.strength_speed,
      aura: values.aura,
      defense: values.defense,
      intelligence: values.intelligence,
    }
    await lockStats(character.value.id, token, lockedStats)
    router.push('/arena/fight')
  } catch {
    saving.value = false
  }
}
</script>

<style scoped>
.page-root {
  min-height: 100vh;
  background: var(--hxh-bg-deep);
  color: var(--hxh-text-primary);
  position: relative;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

.setup-main {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 24px 64px;
  max-width: 560px;
  margin: 0 auto;
  width: 100%;
}

.state-center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top-color: rgba(184, 36, 75, 0.8);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.setup-hero {
  text-align: center;
  margin-bottom: 40px;
}

.setup-tag {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  color: rgba(184, 36, 75, 0.8);
  margin-bottom: 10px;
}

.setup-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 6vw, 3.5rem);
  letter-spacing: 0.06em;
  color: var(--hxh-text-primary);
  margin-bottom: 12px;
  line-height: 1;
}

.setup-lead {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: rgba(220, 220, 220, 0.55);
  line-height: 1.65;
  margin-bottom: 16px;
}

.setup-lead strong {
  color: rgba(220, 220, 220, 0.85);
}

.nen-badge {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border: 1px solid;
  border-radius: 2px;
  padding: 4px 12px;
}

.stats-panel {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 28px;
}

.stat-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 6px;
  padding: 14px 18px;
  gap: 16px;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.stat-name {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  letter-spacing: 0.06em;
  color: rgba(220, 220, 220, 0.9);
  text-transform: uppercase;
}

.stat-desc {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: rgba(220, 220, 220, 0.35);
}

.stat-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.ctrl-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: transparent;
  color: rgba(220, 220, 220, 0.8);
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, background 0.2s;
}

.ctrl-btn:hover:not(:disabled) {
  border-color: rgba(184, 36, 75, 0.5);
  background: rgba(184, 36, 75, 0.1);
}

.ctrl-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.stat-value {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--hxh-text-primary);
  min-width: 28px;
  text-align: center;
}

.points-bar {
  width: 100%;
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.points-track {
  height: 4px;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 2px;
  overflow: hidden;
}

.points-fill {
  height: 100%;
  background: #b8244b;
  border-radius: 2px;
  transition: width 0.2s ease;
}

.points-label {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: rgba(220, 220, 220, 0.4);
  text-align: right;
}

.confirm-btn {
  width: 100%;
  background: #b8244b;
  border: none;
  border-radius: 4px;
  padding: 16px;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #fff;
  cursor: pointer;
  transition: opacity 0.2s, background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  margin-bottom: 16px;
}

.confirm-btn:hover:not(:disabled) {
  background: #d42a56;
}

.confirm-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

.warning-text {
  font-family: var(--font-body);
  font-size: 0.78rem;
  color: rgba(220, 220, 220, 0.3);
  text-align: center;
  line-height: 1.5;
}

.error-text {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: rgba(220, 220, 220, 0.5);
}

.inline-link {
  color: rgba(184, 36, 75, 0.9);
  text-decoration: none;
  border-bottom: 1px solid rgba(184, 36, 75, 0.3);
}
</style>

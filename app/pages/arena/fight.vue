<template>
  <div class="page-root">
    <ArenaBackground />

    <ArenaHeader back-to="/arena" back-label="Change Licence" label="ARENA FIGHT" />

    <main class="fight-main">
      <!-- Loading -->
      <div v-if="loading" class="state-center">
        <div class="spinner" />
      </div>

      <!-- Opponent selection -->
      <template v-else-if="phase === 'select' && character">
        <div class="phase-hero">
          <p class="phase-tag">SELECT OPPONENT</p>
          <div class="phase-title-row">
            <h1 class="phase-title">Choose Your Pool</h1>
            <button class="rules-btn" title="How fights work" @click="showRules = true">?</button>
          </div>
          <p class="phase-lead">A random opponent will be drawn from the pool you select.</p>
        </div>

        <div class="pool-cards">
          <ArenaPoolCard name="All Challengers" :description="`Registered Hunters + NPCs (${pool.length} fighters)`"
            @select="selectPool('all')">
            <template #icon>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <line x1="2" y1="18" x2="6" y2="22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <line x1="18" y1="2" x2="22" y2="6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <line x1="2" y1="6" x2="6" y2="2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <line x1="18" y1="22" x2="22" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </template>
          </ArenaPoolCard>

          <ArenaPoolCard name="NPCs Only" description="Face a known fighter from the HxH universe"
            @select="selectPool('npc')">
            <template #icon>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5" />
                <line x1="3" y1="12" x2="9" y2="12" stroke="currentColor" stroke-width="1.5" />
                <line x1="15" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </template>
          </ArenaPoolCard>

          <ArenaPoolCard name="Hunters Only"
            :description="registeredPool.length > 0 ? `${registeredPool.length} registered fighters` : 'No other Hunters yet'"
            :disabled="registeredPool.length === 0" @select="selectPool('registered')">
            <template #icon>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.5" />
                <circle cx="8" cy="12" r="2.5" stroke="currentColor" stroke-width="1.5" />
                <line x1="13" y1="9" x2="19" y2="9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <line x1="13" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <line x1="13" y1="15" x2="17" y2="15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </template>
          </ArenaPoolCard>
        </div>

        <ArenaStatChips :character="character" label="Your Stats" />
      </template>

      <!-- Ability picker -->
      <template v-else-if="phase === 'ability' && character && pendingOpponent">
        <div class="phase-hero">
          <p class="phase-tag">YOUR OPPONENT</p>
          <div class="opponent-reveal">
            <img v-if="pendingOpponent.portrait" :src="pendingOpponent.portrait" :alt="pendingOpponent.name"
              class="opponent-portrait" />
            <div class="opponent-info">
              <span class="opponent-name">{{ pendingOpponent.name }}</span>
              <span class="opponent-type" :style="{ color: opponentColor }">{{ pendingOpponent.nen_type }}</span>
            </div>
          </div>
          <h1 class="phase-title">Choose Your Ability</h1>
          <div class="ability-roll-row">
            <span class="ability-die" :class="{ 'ability-die--rolling': abilityRolling }">{{ abilityRollDisplay
            }}</span>
            <p class="phase-lead" :class="{ 'phase-lead--hidden': abilityRolling }">
              {{ challengerAbilityPool.length }} {{ challengerAbilityPool.length === 1 ? 'ability' : 'abilities' }}
              available.
            </p>
          </div>
        </div>

        <div class="ability-cards" :class="{ 'ability-cards--hidden': abilityRolling }">
          <button v-for="ab in challengerAbilityPool" :key="ab.id" class="ability-card"
            :class="{ 'ability-card--selected': selectedAbilityId === ab.id }" @click="selectedAbilityId = ab.id">
            <div class="ability-card-header">
              <span class="ability-card-name">{{ ab.name }}</span>
              <span v-if="selectedAbilityId === ab.id" class="ability-card-check">&#10003;</span>
            </div>
            <span class="ability-card-effect">{{ ab.effect }}</span>
            <span class="ability-card-desc">{{ ab.description }}</span>
            <span class="ability-card-flavor">{{ ab.flavorText }}</span>
          </button>
        </div>

        <button class="fight-btn" :disabled="!selectedAbilityId || abilityRolling" @click="startFight">
          Fight
        </button>
      </template>

      <!-- Fighting animation -->
      <template v-else-if="phase === 'fighting'">
        <div class="state-center fighting-state">
          <div class="fight-pulse" />
          <p class="fighting-text">FIGHT IN PROGRESS</p>
          <div class="rolling-dice">
            <div class="rolling-side">
              <span class="rolling-label">YOU</span>
              <div class="dice-pair">
                <span class="die die--rolling">{{ rollingA }}</span>
                <span class="die die--rolling">{{ rollingB }}</span>
              </div>
            </div>
            <span class="rolling-vs">VS</span>
            <div class="rolling-side">
              <span class="rolling-label">OPPONENT</span>
              <div class="dice-pair">
                <span class="die die--rolling">{{ rollingC }}</span>
                <span class="die die--rolling">{{ rollingD }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Result -->
      <template v-else-if="phase === 'result' && fightResult && character">
        <ArenaFightResult :result="fightResult" :challenger="character" :dice-a="dieA" :dice-b="dieB" :dice-c="dieC"
          :dice-d="dieD" @fight-again="fightAgain" />
      </template>
    </main>

    <ArenaRulesModal :open="showRules" @close="showRules = false" />
  </div>
</template>

<script setup lang="ts">
import { useArena } from '~/composables/useArena'
import type { FightResult, FightOpponent } from '~/composables/useArena'
import { abilitiesByNenType } from '~/data/abilities'
import { nenTypes } from '~/data/nenTypes'
import type { NenTypeId } from '~/lib/supabase'

useHead({ title: 'Fight - HxH Arena' })

const router = useRouter()
const { loadCharacter, loadOpponentPool, conductFight } = useArena()

const loading = ref(true)
const phase = ref<'select' | 'ability' | 'fighting' | 'result'>('select')
const showRules = ref(false)
const character = ref<Awaited<ReturnType<typeof loadCharacter>>>(null)
const pool = ref<FightOpponent[]>([])
const fightResult = ref<FightResult | null>(null)
const pendingOpponent = ref<FightOpponent | null>(null)
const selectedAbilityId = ref<string | null>(null)
const abilityRoll = ref(1)
const abilityRolling = ref(false)
const abilityRollDisplay = ref(1)
let abilityScrambleTimer: ReturnType<typeof setInterval> | null = null

const challengerColor = computed(() =>
  character.value ? nenTypes[character.value.nen_type as NenTypeId]?.color ?? '#E8A000' : '#E8A000'
)
const opponentColor = computed(() =>
  pendingOpponent.value ? nenTypes[pendingOpponent.value.nen_type as NenTypeId]?.color ?? '#E8A000' : '#E8A000'
)
const challengerAbilityPool = ref<typeof import('~/data/abilities').abilities>([])

function buildAbilityPool(nenType: NenTypeId, count: number) {
  const full = [...(abilitiesByNenType[nenType] ?? [])]
  for (let i = full.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [full[i], full[j]] = [full[j]!, full[i]!]
  }
  challengerAbilityPool.value = full.slice(0, count)
}

const dieA = ref(1)
const dieB = ref(1)
const dieC = ref(1)
const dieD = ref(1)

// scrambling dice shown during the fight animation
const rollingA = ref(1)
const rollingB = ref(1)
const rollingC = ref(1)
const rollingD = ref(1)
let scrambleTimer: ReturnType<typeof setInterval> | null = null

function startScramble() {
  const r = () => Math.ceil(Math.random() * 6)
  scrambleTimer = setInterval(() => {
    rollingA.value = r()
    rollingB.value = r()
    rollingC.value = r()
    rollingD.value = r()
  }, 80)
}

function stopScramble() {
  if (scrambleTimer) { clearInterval(scrambleTimer); scrambleTimer = null }
}

const registeredPool = computed(() => pool.value.filter(o => !o.is_npc))
const npcPool = computed(() => pool.value.filter(o => o.is_npc))

const challengerToken = ref('')

onMounted(async () => {
  const id = sessionStorage.getItem('hunter_licence')
  const token = sessionStorage.getItem('hunter_token')
  if (!id || !token) { router.replace('/arena'); return }
  const c = await loadCharacter(id)
  if (!c) { router.replace('/arena'); return }
  if (!c.stats_locked) { router.replace('/arena/setup'); return }
  character.value = c
  challengerToken.value = token
  pool.value = await loadOpponentPool(id)
  loading.value = false
})

function selectPool(type: 'all' | 'npc' | 'registered') {
  if (!character.value) return
  const subset = type === 'npc' ? npcPool.value : type === 'registered' ? registeredPool.value : pool.value
  if (subset.length === 0) return
  pendingOpponent.value = subset[Math.floor(Math.random() * subset.length)]!
  selectedAbilityId.value = null
  const finalRoll = Math.ceil(Math.random() * 6)
  abilityRoll.value = finalRoll
  abilityRolling.value = true
  abilityRollDisplay.value = 1
  phase.value = 'ability'

  abilityScrambleTimer = setInterval(() => {
    abilityRollDisplay.value = Math.ceil(Math.random() * 6)
  }, 80)

  setTimeout(() => {
    if (abilityScrambleTimer) { clearInterval(abilityScrambleTimer); abilityScrambleTimer = null }
    abilityRollDisplay.value = finalRoll
    buildAbilityPool(character.value!.nen_type as NenTypeId, finalRoll)
    abilityRolling.value = false
  }, 900)
}

async function startFight() {
  if (!character.value || !pendingOpponent.value || !selectedAbilityId.value) return

  const opponentAbilityId = (() => {
    const opp = pendingOpponent.value!
    const pool = opp.is_npc && opp.ability_pool?.length
      ? opp.ability_pool
      : (abilitiesByNenType[opp.nen_type as NenTypeId] ?? []).map(a => a.id)
    return pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)]! : null
  })()

  phase.value = 'fighting'
  startScramble()

  await new Promise(r => setTimeout(r, 1800))

  stopScramble()
  const result = await conductFight(character.value, pendingOpponent.value, challengerToken.value, selectedAbilityId.value, opponentAbilityId)
  fightResult.value = result

  if (result.winner === 'challenger') character.value = { ...character.value, wins: character.value.wins + 1 }
  else if (result.winner === 'opponent') character.value = { ...character.value, losses: character.value.losses + 1 }
  else character.value = { ...character.value, draws: character.value.draws + 1 }

  function splitRoll(total: number): [number, number] {
    const lo = Math.max(1, total - 6)
    const hi = Math.min(6, total - 1)
    const a = lo + Math.floor(Math.random() * (hi - lo + 1))
    return [a, total - a]
  }
  ;[dieA.value, dieB.value] = splitRoll(result.challengerRoll)
    ;[dieC.value, dieD.value] = splitRoll(result.opponentRoll)

  phase.value = 'result'
}

function fightAgain() {
  fightResult.value = null
  pendingOpponent.value = null
  selectedAbilityId.value = null
  abilityRoll.value = 1
  abilityRollDisplay.value = 1
  challengerAbilityPool.value = []
  phase.value = 'select'
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

.fight-main {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 24px 64px;
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
}

.state-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
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

.phase-hero {
  text-align: center;
  margin-bottom: 36px;
}

.phase-tag {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  color: rgba(184, 36, 75, 0.8);
  margin-bottom: 10px;
}

.phase-title-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.phase-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 6vw, 3.5rem);
  letter-spacing: 0.06em;
  margin-bottom: 10px;
  line-height: 1;
}

.rules-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(184, 36, 75, 0.4);
  background: rgba(184, 36, 75, 0.08);
  color: rgba(184, 36, 75, 0.8);
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, border-color 0.2s;
  flex-shrink: 0;
  margin-bottom: 10px;
}

.rules-btn:hover {
  background: rgba(184, 36, 75, 0.15);
  border-color: rgba(184, 36, 75, 0.6);
}

.phase-lead {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--hxh-text-secondary, rgba(220, 220, 220, 0.5));
  line-height: 1.65;
}

.pool-cards {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.opponent-reveal {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
  justify-content: center;
}

.opponent-portrait {
  width: 48px;
  height: 56px;
  object-fit: cover;
  object-position: top center;
  border-radius: 4px;
  border: 1px solid var(--hxh-border-mid, rgba(255, 255, 255, 0.1));
}

.opponent-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.opponent-name {
  font-family: var(--font-heading);
  font-size: 1rem;
  letter-spacing: 0.08em;
  color: var(--hxh-text-primary);
}

.opponent-type {
  font-family: var(--font-heading);
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.ability-roll-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 4px;
}

.ability-die {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: var(--hxh-bg-surface, rgba(255, 255, 255, 0.06));
  border: 1px solid var(--hxh-border-mid, rgba(255, 255, 255, 0.15));
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: var(--hxh-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 0.2s, background 0.2s;
}

.ability-die--rolling {
  animation: die-shake 0.08s linear infinite;
  border-color: rgba(184, 36, 75, 0.6);
  background: rgba(184, 36, 75, 0.1);
  color: rgba(220, 220, 220, 0.9);
}

.phase-lead--hidden {
  opacity: 0;
}

.ability-cards {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
  transition: opacity 0.25s;
}

.ability-cards--hidden {
  opacity: 0;
  pointer-events: none;
}

.ability-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
  background: var(--hxh-bg-card, rgba(255, 255, 255, 0.04));
  border: 2px solid var(--hxh-border-mid, rgba(255, 255, 255, 0.1));
  border-radius: 6px;
  padding: 14px 16px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
}

.ability-card:hover:not(.ability-card--selected) {
  border-color: var(--hxh-border-subtle, rgba(255, 255, 255, 0.22));
  background: var(--hxh-bg-surface, rgba(255, 255, 255, 0.07));
}

.ability-card--selected {
  border-color: #b8244b;
  background: rgba(184, 36, 75, 0.18);
  box-shadow: 0 0 0 1px rgba(184, 36, 75, 0.45), inset 0 0 20px rgba(184, 36, 75, 0.08);
}

.ability-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.ability-card-name {
  font-family: var(--font-heading);
  font-size: 0.88rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--hxh-text-primary);
  opacity: 0.9;
}

.ability-card--selected .ability-card-name {
  color: #c4203f;
  opacity: 1;
}

.ability-card-check {
  font-size: 1rem;
  font-weight: 700;
  color: #c4203f;
  flex-shrink: 0;
  line-height: 1;
}

.ability-card-effect {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  color: #b8244b;
  background: rgba(184, 36, 75, 0.12);
  border: 1px solid rgba(184, 36, 75, 0.35);
  border-radius: 3px;
  padding: 2px 7px;
  align-self: flex-start;
  margin-top: 2px;
  font-weight: 600;
}

.ability-card--selected .ability-card-effect {
  color: #a01e3e;
  background: rgba(184, 36, 75, 0.22);
  border-color: rgba(184, 36, 75, 0.6);
}

.ability-card-desc {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--hxh-text-secondary, rgba(180, 180, 180, 0.8));
  line-height: 1.5;
}

.ability-card-flavor {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  color: var(--hxh-text-muted, rgba(160, 160, 160, 0.5));
  font-style: italic;
  margin-top: 2px;
}

.fight-btn {
  width: 100%;
  background: #b8244b;
  border: none;
  border-radius: 4px;
  padding: 15px;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
  margin-bottom: 8px;
}

.fight-btn:hover:not(:disabled) {
  background: #d42a56;
}

.fight-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.fighting-state {
  gap: 20px;
}

.fight-pulse {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(184, 36, 75, 0.15);
  border: 2px solid rgba(184, 36, 75, 0.5);
  animation: pulse 0.8s ease-in-out infinite alternate;
}

@keyframes pulse {
  from {
    transform: scale(0.9);
    box-shadow: 0 0 20px rgba(184, 36, 75, 0.3);
  }

  to {
    transform: scale(1.1);
    box-shadow: 0 0 40px rgba(184, 36, 75, 0.6);
  }
}

.fighting-text {
  font-family: var(--font-display);
  font-size: 1.4rem;
  letter-spacing: 0.3em;
  color: rgba(184, 36, 75, 0.8);
}

.rolling-dice {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 8px;
}

.rolling-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.rolling-label {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--hxh-text-muted, rgba(220, 220, 220, 0.35));
}

.dice-pair {
  display: flex;
  gap: 6px;
}

.die {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background: var(--hxh-bg-surface, rgba(255, 255, 255, 0.06));
  border: 1px solid var(--hxh-border-mid, rgba(255, 255, 255, 0.12));
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--hxh-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.die--rolling {
  animation: die-shake 0.08s linear infinite;
  border-color: rgba(184, 36, 75, 0.6);
  background: rgba(184, 36, 75, 0.1);
  color: var(--hxh-text-primary);
}

@keyframes die-shake {
  0% {
    transform: rotate(-4deg) scale(1.05);
  }

  50% {
    transform: rotate(4deg) scale(0.97);
  }

  100% {
    transform: rotate(-4deg) scale(1.05);
  }
}

.rolling-vs {
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 0.1em;
  color: var(--hxh-text-muted, rgba(220, 220, 220, 0.35));
  margin-top: 20px;
}
</style>

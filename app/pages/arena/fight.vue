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

useHead({ title: 'Fight - HxH Arena' })

const router = useRouter()
const { loadCharacter, loadOpponentPool, conductFight } = useArena()

const loading = ref(true)
const phase = ref<'select' | 'fighting' | 'result'>('select')
const showRules = ref(false)
const character = ref<Awaited<ReturnType<typeof loadCharacter>>>(null)
const pool = ref<FightOpponent[]>([])
const fightResult = ref<FightResult | null>(null)

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

async function selectPool(type: 'all' | 'npc' | 'registered') {
  if (!character.value) return
  const subset = type === 'npc' ? npcPool.value : type === 'registered' ? registeredPool.value : pool.value
  if (subset.length === 0) return
  const opponent = subset[Math.floor(Math.random() * subset.length)]!
  phase.value = 'fighting'
  startScramble()

  await new Promise(r => setTimeout(r, 1800))

  stopScramble()
  const result = await conductFight(character.value, opponent, challengerToken.value)
  fightResult.value = result

  if (result.winner === 'challenger') character.value = { ...character.value, wins: character.value.wins + 1 }
  else if (result.winner === 'opponent') character.value = { ...character.value, losses: character.value.losses + 1 }
  else character.value = { ...character.value, draws: character.value.draws + 1 }

  // split a 2d6 total into two valid dice (each 1–6)
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
  color: rgba(220, 220, 220, 0.5);
  line-height: 1.65;
}

.pool-cards {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
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
  color: rgba(220, 220, 220, 0.35);
}

.dice-pair {
  display: flex;
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

.die--rolling {
  animation: die-shake 0.08s linear infinite;
  border-color: rgba(184, 36, 75, 0.5);
  background: rgba(184, 36, 75, 0.08);
  color: rgba(220, 220, 220, 0.9);
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
  color: rgba(220, 220, 220, 0.15);
  margin-top: 20px;
}
</style>

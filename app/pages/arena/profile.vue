<template>
  <div class="page-root">
    <ArenaBackground />
    <ArenaHeader back-to="/arena/fight" back-label="Back to Fight" label="PROFILE" />

    <main class="profile-main">
      <div v-if="loading" class="state-center">
        <div class="spinner" />
      </div>

      <template v-else-if="character">
        <!-- Header -->
        <div class="profile-header">
          <div class="profile-nen-badge" :style="{ background: nenColor + '22', borderColor: nenColor + '55' }">
            <span class="profile-nen-label" :style="{ color: nenColor }">{{ nenTypeName }}</span>
          </div>
          <h1 class="profile-name">{{ character.name ?? 'Unknown Hunter' }}</h1>
          <p class="profile-uuid">{{ character.id }}</p>
        </div>

        <div class="profile-body">
          <!-- Stats + record -->
          <section class="profile-section">
            <h2 class="section-heading">Stats &amp; Record</h2>
            <ArenaStatChips :character="character" />
          </section>

          <!-- Win rate -->
          <section v-if="totalFights > 0" class="profile-section">
            <h2 class="section-heading">Win Rate</h2>
            <div class="winrate-row">
              <div class="winrate-bar-track">
                <div class="winrate-bar-fill" :style="{ width: winRatePct + '%', background: nenColor }" />
              </div>
              <span class="winrate-label">{{ winRatePct }}%</span>
            </div>
            <p class="winrate-sub">{{ totalFights }} fight{{ totalFights !== 1 ? 's' : '' }} total</p>
          </section>

          <!-- Fight history -->
          <section class="profile-section">
            <h2 class="section-heading">Fight History</h2>
            <div v-if="historyLoading" class="state-center state-center--small">
              <div class="spinner" />
            </div>
            <div v-else-if="history.length === 0" class="empty-state">
              No fights recorded yet.
            </div>
            <template v-else>
              <div class="history-list">
                <div v-for="fight in history" :key="fight.id" class="history-row" :class="{
                  'history-row--win': fight.winner === 'challenger',
                  'history-row--loss': fight.winner === 'opponent',
                  'history-row--draw': fight.winner === 'draw',
                }">
                  <span class="history-outcome">{{ outcomeLabel(fight.winner) }}</span>
                  <div class="history-vs">
                    <span class="history-opponent">{{ fight.opponentName }}</span>
                    <span class="history-opponent-nen" :style="{ color: nenTypeColor(fight.opponentNenType) }">
                      {{ nenTypeName_(fight.opponentNenType) }}
                    </span>
                  </div>
                  <div class="history-rolls">
                    <span class="history-roll history-roll--challenger">{{ fight.challengerRoll }}</span>
                    <span class="history-roll-sep">vs</span>
                    <span class="history-roll history-roll--opponent">{{ fight.opponentRoll }}</span>
                  </div>
                  <span class="history-date">{{ formatDate(fight.createdAt) }}</span>
                </div>
              </div>
              <div v-if="totalPages > 1" class="pagination">
                <button class="page-btn" :disabled="page === 0" @click="goToPage(page - 1)">&#8592;</button>
                <span class="page-info">{{ page + 1 }} / {{ totalPages }}</span>
                <button class="page-btn" :disabled="page >= totalPages - 1" @click="goToPage(page + 1)">&#8594;</button>
              </div>
            </template>
          </section>
        </div>
      </template>

      <div v-else class="state-center">
        <p class="error-text">Could not load profile. <NuxtLink to="/arena" class="error-link">Return to Arena
          </NuxtLink>
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { nenTypes } from '~/data/nenTypes'
import { useArena } from '~/composables/useArena'
import type { NenTypeId } from '~/lib/supabase'

useHead({ title: 'Hunter Profile - HxH Arena' })

const { loadCharacter, loadFightHistory } = useArena()

const PAGE_SIZE = 10

const loading = ref(true)
const historyLoading = ref(false)
const character = ref<Awaited<ReturnType<typeof loadCharacter>>>(null)
const history = ref<Awaited<ReturnType<typeof loadFightHistory>>['rows']>([])
const historyTotal = ref(0)
const page = ref(0)

const totalPages = computed(() => Math.ceil(historyTotal.value / PAGE_SIZE))
const nenColor = computed(() => nenTypes[character.value?.nen_type as NenTypeId]?.color ?? '#E8A000')
const nenTypeName = computed(() => nenTypes[character.value?.nen_type as NenTypeId]?.name ?? '')
const totalFights = computed(() => (character.value?.wins ?? 0) + (character.value?.losses ?? 0) + (character.value?.draws ?? 0))
const winRatePct = computed(() => {
  if (totalFights.value === 0) return 0
  return Math.round((character.value!.wins / totalFights.value) * 100)
})

function nenTypeColor(type: NenTypeId) {
  return nenTypes[type]?.color ?? '#888'
}

function nenTypeName_(type: NenTypeId) {
  return nenTypes[type]?.name ?? type
}

function outcomeLabel(winner: 'challenger' | 'opponent' | 'draw') {
  if (winner === 'challenger') return 'W'
  if (winner === 'opponent') return 'L'
  return 'D'
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

async function fetchPage(p: number) {
  if (!character.value) return
  historyLoading.value = true
  const result = await loadFightHistory(character.value.id, p, PAGE_SIZE)
  history.value = result.rows
  historyTotal.value = result.total
  page.value = p
  historyLoading.value = false
}

async function goToPage(p: number) {
  await fetchPage(p)
  // Scroll history section into view smoothly
  document.querySelector('.profile-section:last-child')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(async () => {
  const id = sessionStorage.getItem('hunter_licence')
  if (!id) {
    loading.value = false
    return
  }
  character.value = await loadCharacter(id)
  loading.value = false
  if (character.value) {
    await fetchPage(0)
  }
})
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

.profile-main {
  position: relative;
  z-index: 2;
  flex: 1;
  max-width: 560px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 24px 64px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* ── Header ─────────────────────────────────────────────── */

.profile-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.profile-nen-badge {
  display: inline-flex;
  align-self: flex-start;
  border: 1px solid;
  border-radius: 3px;
  padding: 3px 10px;
}

.profile-nen-label {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.profile-name {
  font-family: var(--font-display);
  font-size: clamp(2rem, 6vw, 3.2rem);
  letter-spacing: 0.06em;
  line-height: 1;
  color: var(--hxh-text-primary);
  margin: 0;
}

.profile-uuid {
  font-family: var(--font-body);
  font-size: 0.7rem;
  color: var(--hxh-text-muted);
  letter-spacing: 0.04em;
  word-break: break-all;
  margin: 0;
}

/* ── Sections ────────────────────────────────────────────── */

.profile-body {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.profile-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-heading {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--hxh-text-muted);
  margin: 0;
}

/* ── Win rate ────────────────────────────────────────────── */

.winrate-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.winrate-bar-track {
  flex: 1;
  height: 6px;
  background: var(--hxh-border-subtle);
  border-radius: 3px;
  overflow: hidden;
}

.winrate-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.winrate-label {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--hxh-text-primary);
  width: 44px;
  text-align: right;
}

.winrate-sub {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--hxh-text-muted);
  margin: 0;
}

/* ── Fight history ───────────────────────────────────────── */

.history-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  border: 1px solid var(--hxh-border-subtle);
  border-radius: 6px;
  overflow: hidden;
}

.history-row {
  display: grid;
  grid-template-columns: 24px 1fr auto auto;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: var(--hxh-bg-surface);
  transition: background 0.15s;
}

.history-row:hover {
  background: var(--hxh-bg-mid);
}

.history-outcome {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 900;
  text-align: center;
}

.history-row--win .history-outcome {
  color: #50c878;
}

.history-row--loss .history-outcome {
  color: #b8244b;
}

.history-row--draw .history-outcome {
  color: var(--hxh-text-muted);
}

.history-vs {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.history-opponent {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--hxh-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-opponent-nen {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.history-rolls {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
}

.history-roll {
  font-family: var(--font-display);
  font-size: 0.95rem;
  width: 20px;
  text-align: center;
}

.history-roll--challenger {
  color: var(--hxh-text-primary);
}

.history-roll--opponent {
  color: var(--hxh-text-muted);
}

.history-roll-sep {
  font-family: var(--font-heading);
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  color: var(--hxh-text-muted);
}

.history-date {
  font-family: var(--font-body);
  font-size: 0.7rem;
  color: var(--hxh-text-muted);
  white-space: nowrap;
  flex-shrink: 0;
}

/* ── Pagination ──────────────────────────────────────────── */

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding-top: 4px;
}

.page-btn {
  background: var(--hxh-bg-surface);
  border: 1px solid var(--hxh-border-mid);
  border-radius: 3px;
  color: var(--hxh-text-secondary);
  font-family: var(--font-heading);
  font-size: 0.85rem;
  padding: 6px 14px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.page-btn:hover:not(:disabled) {
  border-color: rgba(184, 36, 75, 0.4);
  color: var(--hxh-text-primary);
  background: rgba(184, 36, 75, 0.07);
}

.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-info {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  color: var(--hxh-text-muted);
  min-width: 48px;
  text-align: center;
}

/* ── States ──────────────────────────────────────────────── */

.state-center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
}

.state-center--small {
  padding: 24px 0;
}

.spinner {
  width: 28px;
  height: 28px;
  border: 2px solid var(--hxh-border-mid);
  border-top-color: #b8244b;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.empty-state {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--hxh-text-muted);
  padding: 20px 0;
}

.error-text {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--hxh-text-muted);
}

.error-link {
  color: #b8244b;
  text-decoration: none;
  border-bottom: 1px solid rgba(184, 36, 75, 0.3);
}

@media (max-width: 480px) {
  .history-date {
    display: none;
  }

  .history-row {
    grid-template-columns: 24px 1fr auto;
  }
}
</style>

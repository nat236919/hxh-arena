<template>
  <section id="arena" class="page-section section-arena">
    <div class="section-inner section-inner--centered">
      <div class="section-heading-row section-heading-row--center">
        <span class="section-number">02</span>
        <div class="section-title-block">
          <h2 class="section-title">Enter Arena</h2>
          <p class="section-subtitle">闘技場 · Combat & Ranking</p>
        </div>
      </div>

      <p class="arena-lead">
        Get your Nen type, claim a Hunter Licence, then step into Heavens Arena.
        Face registered Hunters and NPCs from across the HxH universe.
      </p>

      <div class="arena-steps">
        <div class="step">
          <span class="step-num">01</span>
          <span class="step-label">Complete Water Divination</span>
          <span class="step-desc">Discover your Nen type through the quiz above.</span>
        </div>
        <div class="step-arrow" aria-hidden="true">&#8594;</div>
        <div class="step">
          <span class="step-num">02</span>
          <span class="step-label">Get Hunter Licence</span>
          <span class="step-desc">Claim your Hunter Licence at the end of Water Divination and allocate your
            attributes.</span>
        </div>
        <div class="step-arrow" aria-hidden="true">&#8594;</div>
        <div class="step">
          <span class="step-num">03</span>
          <span class="step-label">Fight</span>
          <span class="step-desc">Pick an opponent pool, roll your dice, and build your W/L/D record.</span>
        </div>
      </div>

      <div class="arena-cta-row">
        <NuxtLink to="/arena" class="cta-btn cta-btn--primary">Enter Arena</NuxtLink>
        <a class="cta-btn cta-btn--ghost" href="#divination" @click.prevent="scrollToDivination">
          Take Water Divination
        </a>
      </div>

      <div class="arena-preview-grid">
        <div class="arena-card">
          <div class="arena-card-header">
            <span class="arena-card-icon">&#9733;</span>
            <span class="arena-card-title">Leaderboard</span>
          </div>
          <div class="arena-card-body">
            <div v-if="lbLoading" class="lb-loading">
              <div class="lb-spinner" />
            </div>
            <template v-else-if="leaderboard.length > 0">
              <div class="lb-header-row">
                <span class="lb-col-name">Fighter</span>
                <span class="lb-col-nen">Nen</span>
                <span class="lb-col-rate">Win Rate</span>
              </div>
              <div v-for="(entry, i) in leaderboard" :key="entry.id" class="lb-row">
                <span class="lb-rank"
                  :class="{ 'lb-rank--gold': i === 0, 'lb-rank--silver': i === 1, 'lb-rank--bronze': i === 2 }">#{{ i +
                    1 }}</span>
                <span class="lb-name">{{ entry.name ?? `Hunter #${entry.id.slice(0, 8).toUpperCase()}` }}</span>
                <span class="lb-type" :style="{ color: nenColor(entry.nen_type) }">{{ entry.nen_type }}</span>
                <span class="lb-record">{{ (entry.winRate * 100).toFixed(0) }}% <span class="lb-fights">({{ entry.wins +
                  entry.losses + entry.draws }})</span></span>
              </div>
            </template>
            <p v-else class="lb-empty">No fighters with 10+ fights yet. Start climbing.</p>
          </div>
        </div>

        <div class="arena-card">
          <div class="arena-card-header">
            <span class="arena-card-icon">&#9876;</span>
            <span class="arena-card-title">Latest Fight</span>
          </div>
          <div class="arena-card-body">
            <template v-if="latestFight">
              <div class="matchup-row">
                <div class="matchup-side">
                  <div class="matchup-badge" :style="{
                    background: `color-mix(in srgb, ${nenColor(latestFight.challengerNen)} 12%, transparent)`,
                    borderColor: `color-mix(in srgb, ${nenColor(latestFight.challengerNen)} 35%, transparent)`,
                    color: nenColor(latestFight.challengerNen)
                  }">{{ nenAbbr(latestFight.challengerNen) }}</div>
                  <span class="matchup-name" :class="{ 'matchup-name--winner': latestFight.winner === 'challenger' }">
                    {{ latestFight.challengerName }}
                  </span>
                </div>
                <div class="matchup-vs">VS</div>
                <div class="matchup-side">
                  <div class="matchup-badge" :style="{
                    background: `color-mix(in srgb, ${nenColor(latestFight.opponentNen)} 12%, transparent)`,
                    borderColor: `color-mix(in srgb, ${nenColor(latestFight.opponentNen)} 35%, transparent)`,
                    color: nenColor(latestFight.opponentNen)
                  }">{{ nenAbbr(latestFight.opponentNen) }}</div>
                  <span class="matchup-name" :class="{ 'matchup-name--winner': latestFight.winner === 'opponent' }">
                    {{ latestFight.opponentName }}
                  </span>
                </div>
              </div>
              <div class="matchup-dice">
                <div class="dice-row">
                  <span class="die" :class="{ 'die--winner': latestFight.winner === 'challenger' }">{{
                    latestFight.challengerRoll }}</span>
                  <span class="dice-sep">vs</span>
                  <span class="die" :class="{ 'die--winner': latestFight.winner === 'opponent' }">{{
                    latestFight.opponentRoll }}</span>
                </div>
                <span class="matchup-result" :class="`matchup-result--${latestFight.winner}`">
                  {{ latestFight.winner === 'challenger' ? latestFight.challengerName + ' wins' : latestFight.winner ===
                    'opponent' ? latestFight.opponentName + ' wins' : 'Draw' }}
                </span>
              </div>
            </template>
            <template v-else-if="lbLoading">
              <div class="lb-loading">
                <div class="lb-spinner" />
              </div>
            </template>
            <p v-else class="lb-empty">No fights yet. Be the first.</p>
            <NuxtLink to="/arena" class="card-cta">Enter to fight &#8594;</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useArena } from '~/composables/useArena'
import { nenTypes } from '~/data/nenTypes'
import type { NenTypeId } from '~/lib/supabase'

const { loadLeaderboard, loadLatestFight } = useArena()

const leaderboard = ref<Awaited<ReturnType<typeof loadLeaderboard>>>([])
const lbLoading = ref(true)

const latestFight = ref<Awaited<ReturnType<typeof loadLatestFight>>>(null)

onMounted(async () => {
  const [lb, lf] = await Promise.all([loadLeaderboard(5), loadLatestFight()])
  leaderboard.value = lb
  latestFight.value = lf
  lbLoading.value = false
})

function nenColor(type: NenTypeId) {
  return nenTypes[type]?.color ?? '#E8A000'
}

function nenAbbr(type: NenTypeId) {
  return type.slice(0, 3).toUpperCase()
}

function scrollToDivination() {
  document.getElementById('divination')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.page-section {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  padding-top: 64px;
  display: flex;
  flex-direction: column;
}

.section-inner {
  flex: 1;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  padding: 60px 32px 80px;
  box-sizing: border-box;
}

.section-inner--centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.section-arena {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.section-heading-row {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 24px;
}

.section-heading-row--center {
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.section-number {
  font-family: var(--font-display);
  font-size: 1rem;
  color: rgba(184, 36, 75, 0.5);
  letter-spacing: 0.3em;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 900;
  color: var(--hxh-text-primary);
  letter-spacing: 0.06em;
  margin: 0 0 4px;
  line-height: 1;
}

.section-subtitle {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--hxh-text-muted);
  margin: 0;
}

.arena-lead {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: rgba(220, 220, 220, 0.5);
  max-width: 520px;
  line-height: 1.7;
  margin: 0 0 40px;
}

.arena-steps {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  justify-content: center;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  max-width: 160px;
  text-align: center;
}

.step-num {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: rgba(184, 36, 75, 0.4);
  line-height: 1;
}

.step-label {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(220, 220, 220, 0.8);
}

.step-desc {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: rgba(220, 220, 220, 0.35);
  line-height: 1.5;
}

.step-arrow {
  font-size: 1.2rem;
  color: rgba(184, 36, 75, 0.3);
  margin-top: 20px;
  flex-shrink: 0;
}

.arena-cta-row {
  display: flex;
  gap: 12px;
  margin-bottom: 48px;
  flex-wrap: wrap;
  justify-content: center;
}

.cta-btn {
  font-family: var(--font-heading);
  font-size: 0.82rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border-radius: 4px;
  padding: 12px 28px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: background 0.2s, opacity 0.2s;
}

.cta-btn--primary {
  background: #b8244b;
  border: none;
  color: #fff;
}

.cta-btn--primary:hover {
  background: #d42a56;
}

.cta-btn--ghost {
  background: transparent;
  border: 1px solid rgba(184, 36, 75, 0.35);
  color: rgba(220, 220, 220, 0.65);
}

.cta-btn--ghost:hover {
  background: rgba(184, 36, 75, 0.07);
}

.arena-preview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  max-width: 720px;
}

.arena-card {
  position: relative;
  background: var(--hxh-bg-surface);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.arena-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--hxh-text-muted);
}

.arena-card-icon {
  font-size: 0.85rem;
  color: rgba(184, 36, 75, 0.7);
}

.arena-card-body {
  padding: 14px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.arena-card-body--blurred {
  filter: blur(3px);
  user-select: none;
  pointer-events: none;
  opacity: 0.6;
}

.arena-card-lock {
  position: absolute;
  inset: 0;
  top: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(220, 220, 220, 0.3);
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1px);
}

.lb-header-row {
  display: flex;
  align-items: center;
  padding: 0 0 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 4px;
  font-family: var(--font-heading);
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--hxh-text-muted);
}

.lb-col-name {
  flex: 1;
  padding-left: 32px;
}

.lb-col-nen {
  width: 72px;
}

.lb-col-rate {
  width: 72px;
  text-align: right;
}

.lb-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-heading);
  font-size: 0.78rem;
}

.lb-rank {
  width: 24px;
  font-size: 0.65rem;
  color: var(--hxh-text-muted);
  letter-spacing: 0.05em;
}

.lb-rank--gold {
  color: #E8A000;
}

.lb-rank--silver {
  color: #aaa;
}

.lb-rank--bronze {
  color: #cd7f32;
}

.lb-name {
  flex: 1;
  color: var(--hxh-text-secondary);
}

.lb-type {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
}

.lb-record {
  font-size: 0.72rem;
  color: var(--hxh-text-secondary);
  letter-spacing: 0.05em;
  font-family: var(--font-heading);
  text-align: right;
  width: 72px;
}

.lb-fights {
  font-size: 0.6rem;
  color: var(--hxh-text-muted);
  letter-spacing: 0.04em;
}

.lb-loading {
  display: flex;
  justify-content: center;
  padding: 16px 0;
}

.lb-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top-color: rgba(184, 36, 75, 0.7);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.lb-empty {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--hxh-text-muted);
  text-align: center;
  padding: 12px 0;
  margin: 0;
}

.matchup-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.matchup-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
}

.matchup-badge {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 6px 10px;
  border: 1px solid;
  border-radius: 3px;
}

.matchup-name {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  color: var(--hxh-text-secondary);
  letter-spacing: 0.08em;
}

.matchup-vs {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 900;
  color: rgba(184, 36, 75, 0.5);
  letter-spacing: 0.1em;
}

.matchup-name--winner {
  color: #50c878;
}

.matchup-dice {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.matchup-result {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.matchup-result--challenger,
.matchup-result--opponent {
  color: rgba(80, 200, 120, 0.7);
}

.matchup-result--draw {
  color: rgba(232, 160, 0, 0.6);
}

.dice-label {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(220, 220, 220, 0.3);
}

.dice-row {
  display: flex;
  align-items: center;
  gap: 5px;
}

.die {
  width: 32px;
  height: 32px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: var(--font-display);
  font-size: 1rem;
  color: rgba(220, 220, 220, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.die--winner {
  border-color: rgba(80, 200, 120, 0.4);
  background: rgba(80, 200, 120, 0.08);
  color: #50c878;
}

.dice-sep {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  color: rgba(220, 220, 220, 0.2);
  padding: 0 2px;
}

.card-cta {
  font-family: var(--font-heading);
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(184, 36, 75, 0.8);
  text-decoration: none;
  align-self: flex-start;
  transition: color 0.2s;
}

.card-cta:hover {
  color: #d42a56;
}

@media (max-width: 640px) {
  .section-inner {
    padding: 40px 18px 60px;
  }

  .arena-preview-grid {
    grid-template-columns: 1fr;
  }

  .arena-steps {
    flex-direction: column;
    align-items: center;
  }

  .step-arrow {
    transform: rotate(90deg);
    margin-top: 0;
  }
}
</style>

<template>
  <section id="arena" class="page-section section-arena">
    <div class="section-inner section-inner--centered">
      <div class="section-heading-row section-heading-row--center">
        <span class="section-number">03</span>
        <div class="section-title-block">
          <h2 class="section-title">Enter Arena</h2>
          <p class="section-subtitle">闘技場 · Combat & Ranking</p>
        </div>
      </div>

      <div class="arena-status-badge">
        <span class="arena-status-dot" />
        Coming Soon
      </div>

      <div class="arena-preview-grid">
        <!-- Leaderboard preview -->
        <div class="arena-card">
          <div class="arena-card-header">
            <span class="arena-card-icon">&#9733;</span>
            <span class="arena-card-title">Leaderboard</span>
          </div>
          <div class="arena-card-body arena-card-body--blurred">
            <div v-for="(entry, i) in leaderboard" :key="i" class="lb-row">
              <span class="lb-rank"
                :class="{ 'lb-rank--gold': i === 0, 'lb-rank--silver': i === 1, 'lb-rank--bronze': i === 2 }">#{{ i + 1
                }}</span>
              <span class="lb-name">{{ entry.name }}</span>
              <span class="lb-type" :style="{ color: entry.color }">{{ entry.type }}</span>
              <span class="lb-score">{{ entry.score }}</span>
            </div>
          </div>
          <div class="arena-card-lock">Hunter License Required</div>
        </div>

        <!-- 1v1 matchup teaser -->
        <div class="arena-card">
          <div class="arena-card-header">
            <span class="arena-card-icon">&#9876;</span>
            <span class="arena-card-title">1v1 Challenge</span>
          </div>
          <div class="arena-card-body arena-card-body--blurred">
            <div class="matchup-row">
              <div class="matchup-side">
                <div class="matchup-badge"
                  style="background: rgba(232,160,0,0.15); border-color: rgba(232,160,0,0.4); color: #E8A000;">ENH</div>
                <span class="matchup-name">Gon F.</span>
              </div>
              <div class="matchup-vs">VS</div>
              <div class="matchup-side">
                <div class="matchup-badge"
                  style="background: rgba(184,36,75,0.15); border-color: rgba(184,36,75,0.4); color: #B8244B;">TRN</div>
                <span class="matchup-name">Hisoka M.</span>
              </div>
            </div>
            <div class="matchup-compat">
              <span class="matchup-compat-label">Compatibility</span>
              <span class="matchup-compat-value matchup-compat--neutral">Neutral</span>
            </div>
          </div>
          <div class="arena-card-lock">Hunter License Required</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const leaderboard = [
  { name: 'Killua Z.', type: 'Transmuter', color: '#6B3FD4', score: 9840 },
  { name: 'Gon F.', type: 'Enhancer', color: '#E8A000', score: 9210 },
  { name: 'Kurapika', type: 'Specialist', color: '#CC1A1A', score: 8750 },
  { name: 'Hisoka M.', type: 'Transmuter', color: '#6B3FD4', score: 8430 },
  { name: 'Leorio P.', type: 'Emitter', color: '#1E7A40', score: 7980 },
]
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
  margin-bottom: 48px;
}

.section-heading-row--center {
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.section-number {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  color: rgba(184, 36, 75, 0.12);
  line-height: 1;
  letter-spacing: -0.02em;
  flex-shrink: 0;
}

.section-heading-row--center .section-number {
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

.arena-status-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(232, 160, 0, 0.8);
  border: 1px solid rgba(232, 160, 0, 0.3);
  background: rgba(232, 160, 0, 0.07);
  padding: 6px 16px;
  border-radius: 2px;
  margin-bottom: 32px;
}

.arena-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #E8A000;
  animation: dot-blink 1.4s ease-in-out infinite;
}

@keyframes dot-blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
  }
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
  color: rgba(184, 36, 75, 0.6);
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1px);
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

.lb-score {
  font-size: 0.72rem;
  color: var(--hxh-text-muted);
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

.matchup-compat {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.matchup-compat-label {
  color: var(--hxh-text-muted);
}

.matchup-compat--neutral {
  color: rgba(232, 160, 0, 0.8);
}

@media (max-width: 640px) {
  .section-inner {
    padding: 40px 18px 60px;
  }

  .arena-preview-grid {
    grid-template-columns: 1fr;
  }
}
</style>

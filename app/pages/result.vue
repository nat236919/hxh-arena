<template>
  <div class="result-root" :style="rootVars">
    <!-- Aura environment -->
    <div class="result-aura-bg" />
    <div class="scanline-overlay" aria-hidden="true" />

    <!-- Burst particles -->
    <div class="burst-layer" aria-hidden="true">
      <div v-for="n in 24" :key="n" class="burst-particle" :style="burstStyle(n)" />
    </div>

    <!-- Header -->
    <header class="result-header">
      <span class="result-header-label">Hunter × Hunter · Nen Classification</span>
      <span class="exam-badge">Water Divination Complete</span>
    </header>

    <Transition name="reveal-in" appear>
      <main v-if="revealed" class="result-main">

        <!-- Left column: type reveal -->
        <section class="type-column">

          <!-- Type identity -->
          <div class="type-identity">
            <div class="type-jp" :style="{ color: nenType?.color }">{{ nenType?.japaneseName }}</div>
            <div class="type-cross" :style="{ color: nenType?.color }">×</div>
            <h1 class="type-name" :style="{ '--tc': nenType?.color, '--tg': nenType?.glowColor }">
              {{ nenType?.name }}
            </h1>
            <div class="type-label">Your Nen Type</div>
          </div>

          <!-- Divider -->
          <div class="nen-divider">
            <span class="divider-line" />
            <span class="divider-glyph" :style="{ color: nenType?.color }">◈</span>
            <span class="divider-line" />
          </div>

          <!-- Description -->
          <p class="type-description">{{ nenType?.description }}</p>

          <!-- Traits -->
          <div class="traits-row">
            <span v-for="trait in nenType?.traits" :key="trait" class="trait-tag"
              :style="{ color: nenType?.color, borderColor: `${nenType?.color}55` }">
              {{ trait }}
            </span>
          </div>

          <!-- Shadow side -->
          <div class="weakness-block">
            <span class="weakness-label">Shadow side</span>
            <p class="weakness-text">{{ nenType?.weakness }}</p>
          </div>

          <!-- Actions -->
          <div class="action-row">
            <button class="action-btn action-btn--primary" :style="{ background: nenType?.color }" @click="retake">
              Retake the Test
            </button>
            <NuxtLink to="/" class="action-btn action-btn--ghost" :style="{ borderColor: `${nenType?.color}88` }">
              Return to Arena
            </NuxtLink>
          </div>

          <!-- Credits -->
          <p class="credits-text">
            Character data: <a href="https://hunterxhunter.fandom.com/wiki/Hunterpedia" target="_blank"
              rel="noopener">Hunterpedia</a>.
            Hunter x Hunter &copy; Yoshihiro Togashi / Shueisha.
          </p>
        </section>

        <!-- Right column: radar + characters + share -->
        <section class="detail-column">

          <!-- Shareable card region -->
          <div ref="cardRef" class="share-card" :style="{ '--tc': nenType?.color, '--tg': nenType?.glowColor }">
            <!-- Card top accent -->
            <div class="card-accent" :style="{ background: nenType?.color }" />

            <div class="card-inner">
              <!-- Card header -->
              <div class="card-header-row">
                <span class="card-jp-small" :style="{ color: nenType?.color }">{{ nenType?.japaneseName }}</span>
                <span class="card-brand">HxH Arena</span>
              </div>

              <!-- Type name in card -->
              <div class="card-type-name" :style="{ color: nenType?.color }">{{ nenType?.name }}</div>

              <!-- Radar chart -->
              <div class="radar-wrap">
                <p class="radar-label">Nen Aptitude</p>
                <div class="radar-chart">
                  <Radar v-if="chartData" :data="chartData" :options="chartOptions" />
                </div>
              </div>
            </div>
          </div>

          <!-- Share buttons -->
          <div class="share-row">
            <button class="share-btn" :class="{ 'share-btn--loading': sharing === 'download' }" :disabled="!!sharing"
              @click="shareCard('download')">
              <svg class="share-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {{ sharing === 'download' ? 'Saving...' : 'Save Image' }}
            </button>
            <button class="share-btn" :class="{ 'share-btn--loading': sharing === 'copy' }" :disabled="!!sharing"
              @click="shareCard('copy')">
              <svg class="share-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {{ sharing === 'copy' ? 'Copied!' : 'Copy Image' }}
            </button>
          </div>

          <!-- Character profiles -->
          <div class="characters-block">
            <div class="characters-header">
              <span class="chars-label">Hunters with this type</span>
              <span class="chars-accent" :style="{ background: `${nenType?.color}50`, color: nenType?.color }">
                {{ nenType?.characters.length }}
              </span>
            </div>
            <div class="characters-list">
              <button v-for="profile in nenType?.characterProfiles" :key="profile.name" class="char-row"
                @click="openProfile(profile)">
                <div class="char-portrait-wrap" :style="{ borderColor: `${nenType?.color}60` }">
                  <img v-if="profile.portrait" :src="profile.portrait" :alt="profile.name" class="char-portrait"
                    loading="lazy" />
                  <div v-else class="char-portrait-placeholder" :style="{ background: `${nenType?.color}20` }">
                    <span :style="{ color: nenType?.color }">{{ profile.name[0] }}</span>
                  </div>
                </div>
                <div class="char-info">
                  <span class="char-name" :style="{ color: nenType?.color }">{{ profile.name }}</span>
                  <span class="char-title">{{ profile.title }}</span>
                </div>
                <span class="char-arrow">›</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </Transition>

    <!-- Character profile modal -->
    <Transition name="modal-fade">
      <div v-if="activeProfile" class="modal-backdrop" @click.self="activeProfile = null">
        <div class="modal-box" :style="{ '--tc': nenType?.color, '--tg': nenType?.glowColor }">
          <!-- Modal accent -->
          <div class="modal-accent" :style="{ background: nenType?.color }" />
          <button class="modal-close" @click="activeProfile = null">×</button>

          <!-- Portrait header -->
          <div class="modal-header">
            <div class="modal-portrait-wrap" :style="{ borderColor: `${nenType?.color}80` }">
              <img v-if="activeProfile.portrait" :src="activeProfile.portrait" :alt="activeProfile.name"
                class="modal-portrait" />
              <div v-else class="modal-portrait-placeholder"
                :style="{ background: `${nenType?.color}20`, color: nenType?.color }">
                {{ activeProfile.name[0] }}
              </div>
              <div class="modal-portrait-glow" :style="{ background: nenType?.glowColor }" />
            </div>
            <div class="modal-identity">
              <p class="modal-title-label" :style="{ color: nenType?.color }">{{ activeProfile.title }}</p>
              <h2 class="modal-char-name">{{ activeProfile.name }}</h2>
            </div>
          </div>

          <div class="modal-divider" :style="{ borderColor: `${nenType?.color}40` }" />

          <div class="abilities-list">
            <div v-for="ability in activeProfile.abilities" :key="ability.name" class="ability-item"
              :style="{ borderColor: `${nenType?.color}60` }">
              <p class="ability-name" :style="{ color: nenType?.color }">{{ ability.name }}</p>
              <p class="ability-desc">{{ ability.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'
import html2canvas from 'html2canvas'
import { nenTypes } from '~/data/nenTypes'
import type { CharacterProfile } from '~/data/nenTypes'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip)

const router = useRouter()
const { result, scores, reset } = useNenQuiz()

const revealed = ref(false)
const cardRef = ref<HTMLElement | null>(null)
const sharing = ref<'download' | 'copy' | false>(false)
const activeProfile = ref<CharacterProfile | null>(null)

const nenType = computed(() => result.value ?? null)

const rootVars = computed(() => ({
  '--dominant': nenType.value?.color ?? '#E8A000',
  '--dominant-glow': nenType.value?.glowColor ?? 'rgba(201,162,39,0.4)',
}))

const chartData = computed(() => {
  if (!nenType.value) return null
  return {
    labels: ['Enhancer', 'Transmuter', 'Emitter', 'Conjurer', 'Manipulator', 'Specialist'],
    datasets: [{
      data: [
        scores.value.enhancer,
        scores.value.transmuter,
        scores.value.emitter,
        scores.value.conjurer,
        scores.value.manipulator,
        scores.value.specialist,
      ],
      backgroundColor: `${nenType.value.color}28`,
      borderColor: nenType.value.color,
      borderWidth: 2,
      pointBackgroundColor: nenType.value.color,
      pointRadius: 3,
    }],
  }
})

const { isDark } = useTheme()

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: { legend: { display: false } },
  scales: {
    r: {
      min: 0,
      ticks: { display: false },
      grid: { color: isDark.value ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)' },
      angleLines: { color: isDark.value ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)' },
      pointLabels: {
        color: isDark.value ? 'rgba(255,255,255,0.7)' : 'rgba(15,8,2,0.7)',
        font: { size: 11, family: 'Rajdhani, Arial Narrow, sans-serif' },
      },
    },
  },
}))

onMounted(() => {
  nextTick(() => {
    if (!result.value) {
      router.replace('/')
      return
    }
    setTimeout(() => {
      revealed.value = true
    }, 100)
  })
})

function openProfile(profile: CharacterProfile) {
  activeProfile.value = profile
}

function retake() {
  reset()
  router.push('/quiz')
}

async function shareCard(mode: 'download' | 'copy') {
  if (!cardRef.value || sharing.value) return
  sharing.value = mode
  try {
    const canvas = await html2canvas(cardRef.value, {
      backgroundColor: '#0D0D0D',
      scale: 2,
      useCORS: true,
    })
    if (mode === 'download') {
      const link = document.createElement('a')
      link.download = `nen-type-${nenType.value?.id ?? 'result'}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } else {
      canvas.toBlob(async (blob) => {
        if (!blob) return
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      })
    }
  } finally {
    setTimeout(() => { sharing.value = false }, 1500)
  }
}

function burstStyle(n: number) {
  const angle = (n / 24) * 360
  const size = 2 + (n % 3)
  const duration = 3 + (n % 4)
  const delay = (n % 6) * 0.15
  return {
    '--angle': `${angle}deg`,
    '--dist': `${30 + (n % 5) * 12}vw`,
    width: `${size}px`,
    height: `${size}px`,
    background: nenType.value?.auraColor ?? '#E8A000',
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
  }
}
</script>

<style scoped>
.result-root {
  position: relative;
  min-height: 100vh;
  background: var(--hxh-bg-deep);
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

/* ---- Aura background ---- */
.result-aura-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at 50% 40%,
      var(--dominant-glow, rgba(201, 162, 39, 0.2)) 0%,
      transparent 65%);
  animation: aura-bloom 5s ease-in-out infinite;
  transition: background 0.8s ease;
}

@keyframes aura-bloom {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.8;
  }

  50% {
    transform: scale(1.08);
    opacity: 1;
  }
}

.scanline-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: repeating-linear-gradient(0deg, transparent, transparent 3px,
      rgba(0, 0, 0, 0.04) 3px, rgba(0, 0, 0, 0.04) 4px);
}

/* ---- Burst particles ---- */
.burst-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

.burst-particle {
  position: absolute;
  left: 50%;
  top: 40%;
  border-radius: 50%;
  opacity: 0;
  animation: burst-out linear infinite;
}

@keyframes burst-out {
  0% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0);
    opacity: 0.7;
  }

  100% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateX(var(--dist));
    opacity: 0;
  }
}

/* ---- Header ---- */
.result-header {
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 28px 12px;
}

.result-header-label {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--hxh-text-muted);
}

.exam-badge {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #1A1A1A;
  background: #E8E0D0;
  border: 1.5px solid #4A4A4A;
  padding: 4px 12px;
  border-radius: 2px;
}

/* ---- Main layout ---- */
.reveal-in-enter-active {
  transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-in-enter-from {
  opacity: 0;
  transform: translateY(24px);
}

.result-main {
  position: relative;
  z-index: 10;
  display: flex;
  gap: 40px;
  padding: 24px 32px 48px;
  max-width: 960px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  flex-wrap: wrap;
}

/* ---- Type column ---- */
.type-column {
  flex: 1;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.type-identity {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.type-jp {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  letter-spacing: 0.12em;
  opacity: 0.7;
  transition: color 0.6s;
}

.type-cross {
  font-family: var(--font-display);
  font-size: 1rem;
  opacity: 0.5;
  letter-spacing: 0.4em;
}

.type-name {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0.08em;
  color: var(--tc);
  text-shadow: 0 0 40px var(--tg), 0 0 80px var(--tg);
  margin: 0;
  animation: name-pulse 3s ease-in-out infinite;
}

@keyframes name-pulse {

  0%,
  100% {
    text-shadow: 0 0 40px var(--tg), 0 0 80px var(--tg);
  }

  50% {
    text-shadow: 0 0 60px var(--tg), 0 0 120px var(--tg), 0 0 4px #fff;
  }
}

.type-label {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--hxh-text-muted);
  margin-top: 4px;
}

.nen-divider {
  display: flex;
  align-items: center;
  gap: 10px;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: var(--hxh-border-subtle);
}

.divider-glyph {
  font-size: 0.8rem;
  opacity: 0.7;
}

.type-description {
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--hxh-text-secondary);
  margin: 0;
}

.traits-row {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.trait-tag {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid;
  padding: 5px 12px;
  border-radius: 2px;
}

.weakness-block {
  border-left: 2px solid var(--hxh-border-subtle);
  padding-left: 14px;
}

.weakness-label {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--hxh-text-muted);
  margin-bottom: 6px;
}

.weakness-text {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--hxh-text-muted);
  margin: 0;
  line-height: 1.6;
}

.action-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.action-btn {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 11px 22px;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s;
}

.action-btn--primary {
  color: #08111e;
}

.action-btn--primary:hover {
  filter: brightness(1.12);
  transform: scale(1.04);
}

.action-btn--ghost {
  background: transparent;
  border: 1px solid;
  color: var(--hxh-text-secondary);
}

.action-btn--ghost:hover {
  background: rgba(128, 128, 128, 0.08);
  color: var(--hxh-text-primary);
}

.credits-text {
  font-family: var(--font-body);
  font-size: 0.72rem;
  color: var(--hxh-text-muted);
  line-height: 1.7;
  margin: 0;
}

.credits-text a {
  color: var(--hxh-text-secondary);
  text-decoration: underline;
}

.credits-text a:hover {
  color: var(--hxh-text-primary);
}

/* ---- Detail column ---- */
.detail-column {
  flex: 1;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Share card */
.share-card {
  background: var(--hxh-bg-mid);
  border: 1px solid var(--hxh-border-subtle);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 40px var(--tg), 0 8px 32px rgba(0, 0, 0, 0.6);
}

.card-accent {
  height: 3px;
  width: 100%;
}

.card-inner {
  padding: 20px;
}

.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.card-jp-small {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  opacity: 0.7;
}

.card-brand {
  font-family: var(--font-heading);
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--hxh-text-muted);
}

.card-type-name {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  color: var(--tc);
  margin-bottom: 16px;
}

.radar-wrap {}

.radar-label {
  font-family: var(--font-heading);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--hxh-text-muted);
  margin-bottom: 8px;
}

.radar-chart {
  width: 220px;
  height: 220px;
  margin: 0 auto;
}

/* Share buttons */
.share-row {
  display: flex;
  gap: 10px;
}

.share-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 11px 14px;
  background: var(--hxh-bg-surface);
  border: 1px solid var(--hxh-border-mid);
  border-radius: 4px;
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--hxh-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.share-btn:not(:disabled):hover {
  border-color: var(--hxh-border-mid);
  color: var(--hxh-text-primary);
  background: var(--hxh-bg-mid);
}

.share-btn:disabled {
  opacity: 0.4;
  cursor: default;
}

.share-icon {
  width: 14px;
  height: 14px;
}

/* Characters block */
.characters-block {
  background: var(--hxh-bg-surface);
  border: 1px solid var(--hxh-border-subtle);
  border-radius: 6px;
  overflow: hidden;
}

.characters-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px 10px;
  border-bottom: 1px solid var(--hxh-border-subtle);
}

.chars-label {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--hxh-text-muted);
}

.chars-accent {
  font-family: var(--font-heading);
  font-size: 0.68rem;
  padding: 2px 8px;
  border-radius: 2px;
}

.characters-list {
  display: flex;
  flex-direction: column;
}

.char-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  border-bottom: 1px solid var(--hxh-border-subtle);
  transition: background 0.2s;
  width: 100%;
}

.char-row:last-child {
  border-bottom: none;
}

.char-row:hover {
  background: var(--hxh-bg-card);
}

.char-indicator {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
}

.char-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.char-name {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.char-title {
  font-family: var(--font-body);
  font-size: 0.72rem;
  color: var(--hxh-text-muted);
}

.char-arrow {
  color: var(--hxh-text-muted);
  font-size: 1.1rem;
  line-height: 1;
}

.char-portrait-wrap {
  width: 44px;
  height: 44px;
  border-radius: 4px;
  border: 1px solid;
  overflow: hidden;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.3);
}

.char-portrait {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.char-portrait-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 1.2rem;
}

/* ---- Modal ---- */
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
  max-width: 420px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 0 40px var(--tg), 0 16px 48px rgba(0, 0, 0, 0.8);
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
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px 12px;
}

.modal-portrait-wrap {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 4px;
  border: 2px solid;
  overflow: hidden;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.4);
}

.modal-portrait {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.modal-portrait-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 2rem;
}

.modal-portrait-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  opacity: 0.3;
}

.modal-identity {
  flex: 1;
  min-width: 0;
}

.modal-title-label {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin: 0 0 4px;
  display: block;
}

.modal-char-name {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--hxh-text-primary);
  margin: 0;
  letter-spacing: 0.05em;
  line-height: 1.1;
}

.modal-divider {
  border: none;
  border-top: 1px solid;
  margin: 0 0 16px;
}

.abilities-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 20px 20px;
}

.ability-item {
  border-left: 2px solid;
  padding-left: 12px;
}

.ability-name {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  margin: 0 0 3px;
}

.ability-desc {
  font-family: var(--font-body);
  font-size: 0.82rem;
  color: var(--hxh-text-secondary);
  margin: 0;
  line-height: 1.55;
}

/* ---- Responsive ---- */
@media (max-width: 640px) {
  .result-main {
    padding: 16px 18px 36px;
    gap: 28px;
  }

  .type-name {
    font-size: 3rem;
  }
}
</style>

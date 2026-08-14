<template>
  <div class="result-root" :style="rootVars">
    <div class="result-aura-bg" />
    <div class="scanline-overlay" aria-hidden="true" />

    <div class="burst-layer" aria-hidden="true">
      <div v-for="n in 24" :key="n" class="burst-particle" :style="burstStyle(n)" />
    </div>

    <header class="result-header">
      <span class="result-header-label">Hunter × Hunter · Nen Classification</span>
      <span class="exam-badge">Water Divination Complete</span>
    </header>

    <main v-if="revealed" class="result-main">

      <section class="type-column">
        <div class="type-identity stage-1">
          <div class="type-jp" :style="{ color: nenType?.color }">{{ nenType?.japaneseName }}</div>
          <div class="type-cross" :style="{ color: nenType?.color }">×</div>
          <h1 class="type-name" :style="{ '--tc': nenType?.color, '--tg': nenType?.glowColor }">
            {{ nenType?.name }}
          </h1>
          <div class="type-label">Your Nen Type</div>
        </div>

        <div class="nen-divider stage-2">
          <span class="divider-line" />
          <span class="divider-glyph" :style="{ color: nenType?.color }">◈</span>
          <span class="divider-line" />
        </div>

        <p class="type-description stage-2">{{ nenType?.description }}</p>

        <div class="traits-row stage-2">
          <span v-for="trait in nenType?.traits" :key="trait" class="trait-tag"
            :style="{ color: nenType?.color, borderColor: `${nenType?.color}55` }">
            {{ trait }}
          </span>
        </div>

        <div class="weakness-block stage-3">
          <span class="weakness-label">Shadow side</span>
          <p class="weakness-text">{{ nenType?.weakness }}</p>
        </div>

        <div v-if="compatibility" class="compat-block stage-3">
          <span class="compat-heading">Nen Affinity</span>
          <div class="compat-row">
            <span class="compat-label compat-label--compatible">Compatible</span>
            <div class="compat-tags">
              <span v-for="t in compatibility.compatible" :key="t.id" class="compat-tag compat-tag--compatible"
                :style="{ color: t.color, borderColor: `${t.color}55`, background: `${t.color}12` }">
                {{ t.name }}
              </span>
            </div>
          </div>
          <div class="compat-row">
            <span class="compat-label compat-label--opposed">Opposed</span>
            <div class="compat-tags">
              <span class="compat-tag compat-tag--opposed"
                :style="{ color: compatibility.opposed.color, borderColor: `${compatibility.opposed.color}55`, background: `${compatibility.opposed.color}12` }">
                {{ compatibility.opposed.name }}
              </span>
            </div>
          </div>
        </div>

        <div class="action-row stage-3">
          <button class="action-btn action-btn--primary" :style="{ background: nenType?.color }" @click="retake">
            Retake the Test
          </button>
          <NuxtLink to="/" class="action-btn action-btn--ghost" :style="{ borderColor: `${nenType?.color}88` }">
            Return to Arena
          </NuxtLink>
        </div>

        <p class="credits-text stage-3">
          Character data &amp; images: <a href="https://hunterxhunter.fandom.com/wiki/Hunterpedia" target="_blank"
            rel="noopener">Hunterpedia</a> (CC BY-SA).
          Hunter x Hunter &copy; Yoshihiro Togashi / Shueisha.
        </p>
      </section>

      <NenShareCard ref="shareCardRef" :nen-type="nenType" :chart-data="chartData" :chart-options="chartOptions"
        :sharing="sharing" @share="shareCard" @open-profile="openProfile" />
    </main>

    <CharacterModal :profile="activeProfile" :nen-color="nenType?.color ?? ''" :glow-color="nenType?.glowColor ?? ''"
      @close="activeProfile = null" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'
import html2canvas from 'html2canvas'
import { nenTypes, nenCompatibility } from '~/data/nenTypes'
import type { CharacterProfile } from '~/data/nenTypes'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip)

const router = useRouter()
const route = useRoute()
const { result, scores, reset } = useNenQuiz()
const { isDark } = useTheme()

const revealed = ref(false)
const sharing = ref<'download' | 'copy' | false>(false)
const activeProfile = ref<CharacterProfile | null>(null)
const shareCardRef = ref<{ cardEl: HTMLElement | null } | null>(null)

const nenType = computed(() => result.value ?? null)

const compatibility = computed(() => {
  if (!nenType.value) return null
  const compat = nenCompatibility[nenType.value.id]
  return {
    compatible: compat.compatible.map(id => nenTypes[id]),
    opposed: nenTypes[compat.opposed],
  }
})

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
      const typeParam = route.query.type as string | undefined
      if (typeParam && nenTypes[typeParam as keyof typeof nenTypes]) {
        result.value = nenTypes[typeParam as keyof typeof nenTypes]
      } else {
        router.replace('/')
        return
      }
    }
    if (result.value && !route.query.type) {
      router.replace(`/result?type=${result.value.id}`)
    }
    setTimeout(() => { revealed.value = true }, 100)
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
  const cardEl = shareCardRef.value?.cardEl
  if (!cardEl || sharing.value) return
  sharing.value = mode
  try {
    const canvas = await html2canvas(cardEl, {
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

@keyframes stage-in {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stage-1 {
  animation: stage-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.stage-2 {
  animation: stage-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
}

.stage-3 {
  animation: stage-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
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

.compat-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.compat-heading {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--hxh-text-muted);
  margin-bottom: 2px;
}

.compat-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.compat-label {
  font-family: var(--font-heading);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  width: 72px;
  flex-shrink: 0;
}

.compat-label--compatible {
  color: rgba(100, 220, 130, 0.7);
}

.compat-label--opposed {
  color: rgba(220, 80, 80, 0.7);
}

.compat-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.compat-tag {
  font-family: var(--font-heading);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 1px solid;
  padding: 3px 10px;
  border-radius: 2px;
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

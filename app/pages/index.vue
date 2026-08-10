<template>
  <div class="page-root">
    <!-- Aura background -->
    <div class="aura-field" aria-hidden="true">
      <div class="aura-orb aura-orb--gold" />
      <div class="aura-orb aura-orb--teal" />
      <div class="aura-orb aura-orb--purple" />
    </div>
    <div class="scanline-overlay" aria-hidden="true" />
    <div class="particle-layer" aria-hidden="true">
      <div v-for="n in 18" :key="n" class="aura-particle" :style="particleStyle(n)" />
    </div>

    <!-- Sticky nav -->
    <nav class="site-nav">
      <div class="nav-brand">
        <img src="/characters/hxh-logo.webp" alt="HxH Arena" class="nav-logo" />
      </div>
      <div class="nav-links">
        <a v-for="section in sections" :key="section.id" class="nav-link"
          :class="{ 'nav-link--active': activeSection === section.id }" @click.prevent="scrollTo(section.id)">
          {{ section.label }}
        </a>
      </div>
      <div class="nav-seal">
        <svg class="nen-seal" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(184,36,75,0.25)" stroke-width="0.8" />
          <polygon points="24,4 41,13.5 41,34.5 24,44 7,34.5 7,13.5" fill="none" stroke="rgba(184,36,75,0.7)"
            stroke-width="1.2" stroke-linejoin="round" />
          <circle cx="24" cy="24" r="9" fill="none" stroke="rgba(232,66,10,0.6)" stroke-width="1" />
          <line x1="24" y1="15" x2="24" y2="4" stroke="rgba(184,36,75,0.4)" stroke-width="0.7" />
          <line x1="24" y1="33" x2="24" y2="44" stroke="rgba(184,36,75,0.4)" stroke-width="0.7" />
          <line x1="15.7" y1="19.5" x2="7" y2="13.5" stroke="rgba(184,36,75,0.4)" stroke-width="0.7" />
          <line x1="32.3" y1="28.5" x2="41" y2="34.5" stroke="rgba(184,36,75,0.4)" stroke-width="0.7" />
          <line x1="32.3" y1="19.5" x2="41" y2="13.5" stroke="rgba(184,36,75,0.4)" stroke-width="0.7" />
          <line x1="15.7" y1="28.5" x2="7" y2="34.5" stroke="rgba(184,36,75,0.4)" stroke-width="0.7" />
          <circle cx="24" cy="24" r="2.5" fill="rgba(232,66,10,0.8)" />
        </svg>
      </div>
    </nav>

    <!-- ===================== SECTION 1: WATER DIVINATION ===================== -->
    <section id="divination" class="page-section section-divination">
      <div class="section-inner section-inner--centered">
        <div class="title-block">
          <div class="hxh-logo-wrap">
            <img src="/characters/hxh-logo.webp" alt="Hunter x Hunter" class="hxh-logo-img" />
            <div class="hxh-logo-glow" />
          </div>
          <div class="title-arena-row">
            <span class="title-arena-line" />
            <span class="title-arena-word">ARENA</span>
            <span class="title-arena-line" />
          </div>
          <div class="title-subtitle">水見式 · Water Divination · Nen Type Classification</div>
        </div>

        <!-- Glass -->
        <div class="glass-stage" @click="startQuiz">
          <svg class="nen-seal-bg" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <polygon points="24,4 41,13.5 41,34.5 24,44 7,34.5 7,13.5" fill="none" stroke="rgba(184,36,75,0.18)"
              stroke-width="0.8" stroke-linejoin="round" />
            <circle cx="24" cy="24" r="9" fill="none" stroke="rgba(232,66,10,0.12)" stroke-width="0.6" />
            <line x1="24" y1="15" x2="24" y2="4" stroke="rgba(184,36,75,0.1)" stroke-width="0.5" />
            <line x1="24" y1="33" x2="24" y2="44" stroke="rgba(184,36,75,0.1)" stroke-width="0.5" />
            <line x1="15.7" y1="19.5" x2="7" y2="13.5" stroke="rgba(184,36,75,0.1)" stroke-width="0.5" />
            <line x1="32.3" y1="28.5" x2="41" y2="34.5" stroke="rgba(184,36,75,0.1)" stroke-width="0.5" />
            <line x1="32.3" y1="19.5" x2="41" y2="13.5" stroke="rgba(184,36,75,0.1)" stroke-width="0.5" />
            <line x1="15.7" y1="28.5" x2="7" y2="34.5" stroke="rgba(184,36,75,0.1)" stroke-width="0.5" />
            <circle cx="24" cy="24" r="2" fill="rgba(232,66,10,0.18)" />
          </svg>

          <div class="glass-container">
            <svg viewBox="0 0 280 220" class="glass-svg" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="idx-aura" cx="50%" cy="45%" r="50%">
                  <stop offset="0%" stop-color="rgba(184,36,75,0.55)" />
                  <stop offset="55%" stop-color="rgba(0,111,68,0.22)" />
                  <stop offset="100%" stop-color="rgba(0,111,68,0)" />
                </radialGradient>
                <linearGradient id="idx-glass-fill" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" :stop-color="isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'" />
                  <stop offset="45%" :stop-color="isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'" />
                  <stop offset="100%" :stop-color="isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'" />
                </linearGradient>
                <linearGradient id="idx-glass-stroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" :stop-color="isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)'" />
                  <stop offset="35%" :stop-color="isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)'" />
                  <stop offset="65%" :stop-color="isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)'" />
                  <stop offset="100%" :stop-color="isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.38)'" />
                </linearGradient>
                <linearGradient id="idx-spec" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" :stop-color="isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.18)'" />
                  <stop offset="100%" stop-color="rgba(0,0,0,0)" />
                </linearGradient>
                <linearGradient id="idx-rim-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" :stop-color="isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'" />
                  <stop offset="100%" :stop-color="isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.4)'" />
                </linearGradient>
                <radialGradient id="idx-water-fill" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="rgba(184,36,75,0.18)" />
                  <stop offset="100%" stop-color="rgba(0,111,68,0.10)" />
                </radialGradient>
              </defs>
              <ellipse cx="140" cy="214" rx="52" ry="5" :fill="isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.12)'" />
              <path
                d="M 78,30 Q 72,75 98,112 Q 114,132 132,138 L 130,168 Q 127,172 114,174 L 114,180 L 166,180 L 166,174 Q 153,172 150,168 L 148,138 Q 166,132 182,112 Q 208,75 202,30 Z"
                fill="url(#idx-glass-fill)" stroke="url(#idx-glass-stroke)" stroke-width="1.6"
                stroke-linejoin="round" />
              <path d="M 82,34 Q 78,72 100,108 Q 110,126 128,134" fill="none" stroke="url(#idx-spec)" stroke-width="3.5"
                stroke-linecap="round" opacity="0.5" />
              <line x1="136" y1="140" x2="134" y2="172" :stroke="isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'"
                stroke-width="1" stroke-linecap="round" />
              <ellipse cx="140" cy="181" rx="26" ry="5" :fill="isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'"
                :stroke="isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.28)'" stroke-width="1.2" />
              <ellipse cx="140" cy="30" rx="62" ry="10" fill="url(#idx-water-fill)" stroke="url(#idx-rim-grad)"
                stroke-width="1.4" />
              <ellipse cx="140" cy="30" rx="54" ry="8" fill="url(#idx-aura)" class="aura-shimmer" />
              <ellipse cx="140" cy="30" rx="18" ry="3" fill="none" stroke="rgba(0,111,68,0.7)" stroke-width="1.2"
                class="ripple rp1" />
              <ellipse cx="140" cy="30" rx="36" ry="5.5" fill="none" stroke="rgba(0,111,68,0.4)" stroke-width="0.9"
                class="ripple rp2" />
              <ellipse cx="140" cy="30" rx="52" ry="7.5" fill="none" stroke="rgba(0,111,68,0.2)" stroke-width="0.7"
                class="ripple rp3" />
              <g class="leaf-float">
                <ellipse cx="140" cy="29" rx="10" ry="3" fill="#3A7A3A" opacity="0.9" />
                <line x1="132" y1="29" x2="148" y2="29" stroke="#2A5A2A" stroke-width="0.9" />
              </g>
            </svg>
            <p class="glass-touch-hint">· Touch the glass to begin ·</p>
          </div>
        </div>

        <!-- Info strip -->
        <div class="info-strip">
          <div class="info-item">
            <span class="info-label">Questions</span>
            <span class="info-value">{{ QUESTIONS_PER_RUN }}</span>
          </div>
          <div class="info-sep">·</div>
          <div class="info-item">
            <span class="info-label">Nen Types</span>
            <span class="info-value">6</span>
          </div>
          <div class="info-sep">·</div>
          <div class="info-item">
            <span class="info-label">Method</span>
            <span class="info-value">Divination</span>
          </div>
        </div>

        <button class="begin-btn" @click="startQuiz">
          <span class="begin-btn-glow" />
          <span class="begin-btn-text">Begin Water Divination</span>
        </button>

        <p class="footer-note">Focus your aura. The water will reveal your true nature.</p>

        <button class="scroll-hint" @click="scrollTo('story')" aria-label="Scroll to Story Arcs">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </section>

    <!-- ===================== SECTION 2: STORY ARCS ===================== -->
    <section id="story" class="page-section section-story">
      <div class="section-inner">
        <div class="section-heading-row">
          <span class="section-number">02</span>
          <div class="section-title-block">
            <h2 class="section-title">Story Arcs</h2>
            <p class="section-subtitle">物語の流れ · The Journey of Gon Freecss</p>
          </div>
        </div>

        <div class="arcs-grid">
          <div v-for="arc in storyArcs" :key="arc.id" class="arc-card"
            :style="{ '--arc-color': arc.color, borderColor: `${arc.color}30` }">
            <div class="arc-accent" :style="{ background: arc.color }" />
            <div class="arc-body">
              <div class="arc-meta-row">
                <span class="arc-number" :style="{ color: arc.color }">Arc {{ arc.number }}</span>
                <span class="arc-chapters">Ch. {{ arc.chapters }}</span>
                <span v-if="arc.episodes !== 'N/A (manga only)'" class="arc-eps">Ep. {{ arc.episodes }}</span>
                <span v-else class="arc-eps arc-eps--manga">Manga only</span>
              </div>
              <h3 class="arc-name">{{ arc.name }}</h3>
              <p class="arc-jp" :style="{ color: arc.color }">{{ arc.japaneseName }}</p>
              <p class="arc-summary">{{ arc.summary }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== SECTION 3: ENTER ARENA ===================== -->
    <section id="arena" class="page-section section-arena">
      <div class="section-inner section-inner--centered">
        <div class="section-heading-row section-heading-row--center">
          <span class="section-number">03</span>
          <div class="section-title-block">
            <h2 class="section-title">Enter Arena</h2>
            <p class="section-subtitle">闘技場 · Combat & Ranking</p>
          </div>
        </div>

        <!-- Locked state -->
        <div class="arena-locked">
          <svg class="arena-seal" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(184,36,75,0.15)" stroke-width="1" />
            <polygon points="60,8 102,32 102,88 60,112 18,88 18,32" fill="none" stroke="rgba(184,36,75,0.25)"
              stroke-width="1.2" stroke-linejoin="round" />
            <circle cx="60" cy="60" r="22" fill="none" stroke="rgba(232,66,10,0.18)" stroke-width="1" />
            <line x1="60" y1="38" x2="60" y2="8" stroke="rgba(184,36,75,0.18)" stroke-width="0.8" />
            <line x1="60" y1="82" x2="60" y2="112" stroke="rgba(184,36,75,0.18)" stroke-width="0.8" />
            <line x1="38.6" y1="50" x2="18" y2="32" stroke="rgba(184,36,75,0.18)" stroke-width="0.8" />
            <line x1="81.4" y1="70" x2="102" y2="88" stroke="rgba(184,36,75,0.18)" stroke-width="0.8" />
            <line x1="81.4" y1="50" x2="102" y2="32" stroke="rgba(184,36,75,0.18)" stroke-width="0.8" />
            <line x1="38.6" y1="70" x2="18" y2="88" stroke="rgba(184,36,75,0.18)" stroke-width="0.8" />
            <circle cx="60" cy="60" r="5" fill="rgba(232,66,10,0.25)" />
          </svg>

          <div class="arena-status-badge">
            <span class="arena-status-dot" />
            Hunter Exam in Progress
          </div>
          <h3 class="arena-locked-title">Arena Access Restricted</h3>
          <p class="arena-locked-body">
            The Hunter Association is currently administering the 288th Hunter Exam.
            Arena combat rankings and challenger matching will be available once the examination concludes.
          </p>
          <div class="arena-locked-meta">
            <div class="arena-meta-item">
              <span class="arena-meta-label">Status</span>
              <span class="arena-meta-value">Under Construction</span>
            </div>
            <div class="arena-meta-sep">·</div>
            <div class="arena-meta-item">
              <span class="arena-meta-label">Clearance</span>
              <span class="arena-meta-value">Hunter License Required</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="footer-row">
        <span class="footer-copy">Hunter × Hunter © Yoshihiro Togashi / Shueisha</span>
        <span class="footer-sep">·</span>
        <span class="footer-by">by <a href="https://github.com/nat236919" target="_blank" rel="noopener"
            class="footer-link">Nuttaphat Arunoprayoch</a></span>
      </div>
      <div class="footer-disclaimer">
        Fan project, not affiliated with or endorsed by the rights holders.
        Character data via <a href="https://hunterxhunter.fandom.com" target="_blank" rel="noopener"
          class="footer-link">Hunterpedia</a>.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { storyArcs } from '~/data/storyArcs'
import { QUESTIONS_PER_RUN } from '~/composables/useNenQuiz'

const router = useRouter()
const route = useRoute()
const { isDark } = useTheme()
const { result } = useNenQuiz()

const sections = [
  { id: 'divination', label: 'Water Divination' },
  { id: 'story', label: 'Story Arcs' },
  { id: 'arena', label: 'Enter Arena' },
]

const activeSection = ref('divination')

onMounted(() => {
  const typeParam = route.query.type as string | undefined
  if (typeParam) {
    router.replace(`/result?type=${typeParam}`)
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      }
    },
    { threshold: 0.4 }
  )

  for (const section of sections) {
    const el = document.getElementById(section.id)
    if (el) observer.observe(el)
  }
})

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function startQuiz() {
  if (result.value) {
    router.push(`/result?type=${result.value.id}`)
  } else {
    router.push('/quiz')
  }
}

function particleStyle(n: number) {
  const size = 1 + (n % 4) * 1.2
  const x = (n * 17 + 5) % 100
  const duration = 6 + (n % 8)
  const delay = (n * 0.6) % 6
  const colors = ['#E8420A', '#B8244B', '#006F44', '#E8A000', '#C03000']
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${x}%`,
    bottom: '0',
    background: colors[n % colors.length],
    animationDuration: `${duration}s`,
    animationDelay: `-${delay}s`,
  }
}
</script>

<style scoped>
/* ---- Root ---- */
.page-root {
  position: relative;
  background: var(--hxh-bg-deep);
  overflow-x: hidden;
}

/* ---- Aura background ---- */
.aura-field {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.aura-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.18;
  animation: orb-drift 12s ease-in-out infinite alternate;
}

.aura-orb--gold {
  width: 500px;
  height: 500px;
  left: -100px;
  top: -100px;
  background: #B8244B;
  animation-delay: 0s;
}

.aura-orb--teal {
  width: 400px;
  height: 400px;
  right: -80px;
  top: 40%;
  background: #006F44;
  animation-delay: -4s;
}

.aura-orb--purple {
  width: 360px;
  height: 360px;
  left: 30%;
  bottom: -80px;
  background: #E8420A;
  animation-delay: -8s;
  opacity: 0.12;
}

@keyframes orb-drift {
  0% {
    transform: translate(0, 0) scale(1);
  }

  100% {
    transform: translate(30px, -30px) scale(1.1);
  }
}

.scanline-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(0deg, transparent, transparent 3px,
      rgba(0, 0, 0, 0.04) 3px, rgba(0, 0, 0, 0.04) 4px);
  z-index: 1;
}

.particle-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

.aura-particle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.55;
  animation: particle-rise linear infinite;
}

@keyframes particle-rise {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.55;
  }

  100% {
    transform: translateY(-100vh) scale(0.2);
    opacity: 0;
  }
}

/* ---- Sticky nav ---- */
.site-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 28px;
  background: var(--hxh-bg-deep);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
}

.nav-logo {
  height: 28px;
  width: auto;
  filter: drop-shadow(0 0 8px rgba(184, 36, 75, 0.3));
  opacity: 0.9;
}

.nav-links {
  display: flex;
  gap: 4px;
}

.nav-link {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(220, 220, 220, 0.5);
  padding: 6px 14px;
  border-radius: 2px;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
  border: 1px solid transparent;
}

.nav-link:hover {
  color: rgba(220, 220, 220, 0.9);
}

.nav-link--active {
  color: rgba(184, 36, 75, 0.9);
  border-color: rgba(184, 36, 75, 0.3);
  background: rgba(184, 36, 75, 0.07);
}

.nen-seal {
  width: 32px;
  height: 32px;
  animation: seal-breathe 4s ease-in-out infinite;
  filter: drop-shadow(0 0 6px rgba(184, 36, 75, 0.35));
}

@keyframes seal-breathe {

  0%,
  100% {
    opacity: 0.75;
    filter: drop-shadow(0 0 4px rgba(184, 36, 75, 0.25));
  }

  50% {
    opacity: 1;
    filter: drop-shadow(0 0 10px rgba(184, 36, 75, 0.6));
  }
}

/* ---- Sections ---- */
.page-section {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  padding-top: 64px;
  /* nav height */
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

/* ---- Story arcs grid ---- */
.arcs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.arc-card {
  position: relative;
  background: var(--hxh-bg-surface);
  border: 1px solid;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.arc-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px color-mix(in srgb, var(--arc-color) 15%, transparent);
}

.arc-accent {
  height: 3px;
  width: 100%;
}

.arc-body {
  padding: 18px 20px 20px;
}

.arc-meta-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.arc-number {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.arc-chapters,
.arc-eps {
  font-family: var(--font-heading);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  color: var(--hxh-text-muted);
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 7px;
  border-radius: 2px;
}

.arc-eps--manga {
  color: rgba(184, 36, 75, 0.6);
  background: rgba(184, 36, 75, 0.08);
}

.arc-name {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 900;
  color: var(--hxh-text-primary);
  letter-spacing: 0.05em;
  margin: 0 0 2px;
}

.arc-jp {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  margin: 0 0 10px;
  opacity: 0.7;
}

.arc-summary {
  font-family: var(--font-body);
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--hxh-text-secondary);
  margin: 0;
}

/* ---- Divination title block ---- */
.title-block {
  margin-bottom: 40px;
  text-align: center;
}

.hxh-logo-wrap {
  position: relative;
  display: inline-block;
  margin-bottom: 12px;
}

.hxh-logo-img {
  width: clamp(220px, 55vw, 400px);
  height: auto;
  display: block;
  filter: drop-shadow(0 0 20px rgba(184, 36, 75, 0.4)) drop-shadow(0 0 40px rgba(232, 66, 10, 0.25));
  animation: logo-breathe 4s ease-in-out infinite;
}

@keyframes logo-breathe {

  0%,
  100% {
    filter: drop-shadow(0 0 20px rgba(184, 36, 75, 0.4)) drop-shadow(0 0 40px rgba(232, 66, 10, 0.25));
  }

  50% {
    filter: drop-shadow(0 0 32px rgba(184, 36, 75, 0.7)) drop-shadow(0 0 60px rgba(232, 66, 10, 0.4));
  }
}

.hxh-logo-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(ellipse, rgba(232, 66, 10, 0.12) 0%, transparent 70%);
  pointer-events: none;
  animation: logo-breathe 4s ease-in-out infinite;
}

.title-arena-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 10px;
}

.title-arena-line {
  flex: 1;
  max-width: 80px;
  height: 1px;
  background: rgba(220, 220, 220, 0.25);
}

.title-arena-word {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(220, 220, 220, 0.6);
}

.title-subtitle {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(220, 220, 220, 0.55);
}

.footer-note {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  color: rgba(220, 220, 220, 0.5);
  text-transform: uppercase;
  margin: 0;
}

/* ---- Divination section (reuses existing glass styles) ---- */
.section-divination {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.glass-stage {
  position: relative;
  width: clamp(140px, 38vw, 200px);
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 24px;
}

.nen-seal-bg {
  position: absolute;
  inset: -20%;
  width: 140%;
  height: 140%;
  opacity: 0.4;
  animation: seal-rotate 24s linear infinite;
  pointer-events: none;
}

@keyframes seal-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.glass-container {
  position: relative;
  z-index: 2;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.glass-svg {
  width: 100%;
  filter: drop-shadow(0 0 16px rgba(184, 36, 75, 0.3));
  transition: filter 0.4s ease;
}

.glass-stage:hover .glass-svg {
  filter: drop-shadow(0 0 24px rgba(184, 36, 75, 0.55));
}

.glass-touch-hint {
  margin-top: 10px;
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(184, 36, 75, 0.65);
  transition: color 0.3s;
}

.glass-stage:hover .glass-touch-hint {
  color: rgba(184, 36, 75, 0.95);
}

.aura-shimmer {
  animation: aura-breathe 3s ease-in-out infinite;
}

@keyframes aura-breathe {

  0%,
  100% {
    opacity: 0.35;
  }

  50% {
    opacity: 0.7;
  }
}

.ripple {
  transform-origin: center;
  animation: ripple-expand 3s ease-out infinite;
}

.rp1 {
  animation-delay: 0s;
}

.rp2 {
  animation-delay: 0.7s;
}

.rp3 {
  animation-delay: 1.4s;
}

@keyframes ripple-expand {
  0% {
    opacity: 1;
    transform: scale(0.35);
  }

  100% {
    opacity: 0;
    transform: scale(1.2);
  }
}

.leaf-float {
  animation: leaf-rock 2.4s ease-in-out infinite;
  transform-origin: center;
}

@keyframes leaf-rock {

  0%,
  100% {
    transform: translate(0, 0) rotate(-2deg);
  }

  50% {
    transform: translate(2px, -3px) rotate(2deg);
  }
}

.info-strip {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  font-family: var(--font-heading);
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.info-label {
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(220, 220, 220, 0.6);
}

.info-value {
  font-size: 0.85rem;
  color: rgba(184, 36, 75, 0.9);
  letter-spacing: 0.05em;
}

.info-sep {
  color: rgba(220, 220, 220, 0.25);
  font-size: 1rem;
}

.begin-btn {
  position: relative;
  padding: 0;
  border: none;
  cursor: pointer;
  background: transparent;
  margin-bottom: 20px;
}

.begin-btn-glow {
  position: absolute;
  inset: -4px;
  border-radius: 4px;
  background: linear-gradient(135deg, #C03000, #E8420A, #B8244B);
  filter: blur(8px);
  opacity: 0;
  transition: opacity 0.3s;
  animation: btn-glow-pulse 2.5s ease-in-out infinite;
}

@keyframes btn-glow-pulse {

  0%,
  100% {
    opacity: 0.3;
  }

  50% {
    opacity: 0.6;
  }
}

.begin-btn:hover .begin-btn-glow {
  opacity: 0.8;
}

.begin-btn-text {
  position: relative;
  display: block;
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(135deg, #E8420A 0%, #C03000 40%, #B8244B 100%);
  padding: 15px 44px;
  border-radius: 3px;
  transition: transform 0.2s;
}

.begin-btn:hover .begin-btn-text {
  transform: scale(1.04);
}

.begin-btn:active .begin-btn-text {
  transform: scale(0.97);
}

.scroll-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(184, 36, 75, 0.4);
  width: 32px;
  height: 32px;
  margin-top: 8px;
  transition: color 0.2s;
  animation: scroll-bob 2s ease-in-out infinite;
}

.scroll-hint:hover {
  color: rgba(184, 36, 75, 0.8);
}

.scroll-hint svg {
  width: 24px;
  height: 24px;
}

@keyframes scroll-bob {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(5px);
  }
}

/* ---- Arena section ---- */
.section-arena {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.arena-locked {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 480px;
  margin: 0 auto;
}

.arena-seal {
  width: 90px;
  height: 90px;
  opacity: 0.4;
  animation: seal-rotate 30s linear infinite;
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

.arena-locked-title {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 900;
  color: var(--hxh-text-primary);
  letter-spacing: 0.06em;
  margin: 0;
}

.arena-locked-body {
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--hxh-text-secondary);
  margin: 0;
}

.arena-locked-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: var(--font-heading);
}

.arena-meta-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.arena-meta-label {
  font-size: 0.62rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--hxh-text-muted);
}

.arena-meta-value {
  font-size: 0.75rem;
  color: rgba(184, 36, 75, 0.7);
  letter-spacing: 0.05em;
}

.arena-meta-sep {
  color: rgba(220, 220, 220, 0.2);
}

/* ---- Site footer ---- */
.site-footer {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  font-family: var(--font-heading);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
}

.footer-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-copy {
  color: rgba(220, 220, 220, 0.4);
}

.footer-sep {
  color: rgba(220, 220, 220, 0.2);
}

.footer-by {
  color: rgba(220, 220, 220, 0.4);
}

.footer-disclaimer {
  font-size: 0.62rem;
  color: rgba(220, 220, 220, 0.3);
  letter-spacing: 0.05em;
  text-align: center;
}

.footer-link {
  color: rgba(184, 36, 75, 0.7);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: rgba(184, 36, 75, 1);
}

/* ---- Responsive ---- */
@media (max-width: 640px) {
  .site-nav {
    padding: 10px 16px;
  }

  .nav-links {
    gap: 0;
  }

  .nav-link {
    padding: 5px 9px;
    font-size: 0.65rem;
    letter-spacing: 0.08em;
  }

  .nav-logo {
    height: 22px;
  }

  .nav-seal {
    display: none;
  }

  .section-inner {
    padding: 40px 18px 60px;
  }

  .arcs-grid {
    grid-template-columns: 1fr;
  }
}
</style>

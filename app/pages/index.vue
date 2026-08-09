<template>
  <div class="page-root">
    <!-- Nen aura field -->
    <div class="aura-field" aria-hidden="true">
      <div class="aura-orb aura-orb--gold" />
      <div class="aura-orb aura-orb--teal" />
      <div class="aura-orb aura-orb--purple" />
    </div>

    <!-- Scanline overlay -->
    <div class="scanline-overlay" aria-hidden="true" />

    <!-- Floating aura particles -->
    <div class="particle-layer" aria-hidden="true">
      <div v-for="n in 18" :key="n" class="aura-particle" :style="particleStyle(n)" />
    </div>

    <!-- Header -->
    <header class="site-header">
      <div class="header-left">
        <span class="header-label">Hunter × Hunter</span>
        <span class="header-dot">·</span>
        <span class="header-label">Nen Classification</span>
      </div>
      <div class="header-right">
        <span class="exam-badge">287th Hunter Exam</span>
      </div>
    </header>

    <!-- Main -->
    <main class="main-content">

      <!-- Title block -->
      <div class="title-block">
        <!-- Official HxH 2011 logo -->
        <div class="hxh-logo-wrap">
          <img src="/characters/hxh-logo.webp" alt="Hunter × Hunter" class="hxh-logo-img" />
          <div class="hxh-logo-glow" />
        </div>
        <div class="title-arena-row">
          <span class="title-arena-line" />
          <span class="title-arena-word">ARENA</span>
          <span class="title-arena-line" />
        </div>
        <div class="title-subtitle">水見式 · Water Divination · Nen Type Classification</div>
      </div>

      <!-- Central bowl stage -->
      <div class="glass-stage" @click="startQuiz">
        <!-- Outer aura rings -->
        <div class="stage-ring stage-ring--outer" />
        <div class="stage-ring stage-ring--mid" />
        <div class="stage-ring stage-ring--inner" />

        <!-- Bowl SVG -->
        <div class="glass-container">
          <svg viewBox="0 0 280 220" class="glass-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <!-- Aura glow on water -->
              <radialGradient id="idx-aura" cx="50%" cy="45%" r="50%">
                <stop offset="0%" stop-color="rgba(184,36,75,0.55)" />
                <stop offset="55%" stop-color="rgba(0,111,68,0.22)" />
                <stop offset="100%" stop-color="rgba(0,111,68,0)" />
              </radialGradient>
              <!-- Glass body fill -->
              <linearGradient id="idx-glass-fill" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" :stop-color="isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'" />
                <stop offset="45%" :stop-color="isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'" />
                <stop offset="100%" :stop-color="isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'" />
              </linearGradient>
              <!-- Glass edge stroke -->
              <linearGradient id="idx-glass-stroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" :stop-color="isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)'" />
                <stop offset="35%" :stop-color="isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)'" />
                <stop offset="65%" :stop-color="isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)'" />
                <stop offset="100%" :stop-color="isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.38)'" />
              </linearGradient>
              <!-- Specular highlight -->
              <linearGradient id="idx-spec" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" :stop-color="isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.18)'" />
                <stop offset="100%" stop-color="rgba(0,0,0,0)" />
              </linearGradient>
              <!-- Rim gradient -->
              <linearGradient id="idx-rim-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" :stop-color="isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'" />
                <stop offset="100%" :stop-color="isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.4)'" />
              </linearGradient>
              <!-- Water surface fill -->
              <radialGradient id="idx-water-fill" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="rgba(184,36,75,0.18)" />
                <stop offset="100%" stop-color="rgba(0,111,68,0.10)" />
              </radialGradient>
            </defs>

            <!-- Ground shadow -->
            <ellipse cx="140" cy="214" rx="52" ry="5" :fill="isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.12)'" />

            <!-- Glass body -->
            <path d="
              M 78,30
              Q 72,75 98,112
              Q 114,132 132,138
              L 130,168
              Q 127,172 114,174
              L 114,180
              L 166,180
              L 166,174
              Q 153,172 150,168
              L 148,138
              Q 166,132 182,112
              Q 208,75 202,30
              Z" fill="url(#idx-glass-fill)" stroke="url(#idx-glass-stroke)" stroke-width="1.6"
              stroke-linejoin="round" />

            <!-- Left specular highlight streak -->
            <path d="M 82,34 Q 78,72 100,108 Q 110,126 128,134" fill="none" stroke="url(#idx-spec)"
              stroke-width="3.5" stroke-linecap="round" opacity="0.5" />

            <!-- Stem highlight -->
            <line x1="136" y1="140" x2="134" y2="172"
              :stroke="isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'"
              stroke-width="1" stroke-linecap="round" />

            <!-- Base ellipse -->
            <ellipse cx="140" cy="181" rx="26" ry="5"
              :fill="isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'"
              :stroke="isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.28)'"
              stroke-width="1.2" />

            <!-- Rim ellipse (top opening) -->
            <ellipse cx="140" cy="30" rx="62" ry="10" fill="url(#idx-water-fill)" stroke="url(#idx-rim-grad)"
              stroke-width="1.4" />

            <!-- Aura glow sitting on water surface -->
            <ellipse cx="140" cy="30" rx="54" ry="8" fill="url(#idx-aura)" class="aura-shimmer" />

            <!-- Ripple rings on water surface -->
            <ellipse cx="140" cy="30" rx="18" ry="3" fill="none" stroke="rgba(0,111,68,0.7)" stroke-width="1.2"
              class="ripple rp1" />
            <ellipse cx="140" cy="30" rx="36" ry="5.5" fill="none" stroke="rgba(0,111,68,0.4)" stroke-width="0.9"
              class="ripple rp2" />
            <ellipse cx="140" cy="30" rx="52" ry="7.5" fill="none" stroke="rgba(0,111,68,0.2)" stroke-width="0.7"
              class="ripple rp3" />

            <!-- Floating leaf at water surface -->
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
          <span class="info-value">20</span>
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

      <!-- Begin button -->
      <button class="begin-btn" @click="startQuiz">
        <span class="begin-btn-glow" />
        <span class="begin-btn-text">Begin Water Divination</span>
      </button>

      <p class="footer-note">
        Focus your aura. The water will reveal your true nature.
      </p>
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const { isDark } = useTheme()
const { result } = useNenQuiz()

function startQuiz() {
  if (result.value) {
    router.push('/result')
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
.page-root {
  position: relative;
  min-height: 100vh;
  background: var(--hxh-bg-deep);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* ---- Aura orbs ---- */
.aura-field {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
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

/* ---- Scanlines ---- */
.scanline-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(0deg, transparent, transparent 3px,
      rgba(0, 0, 0, 0.04) 3px, rgba(0, 0, 0, 0.04) 4px);
  z-index: 1;
}

/* ---- Particles ---- */
.particle-layer {
  position: absolute;
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

/* ---- Header ---- */
.site-header {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 28px 12px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(220, 220, 220, 0.75);
}

.header-dot {
  opacity: 0.4;
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

/* ---- Main ---- */
.main-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 24px 20px 40px;
  text-align: center;
}

/* ---- Title block ---- */
.title-block {
  margin-bottom: 40px;
  text-align: center;
}

/* Official logo image */
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

/* ---- Bowl stage ---- */
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

.glass-stage:hover .glass-svg {
  filter: drop-shadow(0 0 24px rgba(184, 36, 75, 0.55));
}

.glass-stage:hover .stage-ring {
  opacity: 0.9;
}

.stage-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(184, 36, 75, 0.12);
  animation: ring-pulse 4s ease-in-out infinite;
  opacity: 0.6;
}

.stage-ring--outer {
  animation-delay: 0s;
}

.stage-ring--mid {
  inset: 10%;
  border-color: rgba(184, 36, 75, 0.18);
  animation-delay: -1.3s;
}

.stage-ring--inner {
  inset: 22%;
  border-color: rgba(184, 36, 75, 0.08);
  animation-delay: -2.6s;
}

@keyframes ring-pulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }

  50% {
    transform: scale(1.03);
    opacity: 0.9;
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

/* Water animations */
.water-shimmer {
  animation: water-flicker 2.2s ease-in-out infinite;
}

@keyframes water-flicker {

  0%,
  100% {
    opacity: 0.9;
  }

  50% {
    opacity: 0.7;
  }
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

/* ---- Info strip ---- */
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
  line-height: 1;
}

/* ---- Begin button ---- */
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

/* ---- Footer note ---- */
.footer-note {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  color: rgba(220, 220, 220, 0.5);
  text-transform: uppercase;
}


</style>

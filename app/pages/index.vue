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
      <div class="bowl-stage" @click="startQuiz">
        <!-- Outer aura rings -->
        <div class="stage-ring stage-ring--outer" />
        <div class="stage-ring stage-ring--mid" />
        <div class="stage-ring stage-ring--inner" />

        <!-- Bowl SVG -->
        <div class="bowl-container">
          <svg viewBox="0 0 280 200" class="bowl-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Ground shadow -->
            <ellipse cx="140" cy="188" rx="90" ry="8" fill="rgba(0,0,0,0.5)" />

            <!-- Bowl body -->
            <path d="M 42 84 Q 40 178 140 184 Q 240 178 238 84 Z" fill="url(#idx-bowl-fill)"
              stroke="url(#idx-bowl-edge)" stroke-width="1.5" />

            <!-- Bowl rim -->
            <ellipse cx="140" cy="84" rx="98" ry="16" fill="url(#idx-bowl-rim)" stroke="#9B8060" stroke-width="1.2" />

            <!-- Inner shadow -->
            <ellipse cx="140" cy="87" rx="88" ry="11" fill="rgba(0,0,0,0.25)" />

            <!-- Water surface -->
            <ellipse cx="140" cy="90" rx="84" ry="13" fill="url(#idx-water)" class="water-shimmer" />

            <!-- Aura glow -->
            <ellipse cx="140" cy="90" rx="76" ry="11" fill="url(#idx-aura)" class="aura-shimmer" />

            <!-- Water depth -->
            <ellipse cx="140" cy="92" rx="68" ry="9" fill="url(#idx-depth)" opacity="0.6" />

            <!-- Ripple rings -->
            <ellipse cx="140" cy="90" rx="24" ry="4" fill="none" stroke="rgba(0,111,68,0.8)" stroke-width="1.2"
              class="ripple rp1" />
            <ellipse cx="140" cy="90" rx="48" ry="8" fill="none" stroke="rgba(0,111,68,0.5)" stroke-width="0.9"
              class="ripple rp2" />
            <ellipse cx="140" cy="90" rx="70" ry="11" fill="none" stroke="rgba(0,111,68,0.25)" stroke-width="0.7"
              class="ripple rp3" />

            <!-- Floating leaf -->
            <g class="leaf-float">
              <ellipse cx="140" cy="89" rx="11" ry="4" fill="#3A7A3A" />
              <line x1="131" y1="89" x2="149" y2="89" stroke="#2A5A2A" stroke-width="0.9" />
            </g>

            <!-- Bowl engravings -->
            <path d="M 70 140 Q 140 175 210 140" fill="none" stroke="rgba(155,128,96,0.25)" stroke-width="1" />
            <path d="M 58 116 Q 140 154 222 116" fill="none" stroke="rgba(155,128,96,0.18)" stroke-width="0.8" />

            <!-- HxH × symbol on bowl -->
            <text x="140" y="166" text-anchor="middle" fill="rgba(155,128,96,0.2)" font-size="14" font-family="serif"
              font-weight="bold">×</text>

            <defs>
              <linearGradient id="idx-bowl-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#3E2E1E" />
                <stop offset="50%" stop-color="#231809" />
                <stop offset="100%" stop-color="#120C04" />
              </linearGradient>
              <linearGradient id="idx-bowl-edge" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#C0905A" />
                <stop offset="100%" stop-color="#3E2410" />
              </linearGradient>
              <linearGradient id="idx-bowl-rim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#B09070" />
                <stop offset="100%" stop-color="#5A3E26" />
              </linearGradient>
              <linearGradient id="idx-water" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#C9A840" stop-opacity="0.9" />
                <stop offset="100%" stop-color="#7A6028" stop-opacity="0.8" />
              </linearGradient>
              <radialGradient id="idx-aura" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#E8420A" stop-opacity="0.55" />
                <stop offset="100%" stop-color="#006F44" stop-opacity="0" />
              </radialGradient>
              <linearGradient id="idx-depth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#006F44" stop-opacity="0.5" />
                <stop offset="100%" stop-color="#3A2000" stop-opacity="0.7" />
              </linearGradient>
            </defs>
          </svg>

          <p class="bowl-touch-hint">— Touch the bowl to begin —</p>
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

function startQuiz() {
  router.push('/quiz')
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
.bowl-stage {
  position: relative;
  width: clamp(240px, 70vw, 340px);
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 24px;
}

.bowl-stage:hover .bowl-svg {
  filter: drop-shadow(0 0 24px rgba(184, 36, 75, 0.55));
}

.bowl-stage:hover .stage-ring {
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

.bowl-container {
  position: relative;
  z-index: 2;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bowl-svg {
  width: 100%;
  filter: drop-shadow(0 0 16px rgba(184, 36, 75, 0.3));
  transition: filter 0.4s ease;
}

.bowl-touch-hint {
  margin-top: 10px;
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(184, 36, 75, 0.65);
  transition: color 0.3s;
}

.bowl-stage:hover .bowl-touch-hint {
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

<template>
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

      <div class="glass-stage" @click="emit('start-quiz')">
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
              <radialGradient id="div-aura" cx="50%" cy="45%" r="50%">
                <stop offset="0%" stop-color="rgba(184,36,75,0.55)" />
                <stop offset="55%" stop-color="rgba(0,111,68,0.22)" />
                <stop offset="100%" stop-color="rgba(0,111,68,0)" />
              </radialGradient>
              <linearGradient id="div-glass-fill" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" :stop-color="isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'" />
                <stop offset="45%" :stop-color="isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'" />
                <stop offset="100%" :stop-color="isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'" />
              </linearGradient>
              <linearGradient id="div-glass-stroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" :stop-color="isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)'" />
                <stop offset="35%" :stop-color="isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)'" />
                <stop offset="65%" :stop-color="isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)'" />
                <stop offset="100%" :stop-color="isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.38)'" />
              </linearGradient>
              <linearGradient id="div-spec" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" :stop-color="isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.18)'" />
                <stop offset="100%" stop-color="rgba(0,0,0,0)" />
              </linearGradient>
              <linearGradient id="div-rim-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" :stop-color="isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'" />
                <stop offset="100%" :stop-color="isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.4)'" />
              </linearGradient>
              <radialGradient id="div-water-fill" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="rgba(184,36,75,0.18)" />
                <stop offset="100%" stop-color="rgba(0,111,68,0.10)" />
              </radialGradient>
            </defs>
            <ellipse cx="140" cy="214" rx="52" ry="5" :fill="isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.12)'" />
            <path
              d="M 78,30 Q 72,75 98,112 Q 114,132 132,138 L 130,168 Q 127,172 114,174 L 114,180 L 166,180 L 166,174 Q 153,172 150,168 L 148,138 Q 166,132 182,112 Q 208,75 202,30 Z"
              fill="url(#div-glass-fill)" stroke="url(#div-glass-stroke)" stroke-width="1.6" stroke-linejoin="round" />
            <path d="M 82,34 Q 78,72 100,108 Q 110,126 128,134" fill="none" stroke="url(#div-spec)" stroke-width="3.5"
              stroke-linecap="round" opacity="0.5" />
            <line x1="136" y1="140" x2="134" y2="172" :stroke="isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'"
              stroke-width="1" stroke-linecap="round" />
            <ellipse cx="140" cy="181" rx="26" ry="5" :fill="isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'"
              :stroke="isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.28)'" stroke-width="1.2" />
            <ellipse cx="140" cy="30" rx="62" ry="10" fill="url(#div-water-fill)" stroke="url(#div-rim-grad)"
              stroke-width="1.4" />
            <ellipse cx="140" cy="30" rx="54" ry="8" fill="url(#div-aura)" class="aura-shimmer" />
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

      <div class="info-strip">
        <div class="info-item">
          <span class="info-label">Questions</span>
          <span class="info-value">{{ questionsPerRun }}</span>
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

      <button class="begin-btn" @click="emit('start-quiz')">
        <span class="begin-btn-glow" />
        <span class="begin-btn-text">Begin Water Divination</span>
      </button>

      <p class="footer-note">Focus your aura. The water will reveal your true nature.</p>

      <button class="scroll-hint" @click="emit('scroll-to', 'story')" aria-label="Scroll to Story Arcs">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
          stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ questionsPerRun: number }>()

const emit = defineEmits<{
  'start-quiz': []
  'scroll-to': [id: string]
}>()

const { isDark } = useTheme()
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

.section-divination {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

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

.footer-note {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  color: rgba(220, 220, 220, 0.5);
  text-transform: uppercase;
  margin: 0;
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

@media (max-width: 640px) {
  .section-inner {
    padding: 40px 18px 60px;
  }
}
</style>

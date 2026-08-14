<template>
  <aside class="glass-side">
    <div class="mini-glass-wrap" :style="{ '--glow': dominantColor }">
      <svg class="nen-seal-bg" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(184,36,75,0.08)" stroke-width="0.5" />
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

      <svg viewBox="0 0 160 130" class="mini-glass-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="qz-glass-fill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" :stop-color="isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'" />
            <stop offset="45%" :stop-color="isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'" />
            <stop offset="100%" :stop-color="isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'" />
          </linearGradient>
          <linearGradient id="qz-glass-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" :stop-color="isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)'" />
            <stop offset="35%" :stop-color="isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)'" />
            <stop offset="65%" :stop-color="isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)'" />
            <stop offset="100%" :stop-color="isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.38)'" />
          </linearGradient>
          <linearGradient id="qz-spec" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" :stop-color="isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.18)'" />
            <stop offset="100%" stop-color="rgba(0,0,0,0)" />
          </linearGradient>
          <linearGradient id="qz-rim-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" :stop-color="isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'" />
            <stop offset="100%" :stop-color="isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.4)'" />
          </linearGradient>
          <radialGradient id="qz-water-fill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(184,36,75,0.18)" />
            <stop offset="100%" stop-color="rgba(0,111,68,0.10)" />
          </radialGradient>
        </defs>

        <ellipse cx="80" cy="126" rx="30" ry="3" :fill="isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.12)'" />

        <path d="
          M 44,18
          Q 40,46 56,66
          Q 66,78 75,81
          L 74,98
          Q 71,101 63,102
          L 63,106
          L 97,106
          L 97,102
          Q 89,101 86,98
          L 85,81
          Q 94,78 104,66
          Q 120,46 116,18
          Z" fill="url(#qz-glass-fill)" stroke="url(#qz-glass-stroke)" stroke-width="1.2" stroke-linejoin="round" />

        <path d="M 47,21 Q 44,44 57,62 Q 65,74 73,78" fill="none" stroke="url(#qz-spec)" stroke-width="2.5"
          stroke-linecap="round" opacity="0.5" />

        <line x1="78" y1="82" x2="77" y2="100" :stroke="isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'"
          stroke-width="0.8" stroke-linecap="round" />

        <ellipse cx="80" cy="107" rx="17" ry="3.5" :fill="isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'"
          :stroke="isDark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.28)'" stroke-width="1" />

        <ellipse cx="80" cy="18" rx="36" ry="7" fill="url(#qz-water-fill)" stroke="url(#qz-rim-grad)"
          stroke-width="1.2" />

        <ellipse cx="80" cy="18" rx="30" ry="5.5" :fill="auraFill" class="aura-anim" />

        <ellipse cx="80" cy="18" rx="10" ry="2" fill="none" :stroke="dominantColor" stroke-width="1"
          class="ripple rp1" />
        <ellipse cx="80" cy="18" rx="20" ry="3.5" fill="none" :stroke="dominantColor" stroke-width="0.7"
          class="ripple rp2" />
        <ellipse cx="80" cy="18" rx="28" ry="5" fill="none" :stroke="dominantColor" stroke-width="0.5"
          class="ripple rp3" />

        <g class="leaf-anim">
          <ellipse cx="80" cy="17" rx="7" ry="2" fill="#3A7A3A" opacity="0.9" />
          <line x1="74" y1="17" x2="86" y2="17" stroke="#2A5A2A" stroke-width="0.6" />
        </g>
      </svg>
    </div>

    <div class="aura-lines" aria-hidden="true">
      <div v-for="n in 5" :key="n" class="aura-line" :style="auraLineStyle(n)" />
    </div>

    <div class="mobile-strip-info" aria-hidden="true">
      <span class="mobile-strip-label">
        Question {{ currentIndex + 1 }} / {{ total }}
      </span>
      <div class="mobile-strip-progress">
        <div class="mobile-strip-fill" :style="{ width: `${progress}%`, background: dominantColor }" />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
const props = defineProps<{
  dominantColor: string
  auraFill: string
  isDark: boolean
  progress: number
  currentIndex: number
  total: number
}>()

function auraLineStyle(n: number) {
  const delay = n * 0.4
  const duration = 3 + n * 0.5
  const width = 60 + n * 10
  const lineColor = props.isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'
  return {
    width: `${width}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    background: `linear-gradient(90deg, transparent, ${lineColor}, transparent)`,
  }
}
</script>

<style scoped>
.glass-side {
  flex-shrink: 0;
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
  padding-right: 24px;
}

.mini-glass-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: drop-shadow(0 0 14px var(--glow, rgba(201, 162, 39, 0.4)));
  transition: filter 0.5s;
}

.mini-glass-svg {
  width: 80px;
  position: relative;
  z-index: 1;
}

.nen-seal-bg {
  position: absolute;
  inset: -30%;
  width: 160%;
  height: 160%;
  opacity: 0.6;
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

.aura-lines {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.aura-line {
  height: 1px;
  border-radius: 1px;
  animation: line-pulse linear infinite;
  opacity: 0;
}

@keyframes line-pulse {
  0% {
    opacity: 0;
    transform: scaleX(0.3);
  }

  30% {
    opacity: 0.7;
    transform: scaleX(1);
  }

  70% {
    opacity: 0.7;
    transform: scaleX(1);
  }

  100% {
    opacity: 0;
    transform: scaleX(0.3);
  }
}

.aura-anim {
  animation: aura-breathe 3s ease-in-out infinite;
}

@keyframes aura-breathe {

  0%,
  100% {
    opacity: 0.3;
  }

  50% {
    opacity: 0.65;
  }
}

.ripple {
  transform-origin: center;
  animation: ripple-out 2.8s ease-out infinite;
}

.rp1 {
  animation-delay: 0s;
}

.rp2 {
  animation-delay: 0.6s;
}

.rp3 {
  animation-delay: 1.2s;
}

@keyframes ripple-out {
  0% {
    opacity: 1;
    transform: scale(0.3);
  }

  100% {
    opacity: 0;
    transform: scale(1.2);
  }
}

.leaf-anim {
  animation: leaf-drift 2.2s ease-in-out infinite;
  transform-origin: center;
}

@keyframes leaf-drift {

  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(1.5px, -2px);
  }
}

.mobile-strip-info {
  display: none;
}

@media (max-width: 600px) {
  .glass-side {
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: 14px;
    padding: 0 0 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .mini-glass-wrap {
    flex-shrink: 0;
  }

  .mini-glass-svg {
    width: 36px;
  }

  .nen-seal-bg {
    display: none;
  }

  .mobile-strip-info {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
    min-width: 0;
  }

  .mobile-strip-label {
    font-family: var(--font-heading);
    font-size: 0.68rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(220, 220, 220, 0.55);
  }

  .mobile-strip-progress {
    position: relative;
    height: 3px;
    background: rgba(255, 255, 255, 0.07);
    border-radius: 2px;
    overflow: hidden;
  }

  .mobile-strip-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1), background 0.6s ease;
  }

  .aura-lines {
    display: none;
  }
}
</style>

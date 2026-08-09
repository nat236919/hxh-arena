<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4">
    <!-- Background aura particles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div v-for="n in 20" :key="n" class="particle" :style="particleStyle(n)" />
    </div>

    <!-- Title -->
    <div class="relative z-10 text-center mb-12">
      <p class="text-amber-400 text-sm tracking-[0.3em] uppercase mb-2 font-light">Hunter x Hunter</p>
      <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-3">
        <span class="text-white">HxH</span>
        <span class="text-amber-400"> Arena</span>
      </h1>
      <p class="text-gray-400 text-lg">Discover your Nen type through the Water Divination test</p>
    </div>

    <!-- Bowl animation -->
    <div class="relative z-10 mb-12 cursor-pointer group" @click="startQuiz">
      <div class="bowl-container">
        <!-- Outer glow ring -->
        <div class="bowl-glow-ring" />

        <!-- SVG Bowl -->
        <svg viewBox="0 0 200 160" class="w-56 h-44 md:w-72 md:h-56 drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
          <!-- Bowl shadow -->
          <ellipse cx="100" cy="148" rx="70" ry="8" fill="rgba(0,0,0,0.4)" />

          <!-- Bowl body -->
          <path d="M 30 60 Q 30 140 100 145 Q 170 140 170 60 Z" fill="url(#bowlGradient)" stroke="url(#bowlStroke)"
            stroke-width="1.5" />

          <!-- Bowl rim -->
          <ellipse cx="100" cy="60" rx="70" ry="12" fill="url(#rimGradient)" stroke="#6b7280" stroke-width="1" />

          <!-- Water surface -->
          <ellipse cx="100" cy="62" rx="62" ry="10" fill="url(#waterGradient)" class="water-surface" />

          <!-- Ripple rings -->
          <ellipse cx="100" cy="62" rx="20" ry="4" fill="none" stroke="rgba(147,197,253,0.6)" stroke-width="1"
            class="ripple ripple-1" />
          <ellipse cx="100" cy="62" rx="35" ry="6" fill="none" stroke="rgba(147,197,253,0.4)" stroke-width="0.8"
            class="ripple ripple-2" />
          <ellipse cx="100" cy="62" rx="50" ry="8" fill="none" stroke="rgba(147,197,253,0.2)" stroke-width="0.6"
            class="ripple ripple-3" />

          <!-- Aura glow on water -->
          <ellipse cx="100" cy="62" rx="55" ry="9" fill="url(#auraGlow)" class="aura-pulse" />

          <!-- Floating leaf/object on water -->
          <ellipse cx="100" cy="62" rx="8" ry="3" fill="#4ade80" class="leaf-float" />

          <defs>
            <linearGradient id="bowlGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#374151" />
              <stop offset="100%" stop-color="#1f2937" />
            </linearGradient>
            <linearGradient id="rimGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#6b7280" />
              <stop offset="100%" stop-color="#374151" />
            </linearGradient>
            <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#60a5fa" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0.7" />
            </linearGradient>
            <radialGradient id="auraGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.5" />
              <stop offset="100%" stop-color="#7c3aed" stop-opacity="0" />
            </radialGradient>
            <linearGradient id="bowlStroke" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#9ca3af" />
              <stop offset="100%" stop-color="#374151" />
            </linearGradient>
          </defs>
        </svg>

        <!-- Hover prompt -->
        <div
          class="absolute -bottom-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span class="text-amber-400 text-sm tracking-widest">TOUCH THE BOWL</span>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="relative z-10 text-center">
      <button
        class="px-10 py-4 bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] active:scale-95"
        @click="startQuiz">
        Begin Divination
      </button>
      <p class="mt-4 text-gray-600 text-xs tracking-wider">Place your hand on the bowl and focus your aura</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

function startQuiz() {
  router.push('/quiz')
}

function particleStyle(n: number) {
  const size = 2 + (n % 4)
  const x = (n * 17 + 5) % 100
  const duration = 4 + (n % 6)
  const delay = (n * 0.3) % 4
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${x}%`,
    bottom: '-10px',
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
  }
}
</script>

<style scoped>
.particle {
  position: absolute;
  border-radius: 50%;
  background: rgba(167, 139, 250, 0.4);
  animation: float-up linear infinite;
}

@keyframes float-up {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }

  100% {
    transform: translateY(-100vh) scale(0.3);
    opacity: 0;
  }
}

.bowl-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bowl-glow-ring {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(124, 58, 237, 0.15) 0%, transparent 70%);
  animation: pulse-glow 3s ease-in-out infinite;
}

@keyframes pulse-glow {

  0%,
  100% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1);
  }

  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

.water-surface {
  animation: water-shimmer 2s ease-in-out infinite;
}

@keyframes water-shimmer {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.85;
  }
}

.ripple {
  transform-origin: center;
  animation: ripple-out 2.5s ease-out infinite;
}

.ripple-1 {
  animation-delay: 0s;
}

.ripple-2 {
  animation-delay: 0.4s;
}

.ripple-3 {
  animation-delay: 0.8s;
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

.aura-pulse {
  animation: aura-pulse 3s ease-in-out infinite;
}

@keyframes aura-pulse {

  0%,
  100% {
    opacity: 0.3;
  }

  50% {
    opacity: 0.8;
  }
}

.leaf-float {
  animation: leaf-bob 2s ease-in-out infinite;
  transform-origin: center;
}

@keyframes leaf-bob {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-2px);
  }
}
</style>

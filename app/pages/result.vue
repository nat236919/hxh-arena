<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen px-4 py-16 overflow-hidden"
    :style="{ background: `radial-gradient(ellipse at center, ${nenType?.glowColor ?? 'rgba(167,139,250,0.2)'} 0%, #030712 70%)` }">
    <!-- Particle burst -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="n in 30" :key="n" class="result-particle" :style="burstParticle(n)" />
    </div>

    <Transition name="reveal" appear>
      <div v-if="revealed" class="relative z-10 w-full max-w-xl text-center">

        <!-- Shareable card region -->
        <div ref="cardRef" class="share-card bg-gray-950 rounded-3xl p-8 mb-6"
          :style="{ boxShadow: `0 0 60px ${nenType?.glowColor}` }">
          <!-- Japanese name -->
          <p class="text-2xl font-light mb-1 opacity-60" :style="{ color: nenType?.color }">
            {{ nenType?.japaneseName }}
          </p>

          <!-- Type name -->
          <h1 class="text-6xl md:text-8xl font-black mb-2 tracking-tight"
            :style="{ color: nenType?.color, textShadow: `0 0 60px ${nenType?.glowColor}` }">
            {{ nenType?.name }}
          </h1>

          <p class="text-gray-400 text-sm tracking-[0.3em] uppercase mb-6">Your Nen Type</p>

          <!-- Divider -->
          <div class="flex items-center gap-4 mb-6">
            <div class="flex-1 h-px" :style="{ background: nenType?.color, opacity: 0.3 }" />
            <div class="w-2 h-2 rounded-full" :style="{ background: nenType?.color }" />
            <div class="flex-1 h-px" :style="{ background: nenType?.color, opacity: 0.3 }" />
          </div>

          <!-- Description -->
          <p class="text-gray-300 text-base leading-relaxed mb-6">
            {{ nenType?.description }}
          </p>

          <!-- Traits -->
          <div class="flex flex-wrap justify-center gap-2 mb-6">
            <span v-for="trait in nenType?.traits" :key="trait"
              class="px-3 py-1 rounded-full text-xs font-medium border"
              :style="{ borderColor: nenType?.color, color: nenType?.color, background: `${nenType?.color}15` }">
              {{ trait }}
            </span>
          </div>

          <!-- Radar chart -->
          <div class="mb-6">
            <p class="text-gray-500 text-xs tracking-widest uppercase mb-3">Nen Aptitude</p>
            <div class="relative w-64 h-64 mx-auto">
              <Radar v-if="chartData" :data="chartData" :options="chartOptions" />
            </div>
          </div>

          <!-- HxH Arena branding for share -->
          <p class="text-gray-600 text-xs tracking-widest mt-2">HxH Arena</p>
        </div>

        <!-- Characters -->
        <div class="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 mb-6 text-left">
          <p class="text-gray-500 text-xs tracking-widest uppercase mb-3">Known Hunters with this type</p>
          <div class="flex flex-col gap-2">
            <button v-for="profile in nenType?.characterProfiles" :key="profile.name"
              class="flex items-center gap-3 group text-left" @click="openProfile(profile)">
              <div class="w-1.5 h-1.5 rounded-full flex-shrink-0" :style="{ background: nenType?.color }" />
              <span class="text-white font-medium group-hover:underline" :style="{ color: nenType?.color }">
                {{ profile.name }}
              </span>
              <span class="text-gray-500 text-xs">{{ profile.title }}</span>
            </button>
          </div>
        </div>

        <!-- Weakness -->
        <div class="bg-gray-900/40 border border-gray-800 rounded-xl p-4 mb-8 text-left">
          <p class="text-gray-500 text-xs tracking-widest uppercase mb-1">Shadow side</p>
          <p class="text-gray-400 text-sm">{{ nenType?.weakness }}</p>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-4">
          <button
            class="px-8 py-3 rounded-full font-bold text-gray-900 transition-all duration-300 hover:scale-105 active:scale-95"
            :style="{ background: nenType?.color, boxShadow: `0 0 30px ${nenType?.glowColor}` }" @click="retake">
            Retake the Test
          </button>
          <NuxtLink to="/"
            class="px-8 py-3 rounded-full border font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-gray-800"
            :style="{ borderColor: nenType?.color }">
            Return to Arena
          </NuxtLink>
        </div>

        <!-- Credits -->
        <p class="text-gray-700 text-xs text-center mb-4">
          Character data sourced from
          <a href="https://hunterxhunter.fandom.com/wiki/Hunterpedia" target="_blank" rel="noopener"
            class="hover:text-gray-500 underline">Hunterpedia</a>.
          Sound effects from
          <a href="https://mixkit.co" target="_blank" rel="noopener" class="hover:text-gray-500 underline">Mixkit</a>.
          Hunter x Hunter is the intellectual property of Yoshihiro Togashi / Shueisha.
        </p>

        <!-- Share buttons -->
        <div class="flex gap-3 justify-center">
          <button
            class="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-700 text-gray-400 text-sm hover:border-gray-500 hover:text-white transition-all"
            :disabled="!!sharing" @click="shareCard('download')">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {{ sharing === 'download' ? 'Saving...' : 'Save Image' }}
          </button>
          <button
            class="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-700 text-gray-400 text-sm hover:border-gray-500 hover:text-white transition-all"
            :disabled="!!sharing" @click="shareCard('copy')">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {{ sharing === 'copy' ? 'Copied!' : 'Copy Image' }}
          </button>
        </div>
      </div>
    </Transition>

    <!-- Character profile modal -->
    <Transition name="modal">
      <div v-if="activeProfile" class="fixed inset-0 z-50 flex items-center justify-center px-4"
        @click.self="activeProfile = null">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="activeProfile = null" />
        <div class="relative z-10 bg-gray-900 border rounded-2xl p-6 max-w-md w-full shadow-2xl"
          :style="{ borderColor: nenType?.color, boxShadow: `0 0 40px ${nenType?.glowColor}` }">
          <button class="absolute top-4 right-4 text-gray-500 hover:text-white" @click="activeProfile = null">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <p class="text-xs tracking-widest uppercase mb-1" :style="{ color: nenType?.color }">{{ activeProfile.title }}
          </p>
          <h2 class="text-2xl font-bold text-white mb-4">{{ activeProfile.name }}</h2>
          <div class="space-y-3">
            <div v-for="ability in activeProfile.abilities" :key="ability.name" class="border-l-2 pl-3"
              :style="{ borderColor: nenType?.color }">
              <p class="text-white font-semibold text-sm">{{ ability.name }}</p>
              <p class="text-gray-400 text-xs mt-0.5">{{ ability.description }}</p>
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

const chartData = computed(() => {
  if (!nenType.value) return null
  const labels = ['Enhancer', 'Transmuter', 'Emitter', 'Conjurer', 'Manipulator', 'Specialist']
  const data = [
    scores.value.enhancer,
    scores.value.transmuter,
    scores.value.emitter,
    scores.value.conjurer,
    scores.value.manipulator,
    scores.value.specialist,
  ]
  return {
    labels,
    datasets: [{
      data,
      backgroundColor: `${nenType.value.color}30`,
      borderColor: nenType.value.color,
      borderWidth: 2,
      pointBackgroundColor: nenType.value.color,
      pointRadius: 4,
    }],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: { legend: { display: false }, tooltip: { enabled: true } },
  scales: {
    r: {
      min: 0,
      ticks: { display: false, stepSize: 3 },
      grid: { color: 'rgba(255,255,255,0.08)' },
      angleLines: { color: 'rgba(255,255,255,0.08)' },
      pointLabels: {
        color: 'rgba(255,255,255,0.5)',
        font: { size: 11 },
      },
    },
  },
}

// Sound effects
const sounds = {
  reveal: typeof window !== 'undefined' ? new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3') : null,
}

onMounted(() => {
  // Use nextTick to allow shared state to settle after navigation
  nextTick(() => {
    if (!result.value) {
      router.replace('/')
      return
    }
    setTimeout(() => {
      revealed.value = true
      sounds.reveal?.play().catch(() => { })
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
      backgroundColor: '#030712',
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

function burstParticle(n: number) {
  const angle = (n / 30) * 360
  const distance = 40 + (n % 5) * 15
  const size = 2 + (n % 3)
  const duration = 2 + (n % 3)
  const delay = (n % 5) * 0.1
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: '50%',
    top: '50%',
    background: nenType.value?.auraColor ?? '#a78bfa',
    borderRadius: '50%',
    position: 'absolute' as const,
    animation: `burst ${duration}s ease-out ${delay}s infinite`,
    '--angle': `${angle}deg`,
    '--distance': `${distance}vw`,
    opacity: 0.6,
  }
}
</script>

<style scoped>
.reveal-enter-active {
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(30px);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.result-particle {
  animation: burst var(--duration, 3s) ease-out infinite;
}

@keyframes burst {
  0% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0);
    opacity: 0.8;
  }

  100% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateX(var(--distance));
    opacity: 0;
  }
}
</style>

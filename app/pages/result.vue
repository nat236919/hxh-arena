<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen px-4 py-16 overflow-hidden"
    :style="{ background: `radial-gradient(ellipse at center, ${nenType?.glowColor ?? 'rgba(167,139,250,0.2)'} 0%, #030712 70%)` }">
    <!-- Particle burst -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="n in 30" :key="n" class="result-particle" :style="burstParticle(n)" />
    </div>

    <Transition name="reveal" appear>
      <div v-if="revealed" class="relative z-10 w-full max-w-xl text-center">

        <!-- Japanese name -->
        <p class="text-2xl font-light mb-1 opacity-60" :style="{ color: nenType?.color }">
          {{ nenType?.japaneseName }}
        </p>

        <!-- Type name -->
        <h1 class="text-6xl md:text-8xl font-black mb-2 tracking-tight"
          :style="{ color: nenType?.color, textShadow: `0 0 60px ${nenType?.glowColor}` }">
          {{ nenType?.name }}
        </h1>

        <p class="text-gray-400 text-sm tracking-[0.3em] uppercase mb-10">Your Nen Type</p>

        <!-- Divider -->
        <div class="flex items-center gap-4 mb-8">
          <div class="flex-1 h-px" :style="{ background: nenType?.color, opacity: 0.3 }" />
          <div class="w-2 h-2 rounded-full" :style="{ background: nenType?.color }" />
          <div class="flex-1 h-px" :style="{ background: nenType?.color, opacity: 0.3 }" />
        </div>

        <!-- Description -->
        <p class="text-gray-300 text-base md:text-lg leading-relaxed mb-10">
          {{ nenType?.description }}
        </p>

        <!-- Traits -->
        <div class="flex flex-wrap justify-center gap-2 mb-10">
          <span v-for="trait in nenType?.traits" :key="trait" class="px-3 py-1 rounded-full text-xs font-medium border"
            :style="{ borderColor: nenType?.color, color: nenType?.color, background: `${nenType?.color}15` }">
            {{ trait }}
          </span>
        </div>

        <!-- Characters -->
        <div class="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 mb-10 text-left">
          <p class="text-gray-500 text-xs tracking-widest uppercase mb-3">Known Hunters with this type</p>
          <div class="flex flex-col gap-2">
            <div v-for="character in nenType?.characters" :key="character" class="flex items-center gap-3">
              <div class="w-1.5 h-1.5 rounded-full" :style="{ background: nenType?.color }" />
              <span class="text-white font-medium">{{ character }}</span>
            </div>
          </div>
        </div>

        <!-- Weakness -->
        <div class="bg-gray-900/40 border border-gray-800 rounded-xl p-4 mb-12 text-left">
          <p class="text-gray-500 text-xs tracking-widest uppercase mb-1">Shadow side</p>
          <p class="text-gray-400 text-sm">{{ nenType?.weakness }}</p>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
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
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { nenTypes } from '~/data/nenTypes'

const router = useRouter()
const { result, reset } = useNenQuiz()

const revealed = ref(false)

const nenType = computed(() => result.value ?? null)

onMounted(() => {
  if (!result.value) {
    router.replace('/')
    return
  }
  setTimeout(() => { revealed.value = true }, 100)
})

function retake() {
  reset()
  router.push('/quiz')
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

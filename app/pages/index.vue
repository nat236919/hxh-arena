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

    <TheNav :sections="sections" :active-section="activeSection" @scroll-to="scrollTo" />

    <SectionDivination :questions-per-run="QUESTIONS_PER_RUN" @start-quiz="startQuiz" @scroll-to="scrollTo" />
    <SectionArena />
    <SectionStoryArcs />

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
        <span class="footer-sep">·</span>
        <NuxtLink to="/methodology" class="footer-link">Quiz methodology</NuxtLink>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { QUESTIONS_PER_RUN } from '~/composables/useNenQuiz'

const router = useRouter()
const route = useRoute()
const { result } = useNenQuiz()

const sections = [
  { id: 'divination', label: 'Water Divination' },
  { id: 'arena', label: 'Enter Arena' },
  { id: 'story', label: 'Story Arcs' },
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
.page-root {
  position: relative;
  background: var(--hxh-bg-deep);
  overflow-x: hidden;
}

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
</style>

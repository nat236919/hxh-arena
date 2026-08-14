<template>
  <nav class="site-nav">
    <div class="nav-brand">
      <img src="/characters/hxh-logo.webp" alt="HxH Arena" class="nav-logo" />
    </div>
    <div class="nav-links">
      <a v-for="section in sections" :key="section.id" class="nav-link"
        :class="{ 'nav-link--active': activeSection === section.id }" @click.prevent="emit('scroll-to', section.id)">
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
</template>

<script setup lang="ts">
defineProps<{
  sections: { id: string; label: string }[]
  activeSection: string
}>()

const emit = defineEmits<{
  'scroll-to': [id: string]
}>()
</script>

<style scoped>
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
}
</style>

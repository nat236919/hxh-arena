<template>
  <header class="arena-header">
    <NuxtLink :to="backTo" class="back-link">&#8592; {{ backLabel }}</NuxtLink>
    <span v-if="label" class="header-label">{{ label }}</span>
    <div v-else class="header-seal" aria-hidden="true">
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(184,36,75,0.25)" stroke-width="0.8" />
        <polygon points="24,4 41,13.5 41,34.5 24,44 7,34.5 7,13.5" fill="none" stroke="rgba(184,36,75,0.7)"
          stroke-width="1.2" stroke-linejoin="round" />
        <circle cx="24" cy="24" r="2.5" fill="rgba(232,66,10,0.8)" />
      </svg>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  backTo: string
  backLabel: string
  label?: string
}>()
</script>

<style scoped>
.arena-header {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
}

.back-link {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(220, 220, 220, 0.5);
  text-decoration: none;
  padding: 6px 14px;
  border: 1px solid transparent;
  border-radius: 2px;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}

.back-link:hover {
  color: rgba(184, 36, 75, 0.9);
  border-color: rgba(184, 36, 75, 0.3);
  background: rgba(184, 36, 75, 0.07);
}

.header-label {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: rgba(220, 220, 220, 0.3);
}

.header-seal svg {
  width: 32px;
  height: 32px;
  opacity: 0.7;
  filter: drop-shadow(0 0 6px rgba(184, 36, 75, 0.35));
}
</style>

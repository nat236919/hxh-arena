<template>
  <div class="app-root">
    <NuxtPage />
    <button class="theme-toggle" :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
      @click="toggle">
      <svg v-if="isDark" class="theme-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.5" />
        <path
          d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
      <svg v-else class="theme-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" stroke="currentColor" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const { isDark, toggle, init } = useTheme()
onMounted(init)
</script>

<style>
.app-root {
  min-height: 100vh;
  background: var(--hxh-bg-deep);
  color: var(--hxh-text-primary);
  transition: background 0.3s ease, color 0.3s ease;
}

.theme-toggle {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--hxh-border-mid);
  background: var(--hxh-bg-surface);
  color: var(--hxh-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
}

.theme-toggle:hover {
  background: var(--hxh-bg-mid);
  color: var(--hxh-text-primary);
  transform: scale(1.08);
}

.theme-icon {
  width: 18px;
  height: 18px;
}
</style>

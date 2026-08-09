<template>
  <div class="error-root">
    <div class="error-aura-bg" />
    <div class="scanline-overlay" aria-hidden="true" />

    <!-- Theme toggle (mirrors app.vue) -->
    <button class="theme-toggle" :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
      @click="toggle">
      <svg v-if="isDark" class="theme-icon" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.5" />
        <path
          d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
      <svg v-else class="theme-icon" viewBox="0 0 24 24" fill="none">
        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" stroke="currentColor" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <main class="error-main">
      <!-- Nen seal -->
      <svg class="error-seal" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(184,36,75,0.18)" stroke-width="1" />
        <polygon points="60,8 102,32 102,88 60,112 18,88 18,32" fill="none" stroke="rgba(184,36,75,0.28)"
          stroke-width="1.2" stroke-linejoin="round" />
        <circle cx="60" cy="60" r="22" fill="none" stroke="rgba(232,66,10,0.2)" stroke-width="1" />
        <line x1="60" y1="38" x2="60" y2="8" stroke="rgba(184,36,75,0.2)" stroke-width="0.8" />
        <line x1="60" y1="82" x2="60" y2="112" stroke="rgba(184,36,75,0.2)" stroke-width="0.8" />
        <line x1="38.6" y1="50" x2="18" y2="32" stroke="rgba(184,36,75,0.2)" stroke-width="0.8" />
        <line x1="81.4" y1="70" x2="102" y2="88" stroke="rgba(184,36,75,0.2)" stroke-width="0.8" />
        <line x1="81.4" y1="50" x2="102" y2="32" stroke="rgba(184,36,75,0.2)" stroke-width="0.8" />
        <line x1="38.6" y1="70" x2="18" y2="88" stroke="rgba(184,36,75,0.2)" stroke-width="0.8" />
        <circle cx="60" cy="60" r="5" fill="rgba(232,66,10,0.3)" />
      </svg>

      <div class="error-code">404</div>
      <p class="error-subtitle">Water Divination: No Path Found</p>
      <p class="error-body">
        This sector of the Hunter's database does not exist.
        Even Gon couldn't find anything here.
      </p>

      <NuxtLink to="/" class="error-btn">Return to the Arena</NuxtLink>
    </main>
  </div>
</template>

<script setup lang="ts">
defineProps<{ error: { statusCode: number; message: string } }>()

const { isDark, toggle, init } = useTheme()
onMounted(init)
</script>

<style scoped>
.error-root {
  position: relative;
  min-height: 100vh;
  background: var(--hxh-bg-deep);
  color: var(--hxh-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: 'Rajdhani', 'Arial Narrow', sans-serif;
  transition: background 0.3s ease, color 0.3s ease;
}

.error-aura-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at 50% 40%, rgba(184, 36, 75, 0.08) 0%, transparent 65%);
  animation: aura-bloom 6s ease-in-out infinite;
}

@keyframes aura-bloom {

  0%,
  100% {
    opacity: 0.7;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.08);
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

.error-main {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px 24px;
  text-align: center;
  animation: fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-seal {
  width: 100px;
  height: 100px;
  opacity: 0.5;
  animation: seal-rotate 24s linear infinite;
  margin-bottom: 8px;
}

@keyframes seal-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.error-code {
  font-family: 'Black Han Sans', 'Impact', sans-serif;
  font-size: clamp(5rem, 20vw, 9rem);
  font-weight: 900;
  letter-spacing: 0.06em;
  line-height: 1;
  color: rgba(184, 36, 75, 0.6);
  text-shadow: 0 0 60px rgba(184, 36, 75, 0.25);
}

.error-subtitle {
  font-family: 'Rajdhani', 'Arial Narrow', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--hxh-text-muted);
  margin: 0;
}

.error-body {
  font-family: 'Crimson Pro', 'Georgia', serif;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--hxh-text-secondary);
  max-width: 340px;
  margin: 8px 0 0;
}

.error-btn {
  display: inline-flex;
  align-items: center;
  margin-top: 12px;
  padding: 11px 28px;
  border: 1px solid rgba(184, 36, 75, 0.5);
  border-radius: 3px;
  font-family: 'Rajdhani', 'Arial Narrow', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--hxh-text-secondary);
  text-decoration: none;
  background: transparent;
  transition: all 0.2s;
}

.error-btn:hover {
  background: rgba(184, 36, 75, 0.12);
  border-color: rgba(184, 36, 75, 0.8);
  color: var(--hxh-text-primary);
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

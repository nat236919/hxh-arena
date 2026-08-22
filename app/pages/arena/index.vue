<template>
  <div class="page-root">
    <ArenaBackground />

    <ArenaHeader back-to="/" back-label="HxH Arena" />

    <main class="arena-main">
      <p class="arena-tag">HEAVENS ARENA</p>
      <h1 class="arena-title">Enter the Arena</h1>
      <p class="arena-lead">
        Provide your Hunter Licence number to register for a fight.
        Your licence is issued at the end of Water Divination.
      </p>

      <div class="licence-form">
        <label class="input-label" for="licence">Hunter Licence Number</label>
        <input id="licence" v-model="licenceInput" class="licence-input" type="text"
          placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" spellcheck="false" autocomplete="off"
          @keydown.enter="enter" />
        <label class="input-label" for="pin">PIN</label>
        <input id="pin" v-model="pinInput" class="licence-input pin-input" type="text" inputmode="numeric"
          placeholder="6-digit PIN" maxlength="6" pattern="[0-9]{6}" autocomplete="off" spellcheck="false"
          @keydown.enter="enter" />
        <p v-if="error" class="input-error">{{ error }}</p>
        <button class="enter-btn" :disabled="loading || !licenceInput.trim() || pinInput.length !== 6" @click="enter">
          <span v-if="loading" class="btn-spinner" />
          <span v-else>Enter Arena</span>
        </button>
      </div>

      <div class="divination-cta">
        <span class="cta-text">Don't have a Hunter Licence?</span>
        <NuxtLink to="/" class="cta-link">Take Water Divination</NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useArena } from '~/composables/useArena'

useHead({ title: 'Enter Arena - HxH Arena' })

const router = useRouter()
const { verifyCharacter } = useArena()

const licenceInput = ref('')
const pinInput = ref('')
const loading = ref(false)
const error = ref('')

async function enter() {
  const id = licenceInput.value.trim()
  const pin = pinInput.value.trim()
  if (!id || pin.length !== 6) return
  loading.value = true
  error.value = ''
  try {
    const character = await verifyCharacter(id, pin)
    if (!character) {
      error.value = 'Invalid licence or PIN. Check your details and try again.'
      return
    }
    sessionStorage.setItem('hunter_licence', id)
    sessionStorage.setItem('hunter_token', pin)
    if (!character.stats_locked) {
      router.push('/arena/setup')
    } else {
      router.push('/arena/fight')
    }
  } catch {
    error.value = 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.page-root {
  min-height: 100vh;
  background: var(--hxh-bg-deep);
  color: var(--hxh-text-primary);
  position: relative;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

.arena-main {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  text-align: center;
}

.arena-tag {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  color: rgba(184, 36, 75, 0.8);
  margin-bottom: 12px;
}

.arena-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 7vw, 5rem);
  letter-spacing: 0.08em;
  color: var(--hxh-text-primary);
  margin-bottom: 16px;
  line-height: 1;
}

.arena-lead {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: rgba(220, 220, 220, 0.55);
  max-width: 420px;
  line-height: 1.65;
  margin-bottom: 48px;
}

.licence-form {
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 32px;
}

.input-label {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(220, 220, 220, 0.5);
  text-align: left;
}

.licence-input {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  padding: 14px 16px;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--hxh-text-primary);
  outline: none;
  transition: border-color 0.2s;
  letter-spacing: 0.04em;
}

.pin-input {
  max-width: 180px;
  text-align: center;
  letter-spacing: 0.3em;
  font-size: 1.1rem;
}

.licence-input::placeholder {
  color: rgba(220, 220, 220, 0.2);
}

.licence-input:focus {
  border-color: rgba(184, 36, 75, 0.5);
}

.input-error {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: rgba(232, 66, 10, 0.9);
  text-align: left;
  margin: 0;
}

.enter-btn {
  background: #b8244b;
  border: none;
  border-radius: 4px;
  padding: 14px;
  font-family: var(--font-heading);
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #fff;
  cursor: pointer;
  transition: opacity 0.2s, background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
}

.enter-btn:hover:not(:disabled) {
  background: #d42a56;
}

.enter-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.divination-cta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-body);
  font-size: 0.85rem;
}

.cta-text {
  color: rgba(220, 220, 220, 0.4);
}

.cta-link {
  color: rgba(184, 36, 75, 0.9);
  text-decoration: none;
  border-bottom: 1px solid rgba(184, 36, 75, 0.3);
  transition: color 0.2s;
}

.cta-link:hover {
  color: #d42a56;
}
</style>

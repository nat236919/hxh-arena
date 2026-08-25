<template>
  <div class="page-root">
    <ArenaBackground />
    <ArenaHeader back-to="/" back-label="HxH Arena" />

    <main class="arena-main">
      <p class="arena-tag">HEAVENS ARENA</p>
      <h1 class="arena-title">Enter the Arena</h1>

      <!-- Hunter Licence Card -->
      <div class="card-scene" :class="{ 'card-scene--flipped': flipped }">
        <!-- Front: logo + inputs -->
        <div class="card card-front">
          <div class="card-top">
            <div class="card-logo-area">
              <!-- HxH double-X mark -->
              <svg class="hxh-x" viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
                <!-- Left X -->
                <line x1="2" y1="2" x2="34" y2="58" stroke="white" stroke-width="7" stroke-linecap="round" />
                <line x1="34" y1="2" x2="2" y2="58" stroke="white" stroke-width="7" stroke-linecap="round" />
                <!-- Right X -->
                <line x1="46" y1="2" x2="78" y2="58" stroke="white" stroke-width="7" stroke-linecap="round" />
                <line x1="78" y1="2" x2="46" y2="58" stroke="white" stroke-width="7" stroke-linecap="round" />
                <!-- Red diamond -->
                <polygon points="40,14 48,30 40,46 32,30" fill="#b8244b" />
              </svg>
              <span class="card-association">HUNTER ASSOCIATION</span>
            </div>
          </div>

          <div class="card-barcode-row">
            <div class="card-barcode">
              <span v-for="w in barcodeWidths" :key="w.key" class="bar" :style="{ width: w.w + 'px' }" />
            </div>
          </div>

          <div class="card-bottom">
            <div class="card-field">
              <label class="card-field-label" for="licence">LICENCE NO.</label>
              <input id="licence" v-model="licenceInput" class="card-input card-input--uuid" type="text"
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" spellcheck="false" autocomplete="off"
                @keydown.enter="enter" />
            </div>
            <div class="card-field card-field--pin">
              <label class="card-field-label" for="pin">PIN</label>
              <input id="pin" v-model="pinInput" class="card-input card-input--pin" type="text" inputmode="numeric"
                placeholder="000000" maxlength="6" pattern="[0-9]{6}" autocomplete="off" spellcheck="false"
                @keydown.enter="enter" />
            </div>

            <p v-if="error" class="card-error">{{ error }}</p>

            <button class="card-enter-btn" :disabled="loading || !licenceInput.trim() || pinInput.length !== 6"
              @click="enter">
              <span v-if="loading" class="btn-spinner" />
              <span v-else>ENTER ARENA</span>
            </button>
          </div>
        </div>

        <!-- Back: magnetic stripe side (decorative, shown during flip) -->
        <div class="card card-back">
          <div class="card-back-stripe" />
          <div class="card-back-number">{{ licenceInput || 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX' }}</div>
        </div>
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
const flipped = ref(false)

// Deterministic-looking barcode widths (seeded pattern, not random per render)
const barcodeWidths = (() => {
  const pattern = [1, 2, 1, 1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2, 1, 2, 1, 3, 1, 1, 2, 1, 1, 2, 1, 3, 1, 2, 1, 1, 2, 1, 1, 3, 1, 2, 1, 1, 2, 1]
  return pattern.map((w, i) => ({ key: i, w }))
})()

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
    // Brief flip animation before navigating
    flipped.value = true
    sessionStorage.setItem('hunter_licence', id)
    sessionStorage.setItem('hunter_token', pin)
    await new Promise(r => setTimeout(r, 600))
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
  padding: 48px 24px 64px;
  text-align: center;
}

.arena-tag {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  color: rgba(184, 36, 75, 0.8);
  margin-bottom: 10px;
}

.arena-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 6vw, 4.5rem);
  letter-spacing: 0.08em;
  color: var(--hxh-text-primary);
  margin-bottom: 36px;
  line-height: 1;
}

/* ── Card 3-D scene ─────────────────────────────────────── */

.card-scene {
  width: 360px;
  max-width: calc(100vw - 40px);
  height: 440px;
  perspective: 1000px;
  margin-bottom: 32px;
}

.card {
  position: absolute;
  inset: 0;
  border-radius: 14px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Front */
.card-front {
  background: #161214;
  display: flex;
  flex-direction: column;
  transform: rotateY(0deg);
  border: 1px solid rgba(184, 36, 75, 0.4);
  box-shadow:
    0 0 0 1px rgba(184, 36, 75, 0.15),
    0 0 32px rgba(184, 36, 75, 0.18),
    0 32px 80px rgba(0, 0, 0, 0.75);
}

.card-scene--flipped .card-front {
  transform: rotateY(180deg);
}

/* Back */
.card-back {
  background: #b5cce0;
  transform: rotateY(-180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.card-scene--flipped .card-back {
  transform: rotateY(0deg);
}

/* ── Card front sections ──────────────────────────────── */

.card-top {
  flex: 0 0 auto;
  background: linear-gradient(160deg, #1e1018 0%, #120c0e 60%, #0e0a10 100%);
  border-radius: 14px 14px 0 0;
  padding: 0 24px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(184, 36, 75, 0.25);
  position: relative;
  overflow: hidden;
}

/* Red top accent stripe */
.card-top::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #b8244b;
  border-radius: 14px 14px 0 0;
}

/* Subtle aura glow behind the X */
.card-top::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  width: 180px;
  height: 120px;
  background: radial-gradient(ellipse, rgba(184, 36, 75, 0.12) 0%, transparent 70%);
  pointer-events: none;
}

.card-logo-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-top: 22px;
  position: relative;
  z-index: 1;
}

.card-logo-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.hxh-x {
  width: 100px;
  height: 75px;
  filter: drop-shadow(0 0 12px rgba(184, 36, 75, 0.7)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.8));
}

.card-association {
  font-family: var(--font-heading);
  font-size: 0.58rem;
  letter-spacing: 0.28em;
  color: rgba(255, 255, 255, 0.55);
  text-transform: uppercase;
}

.card-barcode-row {
  background: #0e0a10;
  padding: 10px 24px 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(184, 36, 75, 0.2);
}

.card-barcode {
  display: flex;
  align-items: stretch;
  gap: 1.5px;
  height: 36px;
}

.bar {
  background: #fff;
  border-radius: 0.5px;
  flex-shrink: 0;
  opacity: 0.85;
}

/* Every other bar is slightly taller for realism */
.bar:nth-child(even) {
  margin-top: 3px;
  height: calc(100% - 3px);
  opacity: 0.55;
}

/* ── Card bottom (form area) ──────────────────────────── */

.card-bottom {
  flex: 1;
  background: #f0ebe2;
  border-radius: 0 0 14px 14px;
  padding: 16px 20px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: stretch;
}

.card-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
}

.card-field-label {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: #5a4f45;
  text-transform: uppercase;
}

.card-input {
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 9px 12px;
  font-family: var(--font-body);
  font-size: 0.78rem;
  color: #1a1410;
  outline: none;
  transition: border-color 0.2s;
  letter-spacing: 0.03em;
}

.card-input::placeholder {
  color: rgba(0, 0, 0, 0.25);
}

.card-input:focus {
  border-color: rgba(184, 36, 75, 0.5);
  background: rgba(0, 0, 0, 0.03);
}

.card-input--pin {
  max-width: 120px;
  text-align: center;
  letter-spacing: 0.35em;
  font-size: 1rem;
}

.card-error {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: #c0392b;
  margin: 0;
  text-align: left;
}

.card-enter-btn {
  background: #b8244b;
  border: none;
  border-radius: 4px;
  padding: 12px;
  font-family: var(--font-heading);
  font-size: 0.82rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #fff;
  cursor: pointer;
  transition: opacity 0.2s, background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  margin-top: auto;
}

.card-enter-btn:hover:not(:disabled) {
  background: #d42a56;
}

.card-enter-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-spinner {
  width: 14px;
  height: 14px;
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

/* ── Card back ────────────────────────────────────────── */

.card-back-stripe {
  width: 100%;
  height: 48px;
  background: #1a1a1a;
  position: absolute;
  top: 52px;
}

.card-back-number {
  position: absolute;
  bottom: 36px;
  left: 0;
  right: 0;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: var(--font-body);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  color: #1a1410;
  text-align: center;
  padding: 0 24px;
  opacity: 0.7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Footer CTA ───────────────────────────────────────── */

.divination-cta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-body);
  font-size: 0.85rem;
}

.cta-text {
  color: var(--hxh-text-muted);
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

/* ── Light theme overrides ────────────────────────────── */

[data-theme="light"] .card-front {
  background: #1a1410;
  border-color: rgba(184, 36, 75, 0.5);
  box-shadow:
    0 0 0 1px rgba(184, 36, 75, 0.2),
    0 0 24px rgba(184, 36, 75, 0.15),
    0 24px 64px rgba(0, 0, 0, 0.3);
}

[data-theme="light"] .card-top {
  background: linear-gradient(160deg, #1e1018 0%, #120c0e 60%, #0e0a10 100%);
}

[data-theme="light"] .card-barcode-row {
  background: #0e0a10;
}
</style>

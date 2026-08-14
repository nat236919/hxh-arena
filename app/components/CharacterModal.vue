<template>
  <Transition name="modal-fade">
    <div v-if="profile" class="modal-backdrop" @click.self="emit('close')">
      <div class="modal-box" :style="{ '--tc': nenColor, '--tg': glowColor }">
        <div class="modal-accent" :style="{ background: nenColor }" />
        <button class="modal-close" @click="emit('close')">×</button>

        <div class="modal-header">
          <div class="modal-portrait-wrap" :style="{ borderColor: `${nenColor}80` }">
            <img v-if="profile.portrait" :src="profile.portrait" :alt="profile.name" class="modal-portrait" />
            <div v-else class="modal-portrait-placeholder" :style="{ background: `${nenColor}20`, color: nenColor }">
              {{ profile.name[0] }}
            </div>
            <div class="modal-portrait-glow" :style="{ background: glowColor }" />
          </div>
          <div class="modal-identity">
            <p class="modal-title-label" :style="{ color: nenColor }">{{ profile.title }}</p>
            <h2 class="modal-char-name">{{ profile.name }}</h2>
          </div>
        </div>

        <div class="modal-divider" :style="{ borderColor: `${nenColor}40` }" />

        <div class="abilities-list">
          <div v-for="ability in profile.abilities" :key="ability.name" class="ability-item"
            :style="{ borderColor: `${nenColor}60` }">
            <p class="ability-name" :style="{ color: nenColor }">{{ ability.name }}</p>
            <p class="ability-desc">{{ ability.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { CharacterProfile } from '~/data/nenTypes'

defineProps<{
  profile: CharacterProfile | null
  nenColor: string
  glowColor: string
}>()

const emit = defineEmits<{ close: [] }>()
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
}

.modal-box {
  position: relative;
  background: var(--hxh-bg-mid);
  border: 1px solid var(--hxh-border-subtle);
  border-radius: 6px;
  max-width: 420px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 0 40px var(--tg), 0 16px 48px rgba(0, 0, 0, 0.8);
  animation: modal-slide-in 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modal-slide-in {
  from {
    transform: translateY(12px) scale(0.97);
    opacity: 0;
  }

  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.modal-accent {
  height: 3px;
  width: 100%;
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 16px;
  background: transparent;
  border: none;
  color: var(--hxh-text-muted);
  font-size: 1.2rem;
  cursor: pointer;
  line-height: 1;
  padding: 4px 6px;
  transition: color 0.2s;
}

.modal-close:hover {
  color: var(--hxh-text-primary);
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px 12px;
}

.modal-portrait-wrap {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 4px;
  border: 2px solid;
  overflow: hidden;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.4);
}

.modal-portrait {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.modal-portrait-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 2rem;
}

.modal-portrait-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  opacity: 0.3;
}

.modal-identity {
  flex: 1;
  min-width: 0;
}

.modal-title-label {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin: 0 0 4px;
  display: block;
}

.modal-char-name {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--hxh-text-primary);
  margin: 0;
  letter-spacing: 0.05em;
  line-height: 1.1;
}

.modal-divider {
  border: none;
  border-top: 1px solid;
  margin: 0 0 16px;
}

.abilities-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 20px 20px;
}

.ability-item {
  border-left: 2px solid;
  padding-left: 12px;
}

.ability-name {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  margin: 0 0 3px;
}

.ability-desc {
  font-family: var(--font-body);
  font-size: 0.82rem;
  color: var(--hxh-text-secondary);
  margin: 0;
  line-height: 1.55;
}
</style>

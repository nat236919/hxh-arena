<template>
  <section class="detail-column stage-4">
    <div ref="cardEl" class="share-card" :style="{ '--tc': nenType?.color, '--tg': nenType?.glowColor }">
      <div class="card-accent" :style="{ background: nenType?.color }" />
      <div class="card-inner">
        <div class="card-header-row">
          <span class="card-jp-small" :style="{ color: nenType?.color }">{{ nenType?.japaneseName }}</span>
          <span class="card-brand">HxH Arena</span>
        </div>
        <div class="card-type-name" :style="{ color: nenType?.color }">{{ nenType?.name }}</div>
        <div class="radar-wrap">
          <p class="radar-label">Nen Aptitude</p>
          <div class="radar-chart">
            <Radar v-if="chartData" :data="chartData" :options="chartOptions" />
          </div>
        </div>
      </div>
    </div>

    <div class="share-row">
      <button class="share-btn" :class="{ 'share-btn--loading': sharing === 'download' }" :disabled="!!sharing"
        @click="emit('share', 'download')">
        <svg class="share-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        {{ sharing === 'download' ? 'Saving...' : 'Save Image' }}
      </button>
      <button class="share-btn" :class="{ 'share-btn--loading': sharing === 'copy' }" :disabled="!!sharing"
        @click="emit('share', 'copy')">
        <svg class="share-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        {{ sharing === 'copy' ? 'Copied!' : 'Copy Image' }}
      </button>
    </div>

    <div class="characters-block">
      <div class="characters-header">
        <span class="chars-label">Hunters with this type</span>
        <span class="chars-accent" :style="{ background: `${nenType?.color}50`, color: nenType?.color }">
          {{ nenType?.characterProfiles.length }}
        </span>
      </div>
      <div class="characters-list">
        <button v-for="profile in nenType?.characterProfiles" :key="profile.name" class="char-row"
          @click="emit('open-profile', profile)">
          <div class="char-portrait-wrap" :style="{ borderColor: `${nenType?.color}60` }">
            <img v-if="profile.portrait" :src="profile.portrait" :alt="profile.name" class="char-portrait"
              loading="lazy" />
            <div v-else class="char-portrait-placeholder" :style="{ background: `${nenType?.color}20` }">
              <span :style="{ color: nenType?.color }">{{ profile.name[0] }}</span>
            </div>
          </div>
          <div class="char-info">
            <span class="char-name" :style="{ color: nenType?.color }">{{ profile.name }}</span>
            <span class="char-title">{{ profile.title }}</span>
          </div>
          <span class="char-arrow">›</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Radar } from 'vue-chartjs'
import type { CharacterProfile } from '~/data/nenTypes'

const props = defineProps<{
  nenType: any
  chartData: any
  chartOptions: any
  sharing: 'download' | 'copy' | false
}>()

const emit = defineEmits<{
  share: [mode: 'download' | 'copy']
  'open-profile': [profile: CharacterProfile]
}>()

const cardEl = ref<HTMLElement | null>(null)

defineExpose({ cardEl })
</script>

<style scoped>
.detail-column {
  flex: 1;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.share-card {
  background: var(--hxh-bg-mid);
  border: 1px solid var(--hxh-border-subtle);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 40px var(--tg), 0 8px 32px rgba(0, 0, 0, 0.6);
}

.card-accent {
  height: 3px;
  width: 100%;
}

.card-inner {
  padding: 20px;
}

.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.card-jp-small {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  opacity: 0.7;
}

.card-brand {
  font-family: var(--font-heading);
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--hxh-text-muted);
}

.card-type-name {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  color: var(--tc);
  margin-bottom: 16px;
}

.radar-label {
  font-family: var(--font-heading);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--hxh-text-muted);
  margin-bottom: 8px;
}

.radar-chart {
  width: 220px;
  height: 220px;
  margin: 0 auto;
}

.share-row {
  display: flex;
  gap: 10px;
}

.share-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 11px 14px;
  background: var(--hxh-bg-surface);
  border: 1px solid var(--hxh-border-mid);
  border-radius: 4px;
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--hxh-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.share-btn:not(:disabled):hover {
  color: var(--hxh-text-primary);
  background: var(--hxh-bg-mid);
}

.share-btn:disabled {
  opacity: 0.4;
  cursor: default;
}

.share-icon {
  width: 14px;
  height: 14px;
}

.characters-block {
  background: var(--hxh-bg-surface);
  border: 1px solid var(--hxh-border-subtle);
  border-radius: 6px;
  overflow: hidden;
}

.characters-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px 10px;
  border-bottom: 1px solid var(--hxh-border-subtle);
}

.chars-label {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--hxh-text-muted);
}

.chars-accent {
  font-family: var(--font-heading);
  font-size: 0.68rem;
  padding: 2px 8px;
  border-radius: 2px;
}

.characters-list {
  display: flex;
  flex-direction: column;
}

.char-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  border-bottom: 1px solid var(--hxh-border-subtle);
  transition: background 0.2s;
  width: 100%;
}

.char-row:last-child {
  border-bottom: none;
}

.char-row:hover {
  background: var(--hxh-bg-card);
}

.char-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.char-name {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.char-title {
  font-family: var(--font-body);
  font-size: 0.72rem;
  color: var(--hxh-text-muted);
}

.char-arrow {
  color: var(--hxh-text-muted);
  font-size: 1.1rem;
  line-height: 1;
}

.char-portrait-wrap {
  width: 44px;
  height: 44px;
  border-radius: 4px;
  border: 1px solid;
  overflow: hidden;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.3);
}

.char-portrait {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.char-portrait-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 1.2rem;
}
</style>

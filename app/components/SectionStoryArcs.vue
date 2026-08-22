<template>
  <section id="story" class="page-section section-story">
    <div class="section-inner">
      <div class="section-heading-row">
        <span class="section-number">03</span>
        <div class="section-title-block">
          <h2 class="section-title">Story Arcs</h2>
          <p class="section-subtitle">物語の流れ · The Journey of Gon Freecss</p>
        </div>
      </div>

      <div class="arcs-grid">
        <div v-for="arc in storyArcs" :key="arc.id" class="arc-card"
          :style="{ '--arc-color': arc.color, borderColor: `${arc.color}30` }">
          <div class="arc-accent" :style="{ background: arc.color }" />
          <div class="arc-body">
            <div class="arc-meta-row">
              <span class="arc-number" :style="{ color: arc.color }">Arc {{ arc.number }}</span>
              <span class="arc-chapters">Ch. {{ arc.chapters }}</span>
              <span v-if="arc.episodes !== 'N/A (manga only)'" class="arc-eps">Ep. {{ arc.episodes }}</span>
              <span v-else class="arc-eps arc-eps--manga">Manga only</span>
            </div>
            <h3 class="arc-name">{{ arc.name }}</h3>
            <p class="arc-jp" :style="{ color: arc.color }">{{ arc.japaneseName }}</p>
            <p class="arc-summary">{{ arc.summary }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storyArcs } from '~/data/storyArcs'
</script>

<style scoped>
.page-section {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  padding-top: 64px;
  display: flex;
  flex-direction: column;
}

.section-inner {
  flex: 1;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  padding: 60px 32px 80px;
  box-sizing: border-box;
}

.section-heading-row {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 48px;
}

.section-number {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  color: rgba(184, 36, 75, 0.12);
  line-height: 1;
  letter-spacing: -0.02em;
  flex-shrink: 0;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 900;
  color: var(--hxh-text-primary);
  letter-spacing: 0.06em;
  margin: 0 0 4px;
  line-height: 1;
}

.section-subtitle {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--hxh-text-muted);
  margin: 0;
}

.arcs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.arc-card {
  position: relative;
  background: var(--hxh-bg-surface);
  border: 1px solid;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.arc-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px color-mix(in srgb, var(--arc-color) 15%, transparent);
}

.arc-accent {
  height: 3px;
  width: 100%;
}

.arc-body {
  padding: 18px 20px 20px;
}

.arc-meta-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.arc-number {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.arc-chapters,
.arc-eps {
  font-family: var(--font-heading);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  color: var(--hxh-text-muted);
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 7px;
  border-radius: 2px;
}

.arc-eps--manga {
  color: rgba(184, 36, 75, 0.6);
  background: rgba(184, 36, 75, 0.08);
}

.arc-name {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 900;
  color: var(--hxh-text-primary);
  letter-spacing: 0.05em;
  margin: 0 0 2px;
}

.arc-jp {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  margin: 0 0 10px;
  opacity: 0.7;
}

.arc-summary {
  font-family: var(--font-body);
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--hxh-text-secondary);
  margin: 0;
}

@media (max-width: 640px) {
  .section-inner {
    padding: 40px 18px 60px;
  }

  .arcs-grid {
    grid-template-columns: 1fr;
  }
}
</style>

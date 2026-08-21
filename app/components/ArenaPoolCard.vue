<template>
  <button class="pool-card" :class="{ 'pool-card--disabled': disabled }" :disabled="disabled" @click="emit('select')">
    <div class="pool-icon" aria-hidden="true">
      <slot name="icon" />
    </div>
    <span class="pool-name">{{ name }}</span>
    <span class="pool-desc">{{ description }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  description: string
  disabled?: boolean
}>()

const emit = defineEmits<{ select: [] }>()
</script>

<style scoped>
.pool-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 20px 22px;
  cursor: pointer;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  transition: border-color 0.2s, background 0.2s;
}

.pool-card:hover:not(:disabled) {
  border-color: rgba(184, 36, 75, 0.4);
  background: rgba(184, 36, 75, 0.05);
}

.pool-card--disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.pool-icon {
  margin-bottom: 4px;
  color: rgba(220, 220, 220, 0.5);
  display: flex;
  align-items: center;
}

.pool-icon :deep(svg) {
  width: 18px;
  height: 18px;
}

.pool-name {
  font-family: var(--font-heading);
  font-size: 1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(220, 220, 220, 0.9);
}

.pool-desc {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: rgba(220, 220, 220, 0.4);
}
</style>

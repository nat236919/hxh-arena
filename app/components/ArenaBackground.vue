<template>
  <div class="aura-field" aria-hidden="true">
    <div class="aura-orb aura-orb--red" />
    <div class="aura-orb aura-orb--gold" />
  </div>
  <div class="scanline-overlay" aria-hidden="true" />
</template>

<style scoped>
.aura-field {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.aura-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.1;
}

.aura-orb--red {
  width: 500px;
  height: 500px;
  background: #b8244b;
  top: -100px;
  left: -100px;
}

.aura-orb--gold {
  width: 400px;
  height: 400px;
  background: #e8a000;
  bottom: 0;
  right: -80px;
}

.scanline-overlay {
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.03) 2px,
      rgba(0, 0, 0, 0.03) 4px);
  pointer-events: none;
  z-index: 1;
}
</style>

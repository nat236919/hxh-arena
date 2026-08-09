import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    alias: {
      '~': resolve(import.meta.dirname, './app'),
    },
  },
})

const isDark = ref(true)

export function useTheme() {
  function applyTheme(dark: boolean) {
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
      localStorage.setItem('hxh-theme', dark ? 'dark' : 'light')
    }
  }

  function toggle() {
    isDark.value = !isDark.value
    applyTheme(isDark.value)
  }

  function init() {
    if (!import.meta.client) return
    const saved = localStorage.getItem('hxh-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = saved ? saved === 'dark' : prefersDark
    applyTheme(isDark.value)
  }

  return { isDark, toggle, init }
}

<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { isDark, page } = useData()
const isHome = computed(() => page.value.frontmatter.layout === 'home')

function toggleDark() {
  const html = document.documentElement
  const next = !html.classList.contains('dark')
  html.classList.toggle('dark', next)
  localStorage.setItem('vitepress-theme-appearance', next ? 'dark' : 'light')
}
</script>

<template>
  <div v-if="isHome" class="home-header">
    <a
      href="https://github.com/Y1teng"
      target="_blank"
      rel="noopener"
      class="header-icon"
      aria-label="GitHub"
    >
      <svg viewBox="0 0 16 16" width="22" height="22" fill="currentColor">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
          0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
          -.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2
          -3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82
          .64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08
          2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01
          1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
      </svg>
    </a>

    <button @click="toggleDark" class="header-icon" :aria-label="isDark ? 'ライトモード' : 'ダークモード'">
      <svg v-if="isDark" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26
          5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
      </svg>
      <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-5a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V3
          a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zM4.22 4.22a1 1 0
          0 1 1.42 0l1.41 1.41a1 1 0 0 1-1.41 1.42L4.22 5.64a1 1 0 0 1 0-1.42zm13.14 13.14a1 1
          0 0 1 1.42 0l1.41 1.41a1 1 0 0 1-1.42 1.42l-1.41-1.42a1 1 0 0 1 0-1.41zM1 11h2a1 1
          0 0 1 0 2H1a1 1 0 0 1 0-2zm20 0h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2zM4.22 19.78a1 1 0
          0 1 0-1.42l1.41-1.41a1 1 0 0 1 1.42 1.41l-1.42 1.42a1 1 0 0 1-1.41 0zm13.14-13.14a1
          1 0 0 1 0-1.41l1.42-1.42a1 1 0 0 1 1.41 1.42l-1.41 1.41a1 1 0 0 1-1.42 0z"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.home-header {
  position: fixed;
  top: 16px;
  right: 20px;
  z-index: 100;
  display: flex;
  gap: 8px;
  align-items: center;
}

.header-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  color: #c8d4e8;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.header-icon:hover {
  background: rgba(255, 255, 255, 0.18);
  color: #ffffff;
}
</style>

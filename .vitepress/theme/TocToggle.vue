<script setup>
import { ref, shallowRef, computed, onMounted } from 'vue'
import { useData, withBase, onContentUpdated } from 'vitepress'

const { page, theme } = useData()
const isOpen = ref(false)
const headers = shallowRef([])

const isHome = computed(() => page.value.frontmatter.layout === 'home')

// サイドバーのグループをthemeから直接取得（useSidebarはモバイルで空になるため）
const sidebarGroups = computed(() => {
  const sidebar = theme.value.sidebar
  if (!sidebar) return []
  const path = '/' + page.value.relativePath.replace(/\.md$/, '').replace(/\/index$/, '')
  for (const key of Object.keys(sidebar)) {
    if (path.startsWith(key.replace(/\/$/, ''))) {
      return sidebar[key]
    }
  }
  return []
})

const clean = (s) => s.replace(/\/$/, '').replace(/\/index$/, '')

const isCurrentPage = (link) => {
  if (!link) return false
  const current = clean('/' + page.value.relativePath.replace(/\.md$/, ''))
  return current === clean(link)
}

// ページ内見出し
const scanHeaders = () => {
  const els = document.querySelectorAll('.vp-doc h2, .vp-doc h3')
  headers.value = Array.from(els).map(el => ({
    title: el.textContent?.replace(/\s*#\s*$/, '').trim() ?? '',
    slug: el.id,
    level: parseInt(el.tagName[1])
  }))
}

const scrollTo = (slug) => {
  isOpen.value = false
  const el = document.getElementById(slug)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    history.replaceState(null, '', '#' + slug)
  }
}

const toggle = () => { isOpen.value = !isOpen.value }
const close = () => { isOpen.value = false }

onMounted(() => scanHeaders())
onContentUpdated(() => { scanHeaders(); close() })
</script>

<template>
  <div v-if="!isHome" class="toc-wrap">
    <button @click="toggle" class="toc-btn" aria-label="目次">
      <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
        <rect x="2" y="4" width="16" height="2" rx="1"/>
        <rect x="2" y="9" width="12" height="2" rx="1"/>
        <rect x="2" y="14" width="14" height="2" rx="1"/>
      </svg>
    </button>

    <Transition name="toc-fade">
      <div v-if="isOpen" class="toc-panel">
        <div v-for="group in sidebarGroups" :key="group.text" class="toc-group">
          <div v-if="group.text" class="toc-group-title">{{ group.text }}</div>
          <template v-for="item in group.items" :key="item.link">
            <a
              :href="withBase(item.link)"
              class="toc-nav-item"
              :class="{ active: isCurrentPage(item.link) }"
              @click="close"
            >{{ item.text }}</a>
            <template v-if="isCurrentPage(item.link) && headers.length">
              <div class="toc-on-this-page">ON THIS PAGE</div>
              <div
                v-for="h in headers"
                :key="h.slug"
                class="toc-heading"
                :class="`level-${h.level}`"
                @click="scrollTo(h.slug)"
              >{{ h.title }}</div>
            </template>
          </template>
        </div>
      </div>
    </Transition>

    <div v-if="isOpen" class="toc-backdrop" @click="close" />
  </div>
</template>

<style scoped>
.toc-wrap { display: none; }

@media (max-width: 959px) {
  .toc-wrap { display: block; }
}

.toc-btn {
  position: fixed;
  top: calc(var(--vp-nav-height, 64px) + 10px);
  left: 10px;
  z-index: 51;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: background 0.2s;
}

.toc-btn:hover { background: var(--vp-c-bg-soft); }

.toc-panel {
  position: fixed;
  top: calc(var(--vp-nav-height, 64px) + 52px);
  left: 10px;
  z-index: 50;
  width: 240px;
  max-height: 70vh;
  overflow-y: auto;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  padding: 8px 0;
}

.toc-group-title {
  padding: 6px 14px 4px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.toc-nav-item {
  display: block;
  padding: 5px 14px;
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.15s;
}

.toc-nav-item:hover { color: var(--vp-c-brand); }
.toc-nav-item.active { color: var(--vp-c-brand); font-weight: 500; }

.toc-on-this-page {
  padding: 8px 14px 4px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-3);
  border-top: 1px solid var(--vp-c-divider);
  margin-top: 4px;
}

.toc-heading {
  padding: 4px 14px;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: color 0.15s;
}

.toc-heading:hover { color: var(--vp-c-brand); }
.toc-heading.level-3 { padding-left: 24px; font-size: 0.78rem; }

.toc-backdrop {
  position: fixed;
  inset: 0;
  z-index: 49;
}

.toc-fade-enter-active,
.toc-fade-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}
.toc-fade-enter-from,
.toc-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>

<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { useSidebar } from 'vitepress/theme'
import SidebarOutline from './SidebarOutline.vue'

const { sidebarGroups } = useSidebar()
const { page } = useData()

const clean = (s) => s.replace(/\/$/, '').replace(/\/index$/, '')

const isCurrentPage = (link) => {
  if (!link) return false
  const current = clean('/' + page.value.relativePath.replace(/\.md$/, ''))
  return current === clean(link)
}
</script>

<template>
  <div class="custom-nav">
    <div v-for="group in sidebarGroups" :key="group.text ?? 'group'" class="nav-group">
      <p v-if="group.text" class="nav-group-title">{{ group.text }}</p>
      <template v-for="item in group.items" :key="item.link">
        <a :href="withBase(item.link)" class="nav-item" :class="{ active: isCurrentPage(item.link) }">
          {{ item.text }}
        </a>
        <Transition name="outline-expand">
          <div v-if="isCurrentPage(item.link)" class="outline-wrapper">
            <SidebarOutline />
          </div>
        </Transition>
      </template>
    </div>
  </div>
</template>

<style scoped>
.custom-nav {
  padding: 0;
}

.nav-group {
  margin-bottom: 4px;
}

.nav-group-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #a0b4d0;
  margin: 12px 0 4px;
  padding: 0 4px;
}

.nav-item {
  display: block;
  padding: 4px 4px;
  font-size: 0.9rem;
  color: #c8d4e8;
  text-decoration: none;
  border-radius: 4px;
  transition: color 0.2s;
}

.nav-item:hover {
  color: #ffffff;
}

.nav-item.active {
  color: #7eb3f5;
  font-weight: 500;
}

/* アコーディオン アニメーション */
.outline-expand-enter-active,
.outline-expand-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
  max-height: 600px;
}

.outline-expand-enter-from,
.outline-expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>

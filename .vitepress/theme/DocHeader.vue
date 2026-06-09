<script setup>
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'

const { page, theme } = useData()

const crumbs = computed(() => {
  const parts = page.value.relativePath.replace(/\.md$/, '').split('/')
  const result = [{ text: '42docs', link: '/' }]

  if (parts[0]) {
    const key = `/${parts[0]}/`
    const groupText = theme.value.sidebar?.[key]?.[0]?.text ?? parts[0]
    result.push({ text: groupText, link: key })
  }

  if (parts[1] && parts[1] !== 'index') {
    result.push({ text: page.value.title, link: null })
  }

  return result
})
</script>

<template>
  <nav class="breadcrumb">
    <template v-for="(crumb, i) in crumbs" :key="i">
      <span v-if="i > 0" class="sep">›</span>
      <a v-if="crumb.link" :href="withBase(crumb.link)" class="crumb-link">{{ crumb.text }}</a>
      <span v-else class="crumb-current">{{ crumb.text }}</span>
    </template>
  </nav>
</template>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 20px;
}

.sep { color: var(--vp-c-text-3); }

.crumb-link {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s;
}

.crumb-link:hover { color: var(--vp-c-brand); }

.crumb-current { color: var(--vp-c-text-1); }
</style>

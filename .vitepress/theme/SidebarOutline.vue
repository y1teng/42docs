<script setup>
import { onContentUpdated } from 'vitepress'
import { shallowRef, onMounted } from 'vue'

const headers = shallowRef([])

const scanHeaders = () => {
  const els = document.querySelectorAll('.vp-doc h2, .vp-doc h3')
  headers.value = Array.from(els).map(el => ({
    title: el.textContent?.replace(/\s*#\s*$/, '').trim() ?? '',
    slug: el.id,
    level: parseInt(el.tagName[1])
  }))
}

const scrollTo = (slug) => {
  const el = document.getElementById(slug)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    history.replaceState(null, '', '#' + slug)
  }
}

onMounted(() => scanHeaders())
onContentUpdated(() => scanHeaders())
</script>

<template>
  <div v-if="headers.length" class="sidebar-outline">
    <div class="sidebar-outline-title">On this page</div>
    <ul class="sidebar-outline-list">
      <li
        v-for="h in headers"
        :key="h.slug"
        :class="`level-${h.level}`"
      >
        <div class="outline-link" @click="scrollTo(h.slug)">
          {{ h.title }}
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar-outline {
  padding: 16px 16px 8px;
  border-top: 1px solid #2a3f60;
  margin-top: 8px;
}

.sidebar-outline-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #a0b4d0;
  margin-bottom: 8px;
}

.sidebar-outline-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-outline-list li {
  margin: 4px 0;
}

.sidebar-outline-list li.level-3 {
  padding-left: 12px;
}

.outline-link {
  display: block;
  font-size: 0.85rem;
  color: #c8d4e8;
  text-decoration: none;
  line-height: 1.5;
  transition: color 0.2s;
  cursor: pointer;
}

.outline-link:hover {
  color: #ffffff;
}
</style>

<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter } = useData()
const comment = computed(() => frontmatter.value.comment || '...')

const today = new Date().toLocaleDateString('ja-JP', {
  year: 'numeric', month: '2-digit', day: '2-digit'
})

const art = computed(() => {
  const c = comment.value
  // 全角文字は2幅、半角は1幅として長さを計算
  const len = [...c].reduce((n, ch) => n + (ch.charCodeAt(0) > 0xff ? 2 : 1), 0)
  const top = '￣'.repeat(Math.ceil(len / 2) + 2)
  const bot = '＿'.repeat(Math.ceil(len / 2) + 2)
  return [
    ` 　　　　Λ＿Λ　    ／${top}`,
    ` 　　　（>・∀・）＜　${c}`,
    ` 　 　＿φ＿＿⊂)＿ ＼${bot}`,
    ` 　 ／旦／三／ ／|`,
    `　 |￣￣￣￣￣|　|`,
    `　 |愛媛みかん|／`,
  ].join('\n')
})
</script>

<template>
  <div class="home-hero">
    <h1 class="hero-title">42docs</h1>
    <p class="hero-updated">{{ today }} 更新</p>
    <pre class="ascii-art">{{ art }}</pre>
  </div>
</template>

<style scoped>
.home-hero {
  padding: 48px 24px 24px;
  max-width: 960px;
  margin: 0 auto;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #e8edf5;
  margin: 0 0 8px;
}

.hero-updated {
  font-size: 0.85rem;
  color: #a0b4d0;
  margin: 0 0 24px;
}

.ascii-art {
  font-family: 'MS Gothic', 'Osaka-Mono', 'Noto Sans Mono CJK JP', monospace;
  font-size: 1rem;
  color: #c8d4e8;
  line-height: 1.8;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  white-space: pre;
}
</style>

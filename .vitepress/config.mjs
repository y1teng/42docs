import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function toTitle(filename) {
  return filename
    .replace(/\.md$/, '')
    .replace(/[-_]/g, ' ')
}

function getFrontmatterTitle(filePath) {
  if (!fs.existsSync(filePath)) return ''
  const content = fs.readFileSync(filePath, 'utf-8')
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!fmMatch) return ''
  const titleMatch = fmMatch[1].match(/^title:\s*(.+)$/m)
  return titleMatch ? titleMatch[1].trim() : ''
}

function getSidebarItems(section) {
  const sectionDir = path.resolve(__dirname, '..', section)
  if (!fs.existsSync(sectionDir)) return []

  return fs.readdirSync(sectionDir)
    .filter(file => file.endsWith('.md') && file !== 'index.md')
    .sort()
    .map(file => ({
      text: getFrontmatterTitle(path.join(sectionDir, file)) || toTitle(file),
      link: `/${section}/${file.replace(/\.md$/, '')}`,
    }))
}

const IGNORED = new Set(['.vitepress', '.git', 'node_modules'])

function getSections() {
  const root = path.resolve(__dirname, '..')
  return fs.readdirSync(root)
    .filter(name => {
      if (IGNORED.has(name)) return false
      const fullPath = path.join(root, name)
      return fs.statSync(fullPath).isDirectory() &&
        fs.readdirSync(fullPath).some(f => f.endsWith('.md'))
    })
    .sort()
}

function buildNav(sections) {
  return [
    { text: 'Home', link: '/' },
    ...sections.map(s => ({ text: s, link: `/${s}/` })),
  ]
}

function buildSidebar(sections) {
  return Object.fromEntries(
    sections.map(s => [
      `/${s}/`,
      [{ text: s, items: [{ text: 'Overview', link: `/${s}/` }, ...getSidebarItems(s)] }]
    ])
  )
}

function getSectionDescription(section) {
  const indexPath = path.resolve(__dirname, '..', section, 'index.md')
  if (!fs.existsSync(indexPath)) return ''
  const content = fs.readFileSync(indexPath, 'utf-8')
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!fmMatch) return ''
  const descMatch = fmMatch[1].match(/^description:\s*(.+)$/m)
  return descMatch ? descMatch[1].trim() : ''
}

const sections = getSections()

export default withMermaid(defineConfig({
  title: "42docs",
  description: "42Tokyoの課題ノート",
  base: '/42docs/',
  themeConfig: {
    nav: buildNav(sections),

    sidebar: buildSidebar(sections),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Y1teng' }
    ],

    search: {
      provider: 'local'
    }
  },

  transformPageData(pageData) {
    if (pageData.frontmatter.layout === 'home') {
      pageData.frontmatter.features = sections.map(s => ({
        title: s,
        details: getSectionDescription(s),
        link: `/${s}/`,
      }))
    }
  },
}))

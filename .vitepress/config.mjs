import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: "42docs",
  description: "42Tokyoの課題ノート",
  base: '/42docs/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: 'Projects',
        items: [
          { text: 'libft', link: '/libft/' },
          { text: 'ft_printf', link: '/ft_printf/' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Y1teng' }
    ]
  }
}))

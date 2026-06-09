import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: "42docs",
  description: "42Tokyoの課題ノート",
  base: '/42docs/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'libft', link: '/libft/' },
      { text: 'ft_printf', link: '/ft_printf/' },
    ],

    sidebar: {
      '/libft/': [
        {
          text: 'libft',
          items: [
            { text: 'Overview', link: '/libft/' },
          ]
        }
      ],
      '/ft_printf/': [
        {
          text: 'ft_printf',
          items: [
            { text: 'Overview', link: '/ft_printf/' },
            { text: 'man va_list', link: '/ft_printf/man_va' },
            { text: 'June-4-2026', link: '/ft_printf/June-4-2026' },
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Y1teng' }
    ],

    search: {
      provider: 'local'
    }
  }
}))

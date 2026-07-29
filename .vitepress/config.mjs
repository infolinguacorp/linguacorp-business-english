import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Business English A1',
  description: 'Curso completo de inglés de negocios nivel A1 - LinguaCorp',
  lang: 'es-CO',
  base: '/',
  srcDir: 'src',

  themeConfig: {
    logo: '/logo.png',
    siteTitle: false,
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Módulos', link: '/content/modulo-01/' }
    ],

    sidebar: [
      {
        text: '📘 Módulo 1: Saludos y Presentaciones',
        collapsed: false,
        items: [
          { text: 'Portada del módulo', link: '/content/modulo-01/' },
          { text: '1.1 Hola, ¿cómo estás?', link: '/content/modulo-01/sesion-1-1' },
          { text: '1.2 Presentaciones formales', link: '/content/modulo-01/sesion-1-2' },
          { text: '1.3 El verbo TO BE', link: '/content/modulo-01/sesion-1-3' },
          { text: '1.4 Práctica integrada', link: '/content/modulo-01/sesion-1-4' }
        ]
      }
    ],

    footer: {
      message: 'LinguaCorp — El mundo en tus manos',
      copyright: '© 2026 LinguaCorp. Todos los derechos reservados.'
    },

    search: { provider: 'local' }
  }
})

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cf: {
          bg:      '#0a0a0f',
          surface: '#0d0d14',
          border:  '#1e1e2e',
          hover:   '#141420',
          accent:  '#c8f135',
          red:     '#ff5f5f',
          blue:    '#60a5fa',
          amber:   '#f59e0b',
          text:    '#e8e6e0',
          muted:   '#555570',
          dim:     '#444460',
        },
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
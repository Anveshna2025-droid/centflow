/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        cf: {
          bg: 'var(--cf-bg)',
          surface: 'var(--cf-surface)',
          border: 'var(--cf-border)',
          hover: 'var(--cf-hover)',
          accent: 'var(--cf-accent)',
          accentGlow: 'var(--cf-accent-glow)',
          text: 'var(--cf-text)',
          muted: 'var(--cf-muted)',
          red: 'var(--cf-red)',
          green: 'var(--cf-green)',
        },
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 20px var(--cf-accent-glow)',
      }
    },
  },
  plugins: [],
}
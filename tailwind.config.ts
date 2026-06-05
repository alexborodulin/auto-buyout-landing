import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#f97316',
          dark: '#ea580c',
          light: '#fb923c',
          muted: '#ffedd5',
        },
        surface: {
          DEFAULT: '#0f172a',
          light: '#f8fafc',
          card: '#ffffff',
        },
      },
      borderRadius: {
        button: '0.5rem',
        card: '1rem',
        input: '0.5rem',
      },
      maxWidth: {
        content: '72rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config

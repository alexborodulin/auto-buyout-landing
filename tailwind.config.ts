import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#16a34a',
          dark: '#15803d',
          light: '#4ade80',
          muted: '#dcfce7',
        },
        surface: {
          DEFAULT: '#0f172a',
          light: '#f8fafc',
          card: '#ffffff',
        },
      },
      borderRadius: {
        menu: '40px',
        button: '24px',
        card: '24px',
        input: '24px',
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

import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#4f46e5'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
} satisfies Config
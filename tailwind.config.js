/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        heritage: {
          ivory: '#FAF7F2',
          sandstone: '#F4ECE1',
          sandstoneDark: '#E8DCC9',
          parchment: '#FDFBF7',
          border: '#E3D7C5',
          gold: {
            light: '#F5E4B2',
            DEFAULT: '#C59A27',
            dark: '#9E7815',
            antique: '#D4AF37',
            brass: '#B68B30'
          },
          green: {
            50: '#F0F6F2',
            100: '#DCECE1',
            200: '#B9DBC5',
            600: '#235D3F',
            700: '#1A4A32',
            800: '#143826',
            900: '#0E271B',
            darkest: '#0A1C13'
          },
          terracotta: {
            50: '#FDF4F0',
            100: '#FBE6DC',
            500: '#D9653B',
            DEFAULT: '#C85A32',
            dark: '#A64320'
          },
          charcoal: '#1F2421',
          slate: '#47554F',
          muted: '#718079'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        heritage: ['Rozha One', 'Cinzel', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'heritage-sm': '0 1px 3px rgba(20, 56, 38, 0.05), 0 1px 2px rgba(200, 90, 50, 0.03)',
        'heritage-md': '0 4px 16px -2px rgba(20, 56, 38, 0.07), 0 2px 6px -1px rgba(197, 154, 39, 0.08)',
        'heritage-lg': '0 10px 25px -5px rgba(20, 56, 38, 0.1), 0 8px 10px -6px rgba(197, 154, 39, 0.12)',
        'gold-glow': '0 0 20px -3px rgba(212, 175, 55, 0.35)',
        'green-glow': '0 0 20px -3px rgba(20, 56, 38, 0.45)'
      },
      backgroundImage: {
        'jaali-pattern': "radial-gradient(#C59A27 0.75px, transparent 0.75px), radial-gradient(#143826 0.75px, #FAF7F2 0.75px)",
      }
    },
  },
  plugins: [],
}

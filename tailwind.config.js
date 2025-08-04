/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d3ff',
          300: '#a5b4ff',
          400: '#818cff',
          500: '#6b5bff',
          600: '#5a3df5',
          700: '#4c2fd8',
          800: '#3f28b0',
          900: '#36248c',
        },
        mystic: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        night: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      animation: {
        'card-flip': 'cardFlip 0.6s ease-in-out',
        'card-shuffle': 'cardShuffle 0.8s ease-in-out',
        'cosmic-float': 'cosmicFloat 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        cardFlip: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(90deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        cardShuffle: {
          '0%': { transform: 'translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateX(-20px) rotate(-5deg)' },
          '50%': { transform: 'translateX(20px) rotate(5deg)' },
          '75%': { transform: 'translateX(-10px) rotate(-2deg)' },
          '100%': { transform: 'translateX(0) rotate(0deg)' },
        },
        cosmicFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.2)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(107, 91, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(107, 91, 255, 0.6)' },
        },
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'mystic-gradient': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'night-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        'stars': 'radial-gradient(2px 2px at 20px 30px, #eee, transparent), radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent), radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent), radial-gradient(2px 2px at 160px 30px, #ddd, transparent)',
      },
    },
  },
  plugins: [],
} 
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        sage: {
          50: '#f4f7f0',
          100: '#e5ecdc',
          200: '#cddabb',
          300: '#adc291',
          400: '#8da86a',
          500: '#6d8e4a',
          600: '#547138',
          700: '#42582c',
          800: '#364726',
          900: '#2d3b21',
          950: '#161e10',
        },
        earth: {
          50: '#faf7f2',
          100: '#f2ece0',
          200: '#e3d5bf',
          300: '#d0b895',
          400: '#bb9669',
          500: '#ac7f4f',
          600: '#9d6c43',
          700: '#835639',
          800: '#6b4532',
          900: '#573a2c',
          950: '#2f1d15',
        },
        cream: '#faf8f3',
        forest: '#1a2e1a',
        moss: '#4a5e3a',
        dew: '#e8f4e8',
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'grow': 'grow 1s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        grow: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
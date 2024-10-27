/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2bca43',
        },
        orange: '#F58D3D',
        mint: '#1BD0C8',
        blue: '#1D99E8',
        red: '#E54459',
        lime: '#A6D930',
        green: '#2BC267',
        gray: {
          DEFAULT: '#C4C4C4',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      keyframes: {
        moveUpDown: {
          '0%, 50%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-10px)' },
        },
        slideInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        popup: {
          '0%': { opacity: 0, transform: 'scale(0.8)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        popout: {
          '0%': { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(0.8)' },
        },
      },
      animation: {
        'updown-1': 'moveUpDown 2s infinite ease-in-out 0.1s',
        'updown-2': 'moveUpDown 2s infinite ease-in-out 0.3s',
        'updown-3': 'moveUpDown 2s infinite ease-in-out 0.5s',
        'updown-4': 'moveUpDown 2s infinite ease-in-out 0.7s',
        'updown-5': 'moveUpDown 2s infinite ease-in-out 0.9s',
        slideUp: 'slideInUp 0.5s ease-in-out',
        popup: 'popup 0.3s ease-in-out',
        popout: 'popout 0.3s ease-in-out forwards',
      },
    },
    fontFamily: {
      kor: [
        'Pretendard',
        'system-ui',
        '-apple-system',
        '"Noto Sans"',
        'sans-serif',
      ],
      eng: [
        'San Francisco',
        'Pretendard',
        '-apple-system',
        '"Noto Sans"',
        'sans-serif',
      ],
    },
    maxWidth: {
      375: '375px', // 모바일용
    },
  },
  plugins: [],
};

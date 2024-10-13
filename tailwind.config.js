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
      },
      animation: {
        'updown-1': 'moveUpDown 2s infinite ease-in-out 0.1s',
        'updown-2': 'moveUpDown 2s infinite ease-in-out 0.3s',
        'updown-3': 'moveUpDown 2s infinite ease-in-out 0.5s',
        'updown-4': 'moveUpDown 2s infinite ease-in-out 0.7s',
        'updown-5': 'moveUpDown 2s infinite ease-in-out 0.9s',
        slideUp: 'slideInUp 0.5s ease-in-out',
        popup: 'popup 0.3s ease-out',
      },
    },
    fontFamily: {
      kor: [
        'Pretendard',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
      ],
      eng: [
        '-apple-system',
        'Pretendard',
        'BlinkMacSystemFont',
        'San Francisco',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ],
    },
    maxWidth: {
      375: '375px', // 모바일용
    },
  },
  plugins: [],
};

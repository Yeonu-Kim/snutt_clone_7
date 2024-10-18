/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: () => ({
        ...Array.from({ length: 96 }, (_, index) => index).reduce(
          (acc, i) => ({ ...acc, [i]: `${i / 10}rem` }),
          {},
        ),
      }),
      fontSize: {
        xs: [
          '1.2rem',
          {
            lineHeight: '1.6rem',
          },
        ],
        sm: [
          '1.4rem',
          {
            lineHeight: '2.0rem',
          },
        ],
        base: [
          '1.6rem',
          {
            lineHeight: '2.4rem',
          },
        ],

        lg: [
          '1.8rem',
          {
            lineHeight: '2.8rem',
          },
        ],
        xl: [
          '2.0rem',
          {
            lineHeight: '2.8rem',
          },
        ],
        '2xl': [
          '2.4rem',
          {
            lineHeight: '3.2rem',
          },
        ],
        '3xl': [
          '3.0rem',
          {
            lineHeight: '3.6rem',
          },
        ],
        '4xl': [
          '3.6rem',
          {
            lineHeight: '4.0rem',
          },
        ],
        '5xl': [
          '4.8rem',
          {
            lineHeight: '5.2rem',
          },
        ],
        '6xl': [
          '6.0rem',
          {
            lineHeight: '7.0rem',
          },
        ],
      },
      colors: {
        primary: {
          DEFAULT: '#2bca43',
        },
        orange: {
          DEFAULT: '#F58D3D',
          dark: '#E07C2C',
        },
        mint: {
          DEFAULT: '#1BD0C8',
          dark: '#00A896',
        },
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

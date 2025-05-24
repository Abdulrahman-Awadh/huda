/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef5f2',
          100: '#fee7e2',
          200: '#fccec4',
          300: '#faa699',
          400: '#f6765d',
          500: '#e4592d', // Main orange color from your palette
          600: '#d0431a',
          700: '#ad3616',
          800: '#8f2f17',
          900: '#752a17',
        },
        secondary: {
          50: '#f3f5f8',
          100: '#e9ecf2',
          200: '#d6dce8',
          300: '#b9c4d8',
          400: '#95a5c4',
          500: '#669bbc', // Secondary blue from your palette
          600: '#5080a8',
          700: '#456c91',
          800: '#3b5776',
          900: '#344961',
        },
        accent: {
          50: '#fcf7ee',
          100: '#f8ecd4',
          200: '#f1d5a9',
          300: '#e8b773',
          400: '#de9340',
          500: '#f2a71e', // Accent yellow/orange from your palette
          600: '#e08816',
          700: '#bb6815',
          800: '#965418',
          900: '#794516',
        },
        warm: {
          50: '#f9f8f5',
          100: '#f2efea',
          200: '#e8e1d5',
          300: '#d8cab8',
          400: '#c3ab95',
          500: '#a9c686', // Warm green from your palette
          600: '#8ba86a',
          700: '#718b56',
          800: '#5d7248',
          900: '#4e5f3d',
        },
        cool: {
          50: '#f3f4f6',
          100: '#e8e9ee',
          200: '#d3d6e0',
          300: '#b1b6c7',
          400: '#8890a9',
          500: '#2a345c', // Navy blue from your palette
          600: '#232b4d',
          700: '#1d2440',
          800: '#191e35',
          900: '#16192d',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        pink: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        }
      },
      fontFamily: {
        arabic: ['Noto Sans Arabic', 'Segoe UI', 'Tahoma', 'Arial', 'sans-serif'],
        sans: ['Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'wave': 'wave 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'gradient': 'gradient 15s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotateY(0deg)' },
          '25%': { transform: 'translateY(-10px) rotateY(5deg)' },
          '50%': { transform: 'translateY(-5px) rotateY(0deg)' },
          '75%': { transform: 'translateY(-15px) rotateY(-5deg)' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(20deg)' },
          '75%': { transform: 'rotate(-10deg)' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        shimmer: {
          '0%': {
            'background-position': '-200px 0'
          },
          '100%': {
            'background-position': 'calc(200px + 100%) 0'
          },
        },
        glow: {
          '0%': {
            'box-shadow': '0 0 5px rgba(227, 89, 45, 0.2), 0 0 10px rgba(227, 89, 45, 0.2), 0 0 15px rgba(227, 89, 45, 0.2)'
          },
          '100%': {
            'box-shadow': '0 0 10px rgba(227, 89, 45, 0.4), 0 0 20px rgba(227, 89, 45, 0.4), 0 0 30px rgba(227, 89, 45, 0.4)'
          },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #e4592d 0%, #f2a71e 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #f2a71e 0%, #e4592d 50%, #669bbc 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #669bbc 0%, #a9c686 100%)',
        'gradient-purple': 'linear-gradient(135deg, #2a345c 0%, #669bbc 100%)',
        'gradient-warm': 'linear-gradient(135deg, #f2a71e 0%, #e4592d 50%, #a9c686 100%)',
        'gradient-cool': 'linear-gradient(135deg, #669bbc 0%, #2a345c 100%)',
        'gradient-rainbow': 'linear-gradient(135deg, #e4592d 0%, #f2a71e 20%, #a9c686 40%, #669bbc 60%, #2a345c 80%)',
      },
      boxShadow: {
        'primary-glow': '0 0 20px rgba(228, 89, 45, 0.3)',
        'secondary-glow': '0 0 20px rgba(102, 155, 188, 0.3)',
        'accent-glow': '0 0 20px rgba(242, 167, 30, 0.3)',
        'warm-glow': '0 0 20px rgba(169, 198, 134, 0.3)',
        'cool-glow': '0 0 20px rgba(42, 52, 92, 0.3)',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
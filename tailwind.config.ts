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
          50: '#fef7f3',
          100: '#fdeee6',
          200: '#fad4c1',
          300: '#f7ba9c',
          400: '#f18752',
          500: '#e3592d', // Main orange color
          600: '#d4481f',
          700: '#b13a18',
          800: '#8e2f14',
          900: '#742611',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Sky blue - complements orange
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Green - triadic with orange
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warm: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Warm yellow - analogous to orange
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        cool: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b', // Cool gray - neutral balance
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7', // Purple - complementary split
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
          500: '#ec4899', // Pink - warm complement
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
        'gradient-orange': 'linear-gradient(135deg, #e3592d 0%, #d4481f 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #f59e0b 0%, #e3592d 50%, #ec4899 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%)',
        'gradient-purple': 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
        'gradient-warm': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #e3592d 100%)',
        'gradient-cool': 'linear-gradient(135deg, #0ea5e9 0%, #64748b 100%)',
        'gradient-rainbow': 'linear-gradient(135deg, #e3592d 0%, #f59e0b 20%, #22c55e 40%, #0ea5e9 60%, #a855f7 80%, #ec4899 100%)',
      },
      boxShadow: {
        'orange-glow': '0 0 20px rgba(227, 89, 45, 0.3)',
        'blue-glow': '0 0 20px rgba(14, 165, 233, 0.3)',
        'green-glow': '0 0 20px rgba(34, 197, 94, 0.3)',
        'purple-glow': '0 0 20px rgba(168, 85, 247, 0.3)',
        'warm-glow': '0 0 20px rgba(245, 158, 11, 0.3)',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
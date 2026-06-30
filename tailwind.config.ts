import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        background: '#080B10',
        foreground: '#E6EDF3',
        bg: '#080B10',
        surface: '#0D1117',
        'surface-2': '#161B22',
        cyan: '#00D4FF',
        green: '#00FF88',
        slate: '#8892A4',
        text: '#E6EDF3',
        card: {
          DEFAULT: '#0D1117',
          foreground: '#E6EDF3',
        },
        popover: {
          DEFAULT: '#0D1117',
          foreground: '#E6EDF3',
        },
        primary: {
          DEFAULT: '#00D4FF',
          foreground: '#080B10',
        },
        secondary: {
          DEFAULT: '#161B22',
          foreground: '#E6EDF3',
        },
        muted: {
          DEFAULT: '#161B22',
          foreground: '#8892A4',
        },
        accent: {
          DEFAULT: '#00D4FF',
          foreground: '#080B10',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'rgba(0, 212, 255, 0.15)',
        input: '#161B22',
        ring: '#00D4FF',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;

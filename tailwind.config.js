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
        // VirtusReport palette
        nero:      '#0D0D0D',
        onyx:      '#161616',
        carbon:    '#1E1E1E',
        crimson:   '#C8102E',
        'crimson-hover': '#A50D26',
        parchment: '#F5F0E8',
        steel:     '#6B6760',
        // Sport categories
        football:   '#1A6FA8',
        basketball: '#C87310',
        mma:        '#A32D2D',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body:    ['var(--font-lora)', 'Georgia', 'serif'],
        ui:      ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#F5F0E8',
            'h1,h2,h3,h4': { color: '#F5F0E8', fontFamily: 'var(--font-playfair)' },
            a:    { color: '#C8102E' },
            blockquote: {
              borderLeftColor: '#C8102E',
              color: '#6B6760',
            },
          },
        },
      },
    },
  },
  plugins: [],
};

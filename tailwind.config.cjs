/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-blue': '#1989fa',
        'main-green': '#07c160',
        'main-red': '#ee0a24',
        'main-orange': '#FA8C16',
        'gray-bg': '#f5f5f5',
        'gray-disable-bg': '#EEEEEE',
        'gray-disable': '#c8c9cc',
        'gray-tip': '#8c8c8c',
        'gray-break': '#9B9B9B',
        'gray-light-border': '#E8E8E8',
        'official-red': '#fa0606',
      },
    },
  },
  plugins: [],
};

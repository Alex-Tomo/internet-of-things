module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'bounce-once': 'bounce 1s linear '
      },
      colors:{
        'stand-yellow': '#E7E74A',
        'stand-blue': '#4A4AE7',
        'stand-pink-dark': '#E42584',
        'stand-pink-light': '#E8439E',
        'stand-green': '#4AE799',
        'transaction-grey': '#646565'
      },
    },
  },
  variants: {
      animation: ['responsive', 'motion-safe', 'motion-reduce'],
    extend: {
    },
  },
  plugins: [],
}

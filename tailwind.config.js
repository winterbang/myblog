module.exports = {
  content: ["./src/**/*.vue"],
  theme: {
    extend: {
      colors: {
        bookly: {
          // 背景色系
          paper: {
            50: '#FDFCF8',
            100: '#F5F3E7',
            200: '#E8D8C4',
            300: '#D1BFA7',
          },
          // 主色调
          primary: {
            100: '#E9F5DB',
            200: '#C7E78B',
            300: '#6B8E23', // 主按钮色
            400: '#5A7A1E',
            500: '#486618',
          },
          // 次级色调
          secondary: {
            100: '#F0E6DD',
            200: '#D7C3B0',
            300: '#8B4513', // 次级按钮色
            400: '#753A10',
            500: '#5E2F0D',
          },
          // 文字色
          ink: {
            50: '#EFEBE9',
            100: '#D7CCC8',
            200: '#8D6E63',
            300: '#5D4037',
            400: '#3E2723', // 主要文字色
            500: '#2A1D1A',
          },
          // 强调色
          accent: {
            100: '#F5E9E0',
            200: '#E0C9B8',
            300: '#A0522D', // 标签/徽章色
            400: '#8A4526',
            500: '#73381F',
          },
        },
        bokurano: {
          'bg': '#fdf6e3',
          'card': '#fff7e0',
          'light': '#fffaf3',
          'primary': '#f4d28d',
          'primary-hover': '#ffe9b0',
          'primary-dark': '#d4a373',
          'secondary': '#f4c169',
          'secondary-hover': '#eebf5e',
          'accent': '#fcd38d',
          'border': '#e7cfa5',
          'text': {
            'dark': '#4d3a2d',
            'primary': '#6b4c3b',
            'secondary': '#8b5e3c',
            'link': '#c07e4c',
            'light': '#a07e5d',
            'muted': '#a38a67'
          },
          'tag': {
            'yellow': {
              'bg': '#ffe9b0',
              'text': '#7a4d1e'
            },
            'brown': {
              'bg': '#e0c3a3',
              'text': '#5c3b1e'
            },
            'green': {
              'bg': '#cbe6de',
              'text': '#2d6a5f'
            },
            'red': {
              'bg': '#f5c8c8',
              'text': '#9b3b3b'
            },
            'blue': {
              'bg': '#d1d8f0',
              'text': '#4a5880'
            }
          }
        }
      },
      fontFamily: {
        serif: ['"Noto Serif"', 'serif'],
        sans: ['"Noto Sans"', 'sans-serif'],
        pacifico: ['"Pacifico"'],
        courgette: ['"Courgette"'],
      }
    },
  },
  plugins: [],
}


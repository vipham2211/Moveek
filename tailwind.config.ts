import type { Config } from 'tailwindcss'

const config: Config = {
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
      colors:{
        body:'#f9fbfd',
        menu:'#6e84a3',
        menuHover:'#12263f',
        labelCardColor:'#d31602',
        bgGray:'#EDF2F9',
        textGray:'#95AAC9',
        blue:'#2C7BE5',
        titleTable:'#95aac9',
        dashboard:'rgb(246 245 255 / 1)'
      },
      screens: {
          'xs':'576px'
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        '16': 'repeat(16, minmax(0, 24px))',

      }
    },
  },
  plugins: [],
}
export default config

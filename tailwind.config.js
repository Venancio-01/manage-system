/** @type {import('tailwindcss').Config} */
import ThemeConfig from './src/themes/config.json'

export default {
  content: ['./src/**/*.{html,vue,ts,js}'],
  theme: {
    extend: {
      colors: {
        ...ThemeConfig
      }
    }
  },
  plugins: []
}

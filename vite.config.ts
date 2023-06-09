import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json'
      }
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
        })
      ]
    })
  ],
  server: {
    port: 5174,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://192.168.112.64:8080/msd/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      '/file': {
        target: 'http://192.168.112.64:8080/msd',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/file/, '')
      }
    }
  }
})

<template>
  <div class="h-screen bg-[url('@/assets/images/背景.png')] bg-center flex flex-col">
    <Head></Head>
    <div class="flex-1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'
import ThemeConfig from '@/themes/config.json'

ConfigProvider.config({
  theme: {
    primaryColor: ThemeConfig.primary
  }
})
</script>

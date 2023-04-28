<template>
  <a-config-provider :locale="zhCN">
    <div class="h-screen bg-[url('@/assets/images/背景.png')] bg-center flex flex-col">
      <Head></Head>
      <div class="flex-1">
        <router-view></router-view>
      </div>
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'
import ThemeConfig from '@/themes/config.json'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

dayjs.locale('zh-cn')
ConfigProvider.config({
  theme: {
    primaryColor: ThemeConfig.primary
  }
})
</script>

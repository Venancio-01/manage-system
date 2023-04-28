<template>
  <div
    class="relative h-[70px] text-white text-center text-[38px] bg-[url(@/assets/images/标题背景.png)] bg-center px-[12px] font-[800] tracking-wider select-none"
  >
    <span class="mt-3 font-[SourceHan]">事件智慧大数据管理系统</span>
    <span v-if="!inLoginPage" class="cursor-pointer absolute top-[32px] right-16 text-[16px] text-white" @click="handleLogout"
      >退出登录</span
    >
  </div>
</template>

<script lang="ts" setup>
import storage from '@/utils/storage'

const router = useRouter()

const handleLogout = () => {
  storage.clearToken()
  router.push('/login')
}

const inLoginPage = computed(() => {
  return router.currentRoute.value.path === '/login'
})
</script>

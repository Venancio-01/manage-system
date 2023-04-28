<template>
  <div class="h-full flex flex-col px-6 pb-8">
    <div class="px-4 mb-4">
      <NavButton path="/home">量化分析</NavButton>
      <NavButton path="/outing">在外人员</NavButton>
      <NavButton path="/accident">事故通报</NavButton>
      <NavButton path="/discipline">作风纪律</NavButton>
      <NavButton path="/policy">政策法规</NavButton>
    </div>
    <div class="flex bg-primary bg-opacity-[0.1] flex-1 pt-6">
      <div v-if="menuVisible" class="w-[154px] flex justify-center">
        <ListMenu :menus="menus" class="w-[140px]"></ListMenu>
      </div>
      <div v-if="menuVisible" class="w-[1px] bg-[#475D80] bg-opacity-[0.29] pt-[36px]"></div>
      <div class="flex-1 p-4 overflow-hidden">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  menuVisible?: boolean
  menus?: Array<{ name: string; path: string }>
}

withDefaults(defineProps<Props>(), {
  menuVisible: true,
  menus: () => []
})
</script>

<style scoped>
.nav-button + .nav-button {
  @apply ml-4;
}
</style>

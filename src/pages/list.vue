<template>
  <div class="h-full flex flex-col px-6 pb-8">
    <div class="px-4 mb-4">
      <NavButton path="/list">外出事件</NavButton>
      <NavButton path="/list/2">自然灾害</NavButton>
    </div>
    <div class="flex bg-primary bg-opacity-[0.1] flex-1 pt-6">
      <div class="w-[154px] flex justify-center">
        <ListMenu :menus="menus" class="w-[140px]"></ListMenu>
      </div>
      <div class="w-[1px] bg-[#475D80] bg-opacity-[0.29] pt-[36px]"></div>
      <div class="flex-1 p-4">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const menus = ref([
  {
    name: '外出记录登记',
    path: '/list/outing'
  },
  {
    name: '生物灾害',
    path: '/list/1/2'
  }
])
</script>

<template>
  <ul>
    <li
      v-for="(menu, index) in menus"
      :key="index"
      class="mb-2 cursor-pointer hover:bg-[url('@/assets/images/列表页选中背景.png')]"
      :class="isActive(menu.path) ? activeClassName : ''"
      @click="router.push(menu.path)"
    >
      <div class="flex h-[40px] items-center">
        <div class="flex justify-center items-center w-[32px]">
          <div class="w-[9px] h-[9px] bg-[#00B1FF] bg-opacity-[0.26] flex justify-center items-center">
            <div class="w-[5px] h-[5px] bg-[#00B1FF]"></div>
          </div>
        </div>
        {{ menu.name }}
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
type Props = {
  menus: Array<{ name: string; path: string }>
}

defineProps<Props>()
const router = useRouter()
const isActive = computed(() => {
  return (path: string) => router.currentRoute.value.path === path
})
const activeClassName = ref("bg-[url('@/assets/images/列表页选中背景.png')]")
</script>

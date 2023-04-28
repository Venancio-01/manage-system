<template>
  <div
    ref="target"
    class="fixed w-[44px] h-[44px] rounded-[50%] bg-primary flex justify-center items-center text-normal cursor-pointer select-none shadow-md"
    :style="style"
    @mouseenter="visible = !visible"
    @mouseleave="visible = !visible"
  >
    <div class="relative">
      <transition name="fade">
        <div v-show="visible" class="absolute -top-[246px] -right-[40px] w-[110px]">
          <NavButton v-for="(menu, index) in menus" :key="index" :path="menu.path" open-new-tab class="mb-2">{{ menu.name }}</NavButton>
        </div>
      </transition>
      <MenuOutlined class="text-xl"></MenuOutlined>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MenuOutlined } from '@ant-design/icons-vue'

const target = ref<HTMLElement | null>(null)
const visible = ref(false)
const menus = ref([
  {
    path: '/home',
    name: '量化分析'
  },
  {
    path: '/outing',
    name: '在外人员'
  },
  {
    path: '/accident',
    name: '事故通报'
  },
  {
    path: '/discipline',
    name: '作风纪律'
  },
  {
    path: '/policy',
    name: '政策法规'
  }
])

onClickOutside(target, () => {
  visible.value = false
})
const { width, height } = useWindowSize()
const initialValue = computed(() => {
  return {
    x: width.value - 90,
    y: height.value - 90
  }
})
const { style } = useDraggable(target, {
  initialValue
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

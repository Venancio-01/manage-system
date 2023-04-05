<template>
  <div class="h-[36px] leading-[36px] px-4 inline-flex relative mr-8 overflow-hidden cursor-pointer" @click="router.push(path)">
    <div
      class="front absolute top-0 left-[8px] border-[1px] border-[#1165b5] h-full w-[16px] border-r-0 box-border"
      :class="isActive ? activeClassName : ''"
    ></div>
    <div class="border-y-[1px] px-2 border-[#1165b5] tracking-widest z-[99]" :class="isActive ? activeClassName : ''">
      <slot> </slot>
    </div>
    <div
      class="end absolute top-0 right-[8px] border-[1px] border-[#1165b5] h-full w-[16px] border-l-0 box-border"
      :class="isActive ? activeClassName : ''"
    ></div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  path: string
}

const router = useRouter()
const props = withDefaults(defineProps<Props>(), {
  path: ''
})
const activeClassName = ref('border-primary bg-[#062a5b]')
const isActive = computed(() => router.currentRoute.value.path.includes(props.path))
</script>

<style scoped>
.front {
  transform: perspective(10px) rotateY(-30deg);
}

.end {
  transform: perspective(10px) rotateY(30deg);
}
</style>

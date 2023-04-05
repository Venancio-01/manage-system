<template>
  <div
    class="border border-solid border-primary border-opacity-[0.16] bg-gradient-to-t from-[#020C1C] from-opacity-[0.16] to-[#004892] to-opacity-[0.16] bg-opacity-[0.16] py-3 px-4 box-border"
  >
    <div class="text-title text-[16px]">{{ title }}</div>

    <div class="flex">
      <div class="flex flex-1 border-b-[1px] border-primary border-opacity-[0.16]">
        <div class="border-b-4 border-x-4 border-x-transparent w-[20px] border-primary"></div>
      </div>
      <div class="ml-[4px] border-b-1 border-primary w-[13px]"></div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  title: string
}

defineProps<Props>()
</script>

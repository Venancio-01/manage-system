<template>
  <div class="base-panel border border-solid border-primary border-opacity-[0.16] py-3 px-4 box-border flex flex-col">
    <div class="flex items-center">
      <div class="ml-[3px] mr-[4px] flex items-center">
        <slot name="icon"></slot>
      </div>
      <div class="text-title text-[16px] flex-1">{{ title }}</div>
    </div>

    <div class="flex">
      <div class="flex flex-1 border-b-[1px] border-primary border-opacity-[0.16]">
        <div class="border-b-4 border-x-4 border-x-transparent w-[20px] border-primary"></div>
      </div>
      <div class="ml-[4px] border-b-1 border-primary w-[13px]"></div>
    </div>

    <div class="flex-1">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  title: string
}

defineProps<Props>()
</script>

<style scoped>
.base-panel {
  background: linear-gradient(0deg, rgba(2, 12, 28, 0.16) 0%, rgba(0, 72, 146, 0.16) 100%);
}
</style>

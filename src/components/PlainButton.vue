<template>
  <button
    class="plain-button px-[14px] py-[6px] rounded-[20px] bg-no-repeat bg-center"
    :class="active ? 'bg-[url(@/assets/images/类型切换-选中.png)]' : 'bg-[url(@/assets/images/类型切换.png)]'"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
type Props = {
  active: boolean
}

defineProps<Props>()
</script>
<style scoped>
.plain-button + .plain-button {
  @apply ml-[12px];
}
</style>

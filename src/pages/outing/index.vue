<template>
  <ListLayout :menus="menus">
    <router-view></router-view>
  </ListLayout>
</template>

<script lang="ts" setup>
const menus = ref([
  {
    name: '本单位在外情况',
    path: '/outing/list'
  },
  {
    name: '在外情况统计',
    path: '/outing/statistics'
  }
])
</script>

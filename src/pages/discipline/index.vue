<template>
  <ListLayout :menus="menus">
    <router-view></router-view>
  </ListLayout>
</template>

<script lang="ts" setup>
const menus = ref([
  {
    name: '本单位违纪情况',
    path: '/discipline/list'
  },
  {
    name: '违纪统计',
    path: '/discipline/statistics'
  }
])
</script>

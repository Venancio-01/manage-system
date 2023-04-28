<template>
  <a-table v-bind="$attrs">
    <template #emptyText> </template>
    <template v-for="(_, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
  </a-table>
</template>

<script lang="ts" setup></script>

<style scoped>
:deep(.ant-table) {
  background-color: transparent !important;
  --color: #d2d6da;
}
:deep(.ant-table-thead) {
  background: linear-gradient(to right, #115c8d 0%, rgba(0, 80, 106, 0.3) 100%);
  background-color: transparent !important;
  color: #61cbeb;
  border-bottom: none;
}

:deep(.ant-table-cell) {
  font-size: 14px !important;
  font-weight: 500 !important;
  background-color: transparent !important;
  border-bottom: none !important;
  @apply text-normal;
}

:deep(.ant-table-cell) {
  background-color: transparent !important;
}
</style>

<template>
  <div class="flex flex-col">
    <div class="flex-1 grid grid-cols-[492px_1fr_492px] grid-rows-[1fr_auto_295px] gap-4 px-10 py-4 text-white">
      <BasePanel title="本月事故类型统计">
        <PieChart></PieChart>
      </BasePanel>
      <div class="row-span-2">
        <ChinaMap></ChinaMap>
      </div>
      <BasePanel title="本月事故统计">本月事故统计</BasePanel>
      <BasePanel class="row-span-2" title="近期事故通报"> 近期事故通报 </BasePanel>
      <BasePanel class="row-span-2" title="本月防范事故建议">
        <span>本月防范事故建议</span>
        <span>111</span>
      </BasePanel>
      <BasePanel title="事故统计">
        <LineChart></LineChart>
      </BasePanel>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useInit from '@/hooks/useInit'

useInit()
</script>

<template>
  <VChart class="h-[24px] w-full" :option="option" autoresize></VChart>
</template>

<script lang="ts" setup>
import VChart from 'vue-echarts'
import { graphic } from 'echarts/core'

type Props = {
  data: number
  max: number
  index: number
  total: number
}
const props = defineProps<Props>()

const colors = [
  {
    from: '#A6D9C1',
    to: '#54CAB1'
  },
  {
    from: '#E0D4A2',
    to: '#FFD000'
  },
  {
    from: '#1DCCDA',
    to: '#2382D8'
  },
  {
    from: '#2193b0',
    to: '#6dd5ed'
  },
  {
    from: '#00B4DB',
    to: '#0083B0'
  }
]

const option = computed(() => {
  return {
    grid: {
      top: 70,
      left: 0
    },
    xAxis: {
      type: 'value',
      max: props.max,
      show: false
    },
    yAxis: {
      type: 'category',
      show: false
    },
    series: {
      label: {
        show: true,
        color: '#fff',
        position: 'right'
      },
      itemStyle: {
        color: new graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: colors[props.index % props.total].from },
          { offset: 1, color: colors[props.index % props.total].to }
        ]),
        barBorderRadius: [0, 10, 10, 0]
      },
      type: 'bar',
      barWidth: 6,
      barGap: '50%',
      data: [props.data]
    }
  }
})
</script>

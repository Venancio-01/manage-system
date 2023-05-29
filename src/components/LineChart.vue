<template>
  <VChart class="h-[240px] w-full" :option="option" autoresize></VChart>
</template>

<script lang="ts" setup>
import VChart from 'vue-echarts'
import { useStore } from '@/store'

type Props = {
  data: {
    name: string
    data: number[]
  }[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})
const store = useStore()
const { accidentTypes } = storeToRefs(store)
const colors = ['#77e6b2', '#d57012', '#fed002', '#29b0ed']

const option = computed(() => {
  return {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      show: true,
      data: accidentTypes.value.map(item => item.name),
      top: 10,
      right: 20,
      icon: 'roundRect',
      textStyle: {
        color: '#9ECDFB'
      }
    },
    xAxis: {
      type: 'category',
      data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      offset: 5,
      axisLine: {
        lineStyle: {
          color: '#9ECDFB'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#9ECDFB'
        }
      }
    },
    series: props.data.map((item, index) => {
      return {
        name: item.name,
        data: item.data,
        type: 'line',
        smooth: true,
        showSymbol: false,
        itemStyle: {
          color: colors[index]
        }
      }
    })
  }
})
</script>

<template>
  <VChart class="w-full" :option="option" autoresize></VChart>
</template>

<script lang="ts" setup>
import { CountNameType } from '@/types'
import VChart from 'vue-echarts'

type Props = {
  data: CountNameType[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})

const colors = ['#8be5f2', '#72bdcf', '#5a99ad', '#298ff4']

const option = computed(() => {
  return {
    tooltip: {
      show: true
    },
    series: [
      {
        type: 'pie',
        radius: ['26%', '60%'],
        center: ['50%', '50%'],
        label: {
          formatter: '{text1|{b}}{text2|{d}}{text1|%}',
          padding: [0, -55, 20, -55],
          alignTo: 'labelLine',
          rich: {
            text1: {
              color: '#f0f0f0'
            },
            text2: {
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#00B1FF'
            }
          }
        },
        labelLine: {
          length: 30,
          length2: 30
        },
        data: props.data.map((item, index, arr) => {
          return {
            name: item.name,
            value: item.count,
            itemStyle: {
              color: colors[index % arr.length]
            }
          }
        })
      }
    ]
  }
})
</script>

<template>
  <VChart class="h-[500px] w-full" :option="option" autoresize></VChart>
</template>

<script lang="ts" setup>
import VChart from 'vue-echarts'

const option = ref({
  geo: {
    map: 'china',
    top: 170,
    zoom: 1.5
  },
  visualMap: {
    min: 0,
    max: 1000,
    left: 26,
    bottom: 40,
    showLabel: !0,
    text: ['高', '低'],
    pieces: [
      {
        gt: 100,
        label: '> 100 人',
        color: '#7f1100'
      },
      {
        gte: 10,
        lte: 100,
        label: '10 - 100 人',
        color: '#ff5428'
      },
      {
        gte: 1,
        lt: 10,
        label: '1 - 9 人',
        color: '#ff8c71'
      },
      {
        gt: 0,
        lt: 1,
        label: '疑似',
        color: '#ffd768'
      },
      {
        value: 0,
        color: '#ffffff'
      }
    ],
    show: !0
  },
  series: [
    {
      type: 'map',
      map: 'china',
      geoIndex: 0,
      data: []
    }
  ]
})
</script>

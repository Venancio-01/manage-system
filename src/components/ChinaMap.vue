<template>
  <div class="relative">
    <div class="absolute top-12 left-16">
      <div class="flex items-baseline">
        <img class="w-[9px] h-[9px]" :src="blueIcon" alt="图标" />
        <div class="ml-4">
          <div class="flex items-baseline text-white text-[16px]">
            <span class="">在外总人数</span>
            <span class="mx-4 text-2xl text-primary font-bold">{{ count }}</span>
            <span>人</span>
          </div>
          <img :src="line" alt="在外总人数线条" />
        </div>
      </div>
    </div>
    <VChart class="h-[500px] w-full" :option="option" autoresize></VChart>
  </div>
</template>

<script lang="ts" setup>
import VChart from 'vue-echarts'
import chinaGeoJSON from '@/assets/china.json'
import blueIcon from '@/assets/images/蓝色.png'
import line from '@/assets/images/在外总人数线条.png'

type Props = {
  count: number
}

withDefaults(defineProps<Props>(), {
  count: 0
})

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //不含最大值，含最小值
}

const geoCoordMap = {
  江苏: [118.8062, 31.9208],
  北京: [116.4551, 40.2539],
  河北: [114.4995, 38.1006],
  天津: [117.4219, 39.4189],
  山西: [112.3352, 37.9413],
  山东: [117.1582, 36.8701],
  河南: [113.4668, 34.6234]
}

const lineCoordMap = Object.keys(geoCoordMap).map(item => {
  return {
    name: item,
    coords: [geoCoordMap['北京'], geoCoordMap[item]],
    value: 100,
    lineStyle: {
      color: '#7ceab2',
      width: 0.3, //尾迹线条宽度
      opacity: 0.9, //尾迹线条透明度
      curveness: 0.4 //尾迹线条曲直度
    }
  }
})

const data = chinaGeoJSON.features.map(item => {
  return {
    name: item.properties.name,
    value: getRandomInt(20, 100)
  }
})

const option = ref({
  geo: {
    map: 'china',
    top: 170,
    zoom: 1.5,
    itemStyle: {
      normal: {
        areaColor: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: '#09132c' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#274d68' // 100% 处的颜色
            }
          ],
          globalCoord: true // 缺省为 false
        },
        shadowColor: 'rgb(58,115,192)',
        shadowOffsetX: 2,
        shadowOffsetY: 3
      },
      emphasis: {
        areaColor: '#2AB8FF',
        borderWidth: 0,
        color: 'green',
        label: {
          show: false
        }
      }
    },
    emphasis: {
      itemStyle: {
        areaColor: '#2AB8FF'
      }
    }
  },
  visualMap: {
    show: false,
    min: 0,
    max: 100,
    left: 'left',
    top: 'bottom',
    text: ['高', '低'],
    calculable: true,
    textStyle: {
      color: '#f0f0f0'
    },
    inRange: {
      color: ['#e0ffff', '#2AB8FF']
    }
  },
  series: [
    {
      type: 'map',
      map: 'china',
      geoIndex: 0,
      emphasis: {
        disabled: true
      },
      animation: false,
      data: data
    },
    //地图点的动画效果
    {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      colorBy: 'data',
      data: Object.keys(geoCoordMap).map(item => {
        return {
          name: item,
          value: geoCoordMap[item],
          itemStyle: {
            color: '#7ceab2',
            borderWidth: 3,
            borderColor: '#25a4b0'
          }
        }
      }),
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      label: {
        show: false
      },
      zlevel: 1
    },
    //地图线的动画效果
    {
      type: 'lines',
      zlevel: 10,
      effect: {
        show: true,
        period: 4, //箭头指向速度，值越小速度越快
        trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: 'arrow', //箭头图标
        symbolSize: 2 //图标大小
      },
      data: lineCoordMap
    }
  ]
})
</script>

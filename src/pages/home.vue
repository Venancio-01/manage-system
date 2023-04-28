<template>
  <div class="h-full flex gap-4 px-10 py-4">
    <div class="w-[490px] flex flex-col gap-4">
      <BasePanel title="本月事故类型统计" class="h-[380px]">
        <template #icon>
          <img :src="typeIcon" class="w-[16px] h-[16px]" alt="图标" />
        </template>
        <PieChart :data="accidentTypeStatistics"></PieChart>
      </BasePanel>

      <BasePanel class="flex-1" title="近期事故通报">
        <template #icon>
          <img :src="noticeIcon" class="w-[16px] h-[16px]" alt="图标" />
        </template>
        <PerfectScrollbar class="mt-4">
          <ul class="overflow-auto">
            <li v-for="(item, index) in recentAccidentList" :key="index">
              <div class="py-2">
                {{ index + 1 + '、' + item.unit }}
              </div>
              <div class="px-[20px] text-[#DAE8EB] text-[12px]">
                {{ item.summary }}
              </div>
              <img src="@/assets/images/近期事故分隔条.png" class="w-full px-4" alt="" />
            </li>
          </ul>
        </PerfectScrollbar>
      </BasePanel>
    </div>

    <div class="flex-1 flex flex-col gap-4">
      <div class="flex-1">
        <ChinaMap :count="outingPeopleCount"></ChinaMap>
      </div>
      <BasePanel title="事故统计" class="h-[295px] relative">
        <template #icon>
          <img :src="lineStatisticsIcon" class="w-[16px] h-[16px]" alt="图标" />
        </template>

        <div class="absolute top-[6px] right-8">
          <a-select v-model:value="currentYear" @change="handleCurrentYearChange">
            <a-select-option v-for="item in years" :key="item" :value="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </div>

        <LineChart :data="accidentStatisticsByYear"></LineChart>
      </BasePanel>
    </div>

    <div class="w-[490px] flex flex-col gap-4">
      <BasePanel title="本月事故统计" class="h-[380px]">
        <template #icon>
          <img :src="statisticsIcon" class="w-[16px] h-[16px]" alt="图标" />
        </template>
        <div class="grid grid-rows-2 grid-cols-2 p-6 gap-x-6 gap-y-4">
          <div
            v-for="(item, index) in accidentStatisticsByThisMonth"
            :key="index"
            class="bg-[url('@/assets/images/社会安全事故.png')] w-[200px] h-[136px] p-4 flex flex-col"
          >
            <div class="flex items-center">
              <img class="w-[9px] h-[9px]" :src="icons[index % 4]" alt="图标" />
              <span class="ml-2 text-[16px]">{{ item.name }}</span>
            </div>

            <div class="bg-gradient-to-r from-[#CFF0FF_0%] to[rgba(207,240,255,0)_100%] h-[1px] mt-[4px]"></div>

            <div class="flex-1 flex flex-col">
              <div class="flex-1 flex items-baseline justify-center">
                <span class="text-center">本月数据</span>
                <span class="text-2xl text-primary font-bold ml-4 w-[50px] text-center">{{ item.count }}</span>
              </div>
              <div class="flex-1 flex items-baseline justify-center">
                <span class="text-center">历史均值</span>
                <span class="text-2xl text-primary font-bold ml-4 w-[50px] text-center">{{ item.avgCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </BasePanel>

      <BasePanel class="flex-1" title="本月防范事故建议">
        <template #icon>
          <img :src="adviceIcon" class="w-[16px] h-[16px]" alt="图标" />
        </template>
        <div class="h-[40px] bg-[rgba(39,153,240,0.16)] flex items-center px-4 mt-2">
          <img class="mr-2" src="@/assets/images/提示图标.png" alt="图标" />
          本月防范事故建议事故类型为
          <span class="ml-2 text-[#EDD360]">{{ accidentPreventionType }}</span>
        </div>

        <PerfectScrollbar class="mt-2 !h-[250px]">
          <div class="">
            <div v-for="(item, index) in accidentPreventionRecommendationsPercents" :key="index">
              <div class="">
                {{ item.name }}
              </div>

              <div class="flex flex-col">
                <BarChart
                  :data="item.count"
                  :max="item.max"
                  :index="index"
                  :total="accidentPreventionRecommendationsPercents.length"
                ></BarChart>
              </div>
            </div>
          </div>
        </PerfectScrollbar>

        <div class="h-[1px] bg-[#00B1FF] opacity-[.35] my-4"></div>

        <div>
          <PlainButton v-for="(item, index) in btns" :key="index" :active="item.active" @click="handleClick(item)">
            {{ item.name }}
          </PlainButton>
        </div>
      </BasePanel>
    </div>
  </div>
  <FloatMenu></FloatMenu>
</template>

<script lang="ts" setup>
import typeIcon from '@/assets/images/事故类型.png'
import statisticsIcon from '@/assets/images/本月事故统计.png'
import noticeIcon from '@/assets/images/事故通报.png'
import lineStatisticsIcon from '@/assets/images/事故统计图标.png'
import adviceIcon from '@/assets/images/本月防范事故建议图标.png'
import greenIcon from '@/assets/images/绿色.png'
import yellowIcon from '@/assets/images/黄色.png'
import blueIcon from '@/assets/images/蓝色.png'
import orangeIcon from '@/assets/images/橙色.png'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import {
  AccidentRecord,
  getAccidentPreventionRecommendations,
  getAccidentTypeStatistics,
  getRecentAccidentList,
  getAccidentStatisticsByYear,
  getThisMonthAccidentStatistics,
  AccidentStatisticsByMonth
} from '@/api/accident'
import { getOutingPeopleCount } from '@/api/outing'
import { CountNameType } from '@/types'
import { useStore } from '@/store'
import useInit from '@/hooks/useInit'
import dayjs from 'dayjs'

const { handleRequestBasicData } = useInit()
const store = useStore()
const { accidentTypes } = storeToRefs(store)

const icons = [greenIcon, yellowIcon, blueIcon, orangeIcon]
const btns = ref([])

const handleClick = async btn => {
  btns.value = btns.value.map(item => {
    return {
      ...item,
      active: item.name === btn.name
    }
  })

  const { data } = await getAccidentPreventionRecommendations(btn.id)
  accidentPreventionType.value = data.pointer || ''
  accidentPreventionRecommendations.value = data.list || []
}

// 事故类型统计
const accidentTypeStatistics = ref<CountNameType[]>([])
const handleGetAccidentTypeStatistics = async () => {
  const { data } = await getAccidentTypeStatistics()
  accidentTypeStatistics.value = data || []
}

// 近期事故通报
const recentAccidentList = ref<AccidentRecord[]>([])
const handleGetRecentAccidentList = async () => {
  const { data } = await getRecentAccidentList()
  recentAccidentList.value = data || []
}

// 本月事故统计
const accidentStatisticsByThisMonth = ref<AccidentStatisticsByMonth[]>([])
const handleGetThisMonthAccidentStatistics = async () => {
  const { data } = await getThisMonthAccidentStatistics()
  accidentStatisticsByThisMonth.value = data || []
}

// 年度事故统计
const currentYear = ref<number>(dayjs().year())
const years = ref<number[]>(
  new Array(5).fill(0).map((_, index) => {
    return currentYear.value - index
  })
)
const accidentStatisticsByYear = ref([])
const handleGetAccidentStatisticsByYear = async () => {
  const { data } = await getAccidentStatisticsByYear(currentYear.value)
  const yearData = data || []
  accidentStatisticsByYear.value = accidentTypes.value.reduce((acc, cur) => {
    const data = yearData.map(item => {
      return item[cur.name] || 0
    })

    acc.push({
      name: cur.name,
      data
    })

    return acc
  }, [])
}

const handleCurrentYearChange = (year: number) => {
  currentYear.value = year
  handleGetAccidentStatisticsByYear()
}

// 本月防范事故类型
const accidentPreventionType = ref('')
// 本月防范事故建议
const accidentPreventionRecommendations = ref<CountNameType[]>([])
// 防范事故建议百分比
const accidentPreventionRecommendationsPercents = computed(() => {
  const max = Math.max(...accidentPreventionRecommendations.value.map(item => item.count))

  return accidentPreventionRecommendations.value.map(item => {
    return {
      ...item,
      max
    }
  })
})
const handleGetAccidentPreventionRecommendations = async () => {
  const firstType = accidentTypes.value[0]
  const { data } = await getAccidentPreventionRecommendations(firstType?.id)
  accidentPreventionType.value = data.pointer || ''
  accidentPreventionRecommendations.value = data.list || []
}

const outingPeopleCount = ref(0)
const handleGetOutingPeopleCount = async () => {
  const { data } = await getOutingPeopleCount()
  outingPeopleCount.value = data.length || 0
}

const handleInit = async () => {
  handleGetAccidentTypeStatistics()
  handleGetRecentAccidentList()
  handleGetAccidentPreventionRecommendations()
  handleGetAccidentStatisticsByYear()
  handleGetThisMonthAccidentStatistics()
  handleGetOutingPeopleCount()
}

onMounted(async () => {
  await handleRequestBasicData()
  await handleInit()

  btns.value = accidentTypes.value.map(item => {
    return {
      ...item,
      active: item.name === accidentTypes.value[0].name
    }
  })
})
</script>

<style scoped>
:deep(.ps) {
  height: 360px;
}
:deep(.ant-progress) {
  line-height: 0.6;
}
:deep(.ant-progress-inner) {
  background-color: transparent;
}
:deep(.ant-progress-text) {
  @apply !text-normal;
}

:deep(.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector) {
  border: none !important;
  box-shadow: none !important;
}

:deep(.ant-select:not(.ant-select-customize-input) .ant-select-selector) {
  color: white;
  background-color: transparent;
  border: none;
}

:deep(.ant-select-arrow) {
  color: white;
}
</style>

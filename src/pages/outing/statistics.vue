<template>
  <div>
    <h2 class="text-3xl text-center text-white tracking-widest mb-8">在外情况统计</h2>
    <MultiLevelTable :columns="columns" :data-source="statistics" :pagination="false"> </MultiLevelTable>
  </div>
</template>

<script lang="ts" setup>
import { OutingStatistics, getOutStatistics } from '@/api/outing'
import { getReasons } from '@/api/outing/reason'
import { useStore } from '@/store'
import { IdNameType } from '@/types'
import type { TableColumnsType } from 'ant-design-vue'
import MultiLevelTable from '@/components/MultiLevelTable.vue'

const store = useStore()
const { reasons } = storeToRefs(store)

const columns = ref<TableColumnsType>([
  {
    title: '单位',
    dataIndex: 'deptName',
    key: 'deptName',
    align: 'center',
    width: 140
  }
])

const statistics = ref<OutingStatistics[]>([])
const handleGetOutStatistics = async () => {
  const { data } = await getOutStatistics()
  statistics.value = data || []
}

type ReasonType = IdNameType & {
  children?: IdNameType[]
}

const reasonList = ref<ReasonType[]>([])
const handleGetReasons = async () => {
  reasonList.value = [...reasons.value]
  for (let index = 0; index < reasonList.value.length; index++) {
    const element = reasonList.value[index]
    const { data } = await getReasons(element.id)
    element.children = data
  }
}

const handleSetColumns = () => {
  reasonList.value.forEach(item => {
    const column = {
      title: item.name,
      dataIndex: item.id,
      key: item.id,
      width: 200,
      children: item.children?.map(child => ({
        title: child.name,
        dataIndex: child.id,
        key: child.id,
        align: 'center',
        width: 200
      }))
    }

    columns.value.push(column)
  })
}

onMounted(async () => {
  await handleGetReasons()
  await handleGetOutStatistics()
  handleSetColumns()
})
</script>

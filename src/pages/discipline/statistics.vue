<template>
  <div>
    <h2 class="text-3xl text-center text-white tracking-widest mb-8">违纪统计</h2>
    <div class="overflow-auto max-w-full">
      <PerfectScrollbar>
        <MultiLevelTable :columns="columns" :data-source="statistics" :pagination="false"> </MultiLevelTable>
      </PerfectScrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getDisciplineStatistics } from '@/api/discipline'
import { useStore } from '@/store'
import type { TableColumnsType } from 'ant-design-vue'
import MultiLevelTable from '@/components/MultiLevelTable.vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const store = useStore()
const { disciplineTree } = storeToRefs(store)

const columns = ref<TableColumnsType>([
  {
    title: '单位',
    dataIndex: 'deptName',
    key: 'deptName',
    align: 'center',
    width: 240
  }
])

const statistics = ref([])
const handleGetData = async () => {
  const { data } = await getDisciplineStatistics()
  statistics.value = data || []
}

const handleSetColumns = () => {
  disciplineTree.value.forEach(item => {
    const column = {
      title: item.name,
      dataIndex: item.id,
      key: item.id,
      children: item.children.map(child => ({
        title: child.name,
        dataIndex: child.id,
        key: child.id,
        align: 'center'
      }))
    }

    columns.value.push(column)
  })
}

onMounted(async () => {
  await handleGetData()
  handleSetColumns()
})
</script>

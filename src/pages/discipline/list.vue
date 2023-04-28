<template>
  <DisciplineDetailDialog
    v-model:visible="visible"
    :is-view="isView"
    :data="currentSelectData"
    @completed="handleQuery"
    @close="handleDialogClose"
  ></DisciplineDetailDialog>

  <div class="flex mb-4">
    <a-form class="flex-1" layout="inline" :model="queryParams" autocomplete="off" @submit="handleQuery">
      <a-form-item label="日期" name="startDayRange">
        <a-range-picker v-model:value="queryParams.dayRange" value-format="YYYY-MM-DD" />
      </a-form-item>

      <a-form-item label="单位" name="deptId">
        <a-select v-model:value="queryParams.deptId" placeholder="请选择单位" class="!w-[150px]">
          <a-select-option v-for="item in departments" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>

    <div class="w-[200px] flex justify-center">
      <a-button type="primary" class="mr-4" @click="handleQuery">查询</a-button>
      <a-button @click="handleReset">重置</a-button>
    </div>
  </div>

  <div class="mb-4">
    <a-button type="primary" @click="handleAdd">作风纪律登记</a-button>
  </div>

  <BaseTable
    :columns="columns"
    :data-source="data"
    :pagination="{
      pageSize: queryParams.pageSize,
      current: queryParams.pageNum,
      total: totalNum,
      onChange: onPageChange
    }"
  >
    <template #bodyCell="{ column, record }">
      <!-- 操作 -->
      <template v-if="column.dataIndex === 'action'">
        <a-button type="text" @click="handleView(record)">详情</a-button>
        <a-button type="text" @click="handleUpdate(record)">修改</a-button>
        <a-popconfirm title="确定删除吗？" ok-text="确定" cancel-text="取消" @confirm="handleDelete(record)">
          <a-button type="text">删除</a-button>
        </a-popconfirm>
      </template>
    </template>
  </BaseTable>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import { getDisciplineList, DisciplineRecord, QueryDisciplineParams, deleteDiscipline } from '@/api/discipline'
import { TableColumnsType, message } from 'ant-design-vue'
import DisciplineDetailDialog from './components/DisciplineDetailDialog.vue'

const store = useStore()
const { departments } = storeToRefs(store)

const visible = ref(false)
const handleAdd = () => {
  visible.value = true
}
const columns = ref<TableColumnsType>([
  {
    title: '机构',
    dataIndex: 'deptName',
    key: 'deptName',
    align: 'center'
  },
  {
    title: '日期',
    dataIndex: 'day',
    key: 'day',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    width: 280
  }
])

const data = ref<DisciplineRecord[]>([])
const currentSelectData = ref<DisciplineRecord>()
const totalNum = ref(0)

const onPageChange = (page: number) => {
  queryParams.pageNum = page
  handleQuery()
}

const queryParams = reactive<QueryDisciplineParams>({
  pageNum: 1,
  pageSize: 8,
  deptId: undefined,
  dayRange: []
})
const handleQuery = async () => {
  const { rows, total } = await getDisciplineList(queryParams)
  data.value = rows
  totalNum.value = total
}

const handleReset = () => {
  queryParams.pageNum = 1
  queryParams.deptId = undefined
  queryParams.dayRange = []
  handleQuery()
}

const handleUpdate = (record: DisciplineRecord) => {
  currentSelectData.value = record
  visible.value = true
}

const isView = ref(false)
const handleView = (record: DisciplineRecord) => {
  currentSelectData.value = record
  isView.value = true
  visible.value = true
}

const handleDialogClose = () => {
  isView.value = false
  currentSelectData.value = undefined
  visible.value = false
}

const handleDelete = async (record: DisciplineRecord) => {
  const { code, msg } = await deleteDiscipline(record.disciplineId)
  const success = code === 0
  if (success) {
    message.success('删除成功')
    handleReset()
  } else {
    message.error(msg)
  }
}

onMounted(() => {
  handleQuery()
})
</script>

<style scoped>
:deep(.ant-form-item-label label) {
  @apply text-normal;
}
</style>

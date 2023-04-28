<template>
  <OutingDetailDialog
    v-model:visible="visible"
    :is-view="isView"
    :data="currentSelectData"
    @completed="handleQuery"
    @close="handleDialogClose"
  ></OutingDetailDialog>
  <div class="flex mb-4">
    <a-form class="flex-1" layout="inline" :model="queryParams" autocomplete="off" @submit="handleQuery">
      <a-form-item label="外出时间" name="startDayRange">
        <a-range-picker v-model:value="queryParams.startDayRange" value-format="YYYY-MM-DD" />
      </a-form-item>

      <a-form-item label="归队时间" name="returnDayRange">
        <a-range-picker v-model:value="queryParams.returnDayRange" value-format="YYYY-MM-DD" />
      </a-form-item>

      <a-form-item label="单位" name="deptId">
        <a-select v-model:value="queryParams.deptId" placeholder="请选择单位" class="!w-[150px]">
          <a-select-option v-for="item in departments" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="姓名" name="name">
        <a-input v-model:value="queryParams.name" placeholder="请输入姓名" />
      </a-form-item>

      <a-form-item label="状态" name="state">
        <a-select v-model:value="queryParams.state" placeholder="请选择单位" class="!w-[150px]">
          <a-select-option v-for="(value, key) in outingState" :key="key" :value="key">{{ value }}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>

    <div class="w-[200px] flex justify-center">
      <a-button type="primary" class="mr-4" @click="handleQuery">查询</a-button>
      <a-button @click="handleReset">重置</a-button>
    </div>
  </div>

  <div class="mb-4">
    <a-button type="primary" @click="handleAdd">外出登记</a-button>
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
    <template #bodyCell="{ column, text, record }">
      <!-- 省市 -->
      <template v-if="column.dataIndex === 'destination'">
        {{ record.city + record.province }}
      </template>

      <!-- 原因 -->
      <template v-if="column.dataIndex === 'typeId'">
        {{ reasons.find(item => item.id === text)?.name }}
      </template>

      <!-- 状态 -->
      <template v-if="column.dataIndex === 'state'">
        {{ outingState[text] }}
      </template>

      <!-- 操作 -->
      <template v-if="column.dataIndex === 'action'">
        <a-button type="text" @click="handleView(record)">详情</a-button>

        <a-popconfirm v-if="record.state === 1" title="确定销假吗？" ok-text="确定" cancel-text="取消" @confirm="handleCancelLeave(record)">
          <a-button type="text">销假</a-button>
        </a-popconfirm>

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
import { cancelLeave, deleteOutingRecord, getOutingRecords, OutingRecord, QueryOutingRecordParams } from '@/api/outing'
import { message, TableColumnsType } from 'ant-design-vue'
import OutingDetailDialog from './components/OutingDetailDialog.vue'

const store = useStore()
const { reasons, departments, outingState } = storeToRefs(store)

const visible = ref(false)
const handleAdd = () => {
  visible.value = true
}
const columns = ref<TableColumnsType>([
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    width: 100
  },
  {
    title: '军衔',
    dataIndex: 'rank',
    key: 'rank',
    align: 'center',
    width: 100
  },
  {
    title: '目的地（省市）',
    dataIndex: 'destination',
    key: 'destination',
    align: 'center',
    width: 150
  },
  {
    title: '详细地址',
    dataIndex: 'address',
    key: 'address',
    align: 'center',
    width: 200
  },
  {
    title: '外出原因',
    dataIndex: 'typeId',
    key: 'typeId',
    align: 'center',
    width: 100
  },
  {
    title: '外出日期',
    dataIndex: 'startDay',
    key: 'startDay',
    align: 'center',
    width: 150
  },
  {
    title: '预计归队日期',
    dataIndex: 'returnDay',
    key: 'returnDay',
    align: 'center',
    width: 150
  },
  {
    title: '联系方式',
    dataIndex: 'contact',
    key: 'contact',
    align: 'center',
    width: 150
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    align: 'center',
    width: 100
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    width: 240
  }
])

const data = ref<OutingRecord[]>([])
const currentSelectData = ref<OutingRecord>()
const totalNum = ref(0)

const onPageChange = (page: number) => {
  queryParams.pageNum = page
  handleQuery()
}

const queryParams = reactive<QueryOutingRecordParams>({
  pageNum: 1,
  pageSize: 8,
  name: '',
  deptId: undefined,
  state: undefined,
  startDayRange: [],
  returnDayRange: []
})
const handleQuery = async () => {
  const { rows, total } = await getOutingRecords(queryParams)
  data.value = rows
  totalNum.value = total
}

const handleReset = () => {
  queryParams.pageNum = 1
  queryParams.name = ''
  queryParams.startDayRange = []
  queryParams.returnDayRange = []
  queryParams.deptId = undefined
  queryParams.state = undefined
  handleQuery()
}

const isView = ref(false)
const handleView = (record: OutingRecord) => {
  isView.value = true
  currentSelectData.value = record
  visible.value = true
}

const handleUpdate = (record: OutingRecord) => {
  currentSelectData.value = record
  visible.value = true
}

const handleCancelLeave = async (record: OutingRecord) => {
  const { code } = await cancelLeave(record.outId)
  const success = code === 0
  if (success) {
    message.success('销假成功')
    handleQuery()
  } else {
    message.error('销假失败')
  }
}

const handleDelete = async (record: OutingRecord) => {
  const { code } = await deleteOutingRecord(record.outId)
  const success = code === 0
  if (success) {
    message.success('删除成功')
    handleQuery()
  } else {
    message.error('删除失败')
  }
}

const handleDialogClose = () => {
  isView.value = false
  currentSelectData.value = undefined
  visible.value = false
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

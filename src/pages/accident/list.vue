<template>
  <ListLayout :menu-visible="false">
    <AccidentDetailDialog
      v-model:visible="visible"
      :is-view="isView"
      :data="currentSelectData"
      @completed="handleQuery"
      @close="handleDialogClose"
    ></AccidentDetailDialog>

    <div class="flex mb-4">
      <a-form class="flex-1" layout="inline" :model="queryParams" autocomplete="off" @submit="handleQuery">
        <a-form-item label="事故日期" name="dayRange">
          <a-range-picker v-model:value="queryParams.dayRange" value-format="YYYY-MM-DD" />
        </a-form-item>

        <a-form-item label="部门" name="deptId">
          <a-select v-model:value="queryParams.deptId" placeholder="请选择部门" class="!w-[150px]">
            <a-select-option v-for="item in departments" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="单位" name="unit">
          <a-input v-model:value="queryParams.unit" placeholder="请输入单位"></a-input>
        </a-form-item>
      </a-form>

      <div class="w-[200px] flex justify-center">
        <a-button type="primary" class="mr-4" @click="handleQuery">查询</a-button>
        <a-button @click="handleReset">重置</a-button>
      </div>
    </div>

    <div class="mb-4">
      <a-button type="primary" @click="handleAdd">事故登记</a-button>
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
  </ListLayout>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import { deleteAccident, getAccidentList, QueryAccidentParams } from '@/api/accident'
import { message, TableColumnsType } from 'ant-design-vue'
import { AccidentRecord } from '@/api/accident'
import AccidentDetailDialog from './components/AccidentDetailDialog.vue'

const store = useStore()
const { departments } = storeToRefs(store)

const visible = ref(false)
const handleAdd = () => {
  visible.value = true
}
const columns = ref<TableColumnsType>([
  {
    title: '事故单位',
    dataIndex: 'unit',
    key: 'unit',
    align: 'center',
    width: 100
  },
  {
    title: '日期',
    dataIndex: 'day',
    key: 'day',
    align: 'center',
    width: 100
  },
  {
    title: '事故类型',
    dataIndex: 'typeName',
    key: 'typeName',
    align: 'center',
    width: 150
  },
  {
    title: '事故级别',
    dataIndex: 'levelName',
    key: 'levelName',
    align: 'center',
    width: 100
  },
  {
    title: '伤亡人数（内部）',
    dataIndex: 'insideNum',
    key: 'insideNum',
    align: 'center',
    width: 150
  },
  {
    title: '伤亡人数（地方）',
    dataIndex: 'localNum',
    key: 'localNum',
    align: 'center',
    width: 150
  },
  {
    title: '事故经过',
    dataIndex: 'summary',
    key: 'summary',
    align: 'center',
    width: 150
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    align: 'center',
    width: 150
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    width: 240
  }
])

const data = ref<AccidentRecord[]>([])
const currentSelectData = ref<AccidentRecord>()
const totalNum = ref(0)

const onPageChange = (page: number) => {
  queryParams.pageNum = page
  handleQuery()
}

const queryParams = reactive<QueryAccidentParams>({
  pageNum: 1,
  pageSize: 8,
  deptId: undefined,
  dayRange: [],
  unit: ''
})
const handleQuery = async () => {
  const { rows, total } = await getAccidentList(queryParams)
  data.value = rows
  totalNum.value = total
}

const handleReset = () => {
  queryParams.pageNum = 1
  queryParams.unit = ''
  queryParams.dayRange = []
  queryParams.deptId = undefined
  handleQuery()
}

const isView = ref(false)
const handleView = (record: AccidentRecord) => {
  currentSelectData.value = record
  isView.value = true
  visible.value = true
}

const handleUpdate = (record: AccidentRecord) => {
  currentSelectData.value = record
  visible.value = true
}

const handleDelete = async (record: AccidentRecord) => {
  const { code, msg } = await deleteAccident(record.accidentId)
  const success = code === 0
  if (success) {
    message.success('删除成功')
    handleReset()
  } else {
    message.error(msg)
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

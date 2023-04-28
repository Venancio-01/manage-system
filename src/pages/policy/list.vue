<template>
  <ListLayout :menu-visible="false">
    <PolicyDialog
      v-model:visible="visible"
      :is-view="isView"
      :data="currentSelectData"
      @completed="handleQuery"
      @close="handleDialogClose"
    ></PolicyDialog>

    <div class="flex mb-4">
      <a-form class="flex-1" layout="inline" :model="queryParams" autocomplete="off" @submit="handleQuery">
        <a-form-item label="政策法规名称" name="name">
          <a-input v-model:value="queryParams.name" placeholder="请输入政策法规名称"></a-input>
        </a-form-item>

        <a-form-item label="类型" name="type">
          <a-select v-model:value="queryParams.type" placeholder="请选择类型" class="!w-[150px]">
            <a-select-option v-for="(value, key) in mediaTypeNames" :key="key" :value="key">{{ value.zh }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>

      <div class="w-[200px] flex justify-center">
        <a-button type="primary" class="mr-4" @click="handleQuery">查询</a-button>
        <a-button @click="handleReset">重置</a-button>
      </div>
    </div>

    <div class="mb-4">
      <a-button type="primary" @click="handleAdd">新增政策法规</a-button>
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
        <template v-if="column.dataIndex === 'type'">
          <div>
            {{ mediaTypeNames[record.type].zh }}
          </div>
        </template>

        <!-- 操作 -->
        <template v-if="column.dataIndex === 'action'">
          <a-button type="text" @click="handleView(record)">详情</a-button>
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
import { message, TableColumnsType } from 'ant-design-vue'
import PolicyDialog from './components/PolicyDialog.vue'
import { deletePolicy, getPolicyList, PolicyRecord, QueryPolicyParams } from '@/api/policy'

const store = useStore()
const { mediaTypeNames } = storeToRefs(store)

const visible = ref(false)
const handleAdd = () => {
  visible.value = true
}
const columns = ref<TableColumnsType>([
  {
    title: '政策法规',
    dataIndex: 'name',
    key: 'name',
    align: 'center'
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    width: 240
  }
])

const data = ref<PolicyRecord[]>([])
const currentSelectData = ref<PolicyRecord>()
const totalNum = ref(0)

const onPageChange = (page: number) => {
  queryParams.pageNum = page
  handleQuery()
}

const queryParams = reactive<QueryPolicyParams>({
  pageNum: 1,
  pageSize: 8,
  name: '',
  type: undefined
})
const handleQuery = async () => {
  const { rows, total } = await getPolicyList(queryParams)
  data.value = rows
  totalNum.value = total
}

const handleReset = () => {
  queryParams.pageNum = 1
  queryParams.name = ''
  queryParams.type = undefined
  handleQuery()
}

const isView = ref(false)
const handleView = (record: PolicyRecord) => {
  currentSelectData.value = record
  isView.value = true
  visible.value = true
}

const handleDelete = async (record: PolicyRecord) => {
  const { code, msg } = await deletePolicy(record.policyId)
  const success = code === 0
  if (success) {
    message.success('删除成功')
    handleReset()
  } else {
    message.error(msg)
  }
}

const handleDialogClose = () => {
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

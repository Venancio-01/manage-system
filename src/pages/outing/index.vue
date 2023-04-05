<template>
  <AddOutingRecord v-model:visible="visible"></AddOutingRecord>
  <div class="flex mb-4">
    <a-form
      class="flex-1"
      layout="inline"
      :model="formState"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item label="用户名" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
    </a-form>

    <div class="w-[200px] flex justify-center">
      <a-button type="primary" class="mr-4">查询</a-button>
      <a-button>重置</a-button>
    </div>
  </div>
  <div class="mb-4">
    <a-button type="primary" @click="handleAdd">新增</a-button>
  </div>
  <a-table :columns="columns" :data-source="[]"></a-table>
</template>

<script lang="ts" setup>
import AddOutingRecord from './components/AddOutingRecord.vue'

type FormState = {
  name: string
}

const formState = reactive<FormState>({
  name: ''
})

const onFinish = () => {}
const onFinishFailed = () => {}

const visible = ref(false)
const handleAdd = () => {
  visible.value = true
}

const columns = ref([
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address'
  }
])
</script>

<style scoped>
:deep(.ant-form-item-label label) {
  @apply text-normal;
}
</style>

<template>
  <a-modal v-model:visible="show" :title="title" :width="600" ok-text="确定" cancel-text="取消" :mask-closable="false">
    <a-form
      ref="formRef"
      layout="inline"
      :model="formState"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
      autocomplete="off"
      :hide-required-mark="isView"
    >
      <a-table :columns="columns" :data-source="dataSource" :pagination="false" class="w-full">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'input'">
            <a-form-item :name="record.id" :rules="[{ required: true, message: '请输入' }]">
              <span v-if="isView">{{ formState[record.id] }}</span>
              <a-input-number v-else v-model:value="formState[record.id]" placeholder="请输入"></a-input-number>
            </a-form-item>
          </template>
        </template>
      </a-table>
    </a-form>

    <template #footer>
      <div class="flex justify-end">
        <a-button @click="handleCancel">取消</a-button>
        <a-button v-if="!isView" type="primary" @click="handleConfirm">确定</a-button>
      </div>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import { message, FormInstance } from 'ant-design-vue'
import type { TableColumnsType } from 'ant-design-vue'
import { getDisciplineDetail, saveDiscipline, DisciplineRecord, updateDiscipline } from '@/api/discipline'

type Props = {
  visible: boolean
  isView?: boolean
  data?: DisciplineRecord
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  isView: false,
  data: undefined
})
const emits = defineEmits(['update:visible', 'close', 'completed'])
const store = useStore()
const { disciplineTree } = storeToRefs(store)
const isEdit = computed(() => !!props.data)
const title = computed(() => (isEdit.value ? (props.isView ? '作风纪律详情' : '作风纪律编辑') : '作风纪律登记'))
const show = computed({
  get: () => props.visible,
  set: (val: boolean) => {
    emits('update:visible', val)
  }
})

const formRef = ref<FormInstance | null>(null)
const formState = reactive({})

const rowSpanMap = computed(() => {
  let pos = 0
  const map = {}
  const length = dataSource.value.length
  for (let i = 0; i < length; i++) {
    const item = dataSource.value[i]
    map[i] = 1
    if (i === 0) {
      map[pos] = 1
      pos = 0
    } else {
      if (item.parentId === dataSource.value[i - 1].parentId) {
        map[pos] = map[pos] + 1
        map[i] = 0
      } else {
        pos = i
      }
    }
  }
  return map
})

const columns = ref<TableColumnsType>([
  {
    dataIndex: 'parentName',
    key: 'parentName',
    customCell: (record, index) => {
      return {
        rowSpan: rowSpanMap.value[index]
      }
    }
  },
  {
    dataIndex: 'name',
    key: 'name'
  },
  {
    dataIndex: 'input',
    key: 'input'
  }
])

const dataSource = ref([])

const handleInitData = () => {
  dataSource.value = disciplineTree.value.reduce((acc, cur) => {
    const children = cur.children || []
    const parseChildren = children.map(item => {
      return {
        ...item,
        parentName: cur.name
      }
    })

    acc.push(...parseChildren)
    return acc
  }, [])
}

const handleInitFormState = () => {
  for (let index = 0; index < dataSource.value.length; index++) {
    const element = dataSource.value[index]
    formState[element.id] = 0
  }
}

const handleInit = async () => {
  handleInitData()
  handleInitFormState()

  if (isEdit.value || props.isView) {
    const { data = [] } = await getDisciplineDetail(props.data.disciplineId)
    data.forEach(item => {
      formState[item.typeId] = item.num
    })
  }
}

watch(show, val => {
  if (val) {
    handleInit()
  } else {
    formRef.value?.resetFields()
    emits('close')
  }
})

const handleSave = async () => {
  const postData = Object.keys(formState).map(key => {
    return {
      typeId: Number(key),
      num: formState[key] as number
    }
  })
  return await saveDiscipline(postData)
}

const handleUpdate = async () => {
  const postData = {
    disciplineId: 0,
    list: []
  }

  postData.list = Object.keys(formState).map(key => {
    return {
      typeId: Number(key),
      num: formState[key] as number
    }
  })
  postData.disciplineId = props.data.disciplineId
  return await updateDiscipline(postData)
}

const handleConfirm = () => {
  formRef.value.validate().then(async () => {
    const { code, msg } = isEdit.value ? await handleUpdate() : await handleSave()
    const success = code === 0
    if (success) {
      message.success(msg)
      formRef.value.resetFields()
      show.value = false
      emits('completed')
    } else {
      message.error(msg)
    }
  })
}

const handleCancel = () => {
  show.value = false
}
</script>

<style scoped>
:deep(.ant-table-tbody > tr > td) {
  padding: 8px;
}

:deep(.ant-table thead) {
  display: none;
}
</style>

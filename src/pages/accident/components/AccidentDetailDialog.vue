<template>
  <a-modal v-model:visible="show" :title="title" :width="600" ok-text="确定" cancel-text="取消" :mask-closable="false">
    <a-form
      ref="formRef"
      class="!pr-6"
      :model="formState"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
      autocomplete="off"
      :hide-required-mark="isView"
    >
      <a-form-item label="事故单位" name="unit" :rules="[{ required: true, message: '请输入事故单位' }]">
        <span v-if="isView">{{ formState.unit }}</span>
        <a-input v-else v-model:value="formState.unit" placeholder="请输入事故单位"></a-input>
      </a-form-item>

      <a-form-item label="事故类型" name="typeIds" :rules="[{ required: true, message: '请选择事故类型' }]">
        <span v-if="isView">{{ typeName }}</span>
        <a-cascader
          v-else
          v-model:value="formState.typeIds"
          :options="options"
          :load-data="loadData"
          placeholder="请选择事故类型"
        ></a-cascader>
      </a-form-item>

      <a-form-item label="事故级别" name="levelId" :rules="[{ required: true, message: '请选择事故级别' }]">
        <span v-if="isView">{{ levelName }}</span>
        <a-select v-else v-model:value="formState.levelId" placeholder="请选择事故级别">
          <a-select-option v-for="item in accidentLevels" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="事故日期" name="day" :rules="[{ required: true, message: '请选择事故日期' }]">
        <span v-if="isView">{{ formState.day }}</span>
        <a-date-picker
          v-else
          v-model:value="formState.day"
          class="w-full"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          placeholder="请选择事故日期"
        ></a-date-picker>
      </a-form-item>

      <a-form-item label="内部伤亡人数" name="insideNum" :rules="[{ required: true, message: '请输入内部伤亡人数' }]">
        <span v-if="isView">{{ formState.insideNum }}</span>
        <a-input-number v-else v-model:value="formState.insideNum" class="!w-full" placeholder="请输入内部伤亡人数"></a-input-number>
      </a-form-item>

      <a-form-item label="地方伤亡人数" name="localNum" :rules="[{ required: true, message: '请输入地方伤亡人数' }]">
        <span v-if="isView">{{ formState.localNum }}</span>
        <a-input-number v-else v-model:value="formState.localNum" class="!w-full" placeholder="请输入地方伤亡人数"></a-input-number>
      </a-form-item>

      <a-form-item label="简要经过" name="summary" :rules="[{ max: 200, message: '最多输入200字符' }]">
        <span v-if="isView">{{ formState.summary }}</span>
        <a-textarea v-else v-model:value="formState.summary" :rows="4" placeholder="请输入简要经过"></a-textarea>
      </a-form-item>

      <a-form-item label="备注" name="remark" :rules="[{ max: 200, message: '最多输入200字符' }]">
        <span v-if="isView">{{ formState.remark }}</span>
        <a-textarea v-else v-model:value="formState.remark" :rows="4" placeholder="请输入备注"></a-textarea>
      </a-form-item>
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
import { saveAccident, updateAccident, getAccidentTypes, SaveAccidentParams, AccidentRecord } from '@/api/accident'
import type { CascaderProps } from 'ant-design-vue'

type Props = {
  visible: boolean
  isView?: boolean
  data?: AccidentRecord
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  isView: false,
  data: undefined
})
const emits = defineEmits(['update:visible', 'close', 'completed'])
const store = useStore()
const { accidentTypes, accidentLevels } = storeToRefs(store)
const isEdit = computed(() => !!props.data)
const title = computed(() => (isEdit.value ? (props.isView ? '事故详情' : '事故编辑') : '事故登记'))
const show = computed({
  get: () => props.visible,
  set: (val: boolean) => {
    emits('update:visible', val)
  }
})

const formRef = ref<FormInstance | null>(null)
const formState = reactive<SaveAccidentParams>({
  unit: '',
  day: '',
  levelId: undefined,
  typeIds: [],
  localNum: 0,
  insideNum: 0,
  summary: '',
  remark: ''
})

const typeName = computed(() => {
  if (hasSecondaryLevelType.value) {
    const firstType = options.value.find(item => item.value === props.data?.ptypeId)
    const firstTypeName = firstType?.label

    const children = firstType.children || []

    const secondaryType = children.find(item => item.value === props.data?.typeId)
    const secondaryTypeName = secondaryType?.label

    return `${firstTypeName} - ${secondaryTypeName}`
  } else {
    const type = options.value.find(item => item.value === props.data?.typeId)
    return type ? type.label : ''
  }
}, null)

const levelName = computed(() => {
  const level = accidentLevels.value.find(item => Number(item.id) === formState.levelId)
  return level ? level.name : ''
})

// 是否选择了二级的事故类型
const hasSecondaryLevelType = computed(() => {
  return !accidentTypes.value.find(item => Number(item.id) === props.data?.typeId)
})

const options = ref<CascaderProps['options']>([])
const setOptions = async () => {
  options.value = accidentTypes.value.map(item => {
    return {
      value: item.id,
      label: item.name,
      isLeaf: false
    }
  })

  if (!hasSecondaryLevelType.value) return

  const { data } = await getAccidentTypes(props.data.ptypeId + '')

  options.value = options.value.map(item => {
    if (item.value !== props.data.ptypeId) return item

    const children = data.map(item => {
      return {
        value: item.id,
        label: item.name,
        isLeaf: true
      }
    })

    return {
      ...item,
      children
    }
  })
}

const setFormState = async () => {
  if (!props.data) return
  Object.keys(props.data).forEach(key => {
    if (key in formState) {
      formState[key] = props.data[key]
    }
  })

  formState.typeIds = hasSecondaryLevelType.value ? [props.data.ptypeId, props.data.typeId] : [props.data.typeId]
}

watch(show, val => {
  if (val) {
    setFormState()
    setOptions()
  } else {
    formRef.value?.resetFields()
    emits('close')
  }
})

const loadData: CascaderProps['loadData'] = async selectedOptions => {
  const targetOption = selectedOptions[selectedOptions.length - 1]
  targetOption.loading = true

  const id = targetOption.value + ''
  const { data } = await getAccidentTypes(id)

  const children = data.map(item => {
    return {
      value: item.id,
      label: item.name,
      isLeaf: true
    }
  })

  const noChildren = children.length === 0
  if (noChildren) {
    targetOption.isLeaf = true
  } else {
    targetOption.isLeaf = false
    targetOption.children = children
  }
  options.value = [...options.value]
}

const handleSave = async () => {
  return await saveAccident(formState)
}

const handleUpdate = async () => {
  const postData = {
    ...formState,
    accidentId: props.data.accidentId
  }
  return await updateAccident(postData)
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

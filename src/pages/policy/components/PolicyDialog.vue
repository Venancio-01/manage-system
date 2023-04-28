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
      <a-form-item label="政策法规名称" name="name" :rules="[{ required: true, message: '请输入政策法规名称' }]">
        <span v-if="isView">{{ formState.name }}</span>
        <a-input v-else v-model:value="formState.name" placeholder="请输入政策法规名称"></a-input>
      </a-form-item>

      <a-form-item label="文件类型" name="type" :rules="[{ required: true, message: '请选择文件类型' }]">
        <span v-if="isView"> {{ mediaTypeNames[formState.type]?.zh }}</span>
        <a-select v-else v-model:value="formState.type" placeholder="请选择文件类型" @change="handleTypeChange">
          <a-select-option v-for="(value, key) in mediaTypeNames" :key="key" :value="key">{{ value.zh }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="上传文件" name="files" :rules="[{ type: 'array', required: true, message: '请选择文件' }]">
        <div v-if="isView" class="">
          <div v-for="(item, index) in returnedFiles" :key="index" class="mb-2">
            <a :href="item.path" target="_blank">{{ item.fileName }}</a>
          </div>
        </div>
        <a-upload
          v-else
          v-model:file-list="formState.files"
          :accept="currentAccept"
          name="files"
          :before-upload="beforeUpload"
          multiple
          @remove="handleRemoveUploadFile"
        >
          <a-button>
            <UploadOutlined></UploadOutlined>
            选择文件
          </a-button>
        </a-upload>
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
import type { UploadProps } from 'ant-design-vue'
import { getPolicyDetail, PolicyRecord, savePolicy, SavePolicyParams, MsdFile } from '@/api/policy'
import { UploadOutlined } from '@ant-design/icons-vue'
import { MediaType } from '@/types'

type Props = {
  visible: boolean
  isView?: boolean
  data?: PolicyRecord
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  isView: false,
  data: undefined
})
const emits = defineEmits(['update:visible', 'close', 'completed'])
const store = useStore()
const { mediaTypeNames } = storeToRefs(store)
const title = computed(() => (props.isView ? '政策法规详情' : '新增政策法规'))
const show = computed({
  get: () => props.visible,
  set: (val: boolean) => {
    emits('update:visible', val)
  }
})

const formRef = ref<FormInstance | null>(null)
const formState = reactive<SavePolicyParams>({
  name: '',
  type: undefined,
  files: []
})

const beforeUpload: UploadProps['beforeUpload'] = file => {
  formState.files = [...formState.files, file]
  return false
}

const handleRemoveUploadFile: UploadProps['onRemove'] = file => {
  formState.files = formState.files.filter(item => item.name !== file.name)
}

const returnedFiles = ref<MsdFile[]>([])
const handleGetDetail = async () => {
  if (!props.data) return
  const { data } = await getPolicyDetail(props.data?.policyId)
  formState.name = data.name
  formState.type = data.type
  returnedFiles.value = data.msdFiles || []
}

const currentAccept = ref('')
const acceptMap = {
  [MediaType.AUDIO]: 'audio/*',
  [MediaType.VIDEO]: 'video/*',
  [MediaType.FILE]: '*',
  [MediaType.IMAGE]: 'image/*'
}
const handleTypeChange = (value: MediaType) => {
  currentAccept.value = acceptMap[value]
}

const handleSave = async () => {
  return await savePolicy(formState)
}

const handleConfirm = () => {
  formRef.value.validate().then(async () => {
    const { code, msg } = await handleSave()
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

const handleReset = () => {
  currentAccept.value = ''
  formRef.value?.resetFields()
  emits('close')
}

const handleCancel = () => {
  show.value = false
}

watch(show, val => {
  if (val) {
    handleGetDetail()
  } else {
    handleReset()
  }
})
</script>

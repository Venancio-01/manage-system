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
      <a-form-item label="姓名" name="name" :rules="[{ required: true, message: '请输入姓名' }]">
        <span v-if="isView">{{ formState.name }}</span>
        <a-input v-else v-model:value="formState.name" placeholder="请输入姓名"></a-input>
      </a-form-item>

      <a-form-item label="军衔" name="rank" :rules="[{ required: true, message: '请输入军衔' }]">
        <span v-if="isView">{{ formState.rank }}</span>
        <a-input v-else v-model:value="formState.rank" placeholder="请输入军衔"></a-input>
      </a-form-item>

      <a-form-item label="省份" name="province" :rules="[{ required: true, message: '请选择省份' }]">
        <span v-if="isView">{{ provinceName }}</span>
        <a-select v-else v-model:value="formState.province" placeholder="请选择省份">
          <a-select-option v-for="item in provinces" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="城市/地区" name="city" :rules="[{ required: true, message: '请选择城市/地区' }]">
        <span v-if="isView">{{ cityName }}</span>
        <a-select v-else v-model:value="formState.city" placeholder="请选择城市/地区">
          <a-select-option v-for="item in cities" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="详细地址" name="address" :rules="[{ required: true, message: '请输入详细地址' }]">
        <span v-if="isView">{{ formState.address }}</span>
        <a-input v-else v-model:value="formState.address" placeholder="请输入详细地址"></a-input>
      </a-form-item>

      <a-form-item label="原因" name="typeId" :rules="[{ required: true, message: '请选择原因' }]">
        <span v-if="isView">{{ reasonName }}</span>
        <a-select v-else v-model:value="formState.typeId" placeholder="请选择原因">
          <a-select-option v-for="item in reasons" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="外出日期" name="startDay" :rules="[{ required: true, message: '请选择外出日期' }]">
        <span v-if="isView">{{ formState.startDay }}</span>
        <a-date-picker
          v-else
          v-model:value="formState.startDay"
          class="w-full"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          :disabled-date="disabledStartDate"
          placeholder="请选择外出日期"
        ></a-date-picker>
      </a-form-item>

      <a-form-item label="预计归队日期" name="returnDay" :rules="[{ required: true, message: '请选择预计归队日期' }]">
        <span v-if="isView">{{ formState.returnDay }}</span>
        <a-date-picker
          v-else
          v-model:value="formState.returnDay"
          class="w-full"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          :disabled-date="disabledReturnDate"
          placeholder="请选择预计归队日期"
        ></a-date-picker>
      </a-form-item>

      <a-form-item label="联系方式" name="contact" :rules="[{ required: true, message: '请输入联系方式' }]">
        <span v-if="isView">{{ formState.contact }}</span>
        <a-input v-else v-model:value="formState.contact" placeholder="请输入联系方式"></a-input>
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
import { saveOutingRecord, OutingRecord, SaveOutingRecordParams, updateOutingRecord } from '@/api/outing'
import { getRegions } from '@/api/misc/region'
import { message, FormInstance } from 'ant-design-vue'
import { Dayjs } from 'dayjs'
import { IdNameType } from '@/types'

type Props = {
  visible: boolean
  isView?: boolean
  data?: OutingRecord
}

const props = withDefaults(defineProps<Props>(), {
  visible: false
})
const emits = defineEmits(['update:visible', 'close', 'completed'])
const store = useStore()
const { reasons, regions } = storeToRefs(store)
const isEdit = computed(() => !!props.data)
const title = computed(() => (isEdit.value ? (props.isView ? '外出详情' : '外出编辑') : '外出登记'))
const show = computed({
  get: () => props.visible,
  set: (val: boolean) => {
    emits('update:visible', val)
  }
})

const setFormState = async () => {
  if (!props.data) return
  Object.keys(props.data).forEach(key => {
    if (key in formState) {
      formState[key] = props.data[key]
    }
  })
}

const provinces = computed(() => regions.value)
const cities = ref<IdNameType[]>([])

const formState = reactive<SaveOutingRecordParams>({
  name: '',
  rank: '',
  province: undefined,
  city: undefined,
  address: '',
  typeId: undefined,
  startDay: '',
  returnDay: '',
  contact: '',
  remark: ''
})

watch(
  () => formState.province,
  async value => {
    if (value === '') {
      cities.value = []
      return
    }

    const { data } = await getRegions(value)
    cities.value = data
  }
)

const disabledStartDate = (current: Dayjs) => {
  if (formState.returnDay) {
    return current.isAfter(formState.returnDay, 'day')
  } else return null
}

const disabledReturnDate = (current: Dayjs) => {
  if (formState.startDay) {
    return current.isBefore(formState.startDay, 'day')
  } else return null
}

const formRef = ref<FormInstance | null>(null)

const handleAdd = async () => {
  return await saveOutingRecord(formState)
}

const handleUpdate = async () => {
  const postData = {
    ...formState,
    outId: props.data?.outId
  }
  return await updateOutingRecord(postData)
}

const handleConfirm = () => {
  formRef.value.validate().then(async () => {
    const { code, msg } = isEdit.value ? await handleUpdate() : await handleAdd()
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
  formRef.value.resetFields()
  show.value = false
}

const provinceName = computed(() => {
  const province = provinces.value.find(item => item.id === formState.province)
  return province?.name
})

const cityName = computed(() => {
  const city = cities.value.find(item => item.id === formState.city)
  return city?.name
})

const reasonName = computed(() => {
  const reason = reasons.value.find(item => item.id === formState.typeId)
  return reason?.name
})

watch(show, val => {
  if (val) {
    setFormState()
  } else {
    formRef.value?.resetFields()
    emits('close')
  }
})
</script>

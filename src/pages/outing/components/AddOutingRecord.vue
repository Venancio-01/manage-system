<template>
  <a-modal v-model:visible="show" title="新增外出登记" :width="600" ok-text="确定" cancel-text="取消" @ok="handleOk">
    <a-form :model="formState" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" autocomplete="off">
      <a-form-item label="军衔">
        <a-input v-model:value="formState.rank"></a-input>
      </a-form-item>

      <a-form-item label="省份">
        <a-select v-model:value="formState.rank"></a-select>
      </a-form-item>

      <a-form-item label="城市">
        <a-select v-model:value="formState.rank"></a-select>
      </a-form-item>

      <a-form-item label="详细地址">
        <a-input v-model:value="formState.rank"></a-input>
      </a-form-item>

      <a-form-item label="原因">
        <a-select v-model:value="formState.rank"></a-select>
      </a-form-item>

      <a-form-item label="外出日期">
        <a-date-picker v-model:value="formState.startDay" class="w-full" placeholder="请选择外出日期"></a-date-picker>
      </a-form-item>

      <a-form-item label="预计归队日期">
        <a-date-picker v-model:value="formState.returnDay" class="w-full" placeholder="请选择预计归队日期"></a-date-picker>
      </a-form-item>

      <a-form-item label="联系方式">
        <a-input v-model:value="formState.rank"></a-input>
      </a-form-item>

      <a-form-item label="备注">
        <a-textarea v-model:value="formState.remark" :rows="4"></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { OutingRecord } from '@/api/outing/create'

type Props = {
  visible: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: false
})
const emits = defineEmits(['update:visible'])
const show = computed({
  get: () => props.visible,
  set: (val: boolean) => {
    emits('update:visible', val)
  }
})

const formState = reactive<OutingRecord>({
  rank: '',
  province: '',
  city: '',
  address: '',
  typeId: '',
  startDay: '',
  returnDay: '',
  contact: '',
  remark: ''
})

const handleOk = () => {}
</script>

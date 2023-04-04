<template>
  <div class="h-full flex justify-center items-center">
    <div class="w-[500px] h-[400px] bg-gray-700">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item label="Username" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.userName" />
        </a-form-item>

        <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { login, LoginParams } from '@/api/login'

const formState = reactive<LoginParams>({
  userName: '',
  password: ''
})

const onFinish = async () => {
  const result = await login(formState)
  console.log('🚀 ~ file: login.vue:31 ~ handleSubmit ~ result:', result)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>

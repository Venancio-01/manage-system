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
        <a-form-item label="用户名" name="userName" :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.userName" />
        </a-form-item>

        <a-form-item label="密码" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { login, LoginParams } from '@/api/login'
import storage from '@/utils/storage'
import { message } from 'ant-design-vue'

const router = useRouter()

const formState = reactive<LoginParams>({
  userName: '',
  password: ''
})

const onFinish = async () => {
  const { code, data, msg } = await login(formState)
  const success = code === 0
  if (!success) {
    return message.error(msg)
  }
  storage.setToken(data)
  router.push('/')
}

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo)
}
</script>

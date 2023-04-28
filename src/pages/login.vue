<template>
  <div class="h-full flex justify-center items-center">
    <div class="w-[480px] h-[440px] bg-[url('@/assets/images/框.png')] bg-no-repeat bg-contain p-8 px-16">
      <h4 class="flex justify-center items-center py-4 text-lg text-white">登录</h4>
      <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item name="userName" :rules="[{ required: true, message: 'Please input your username!' }]">
          <input
            v-model="formState.userName"
            class="white-color bg-[#003e5c] border border-[#0a5e7f] px-4 pl-12 rounded-md w-full h-12"
            placeholder="请输入用户名"
          />
          <div class="absolute left-0 top-0 flex justify-center items-center h-full w-12">
            <img class="w-[22px]" src="@/assets/images/用户名.png" />
          </div>
        </a-form-item>

        <a-form-item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
          <input
            v-model="formState.password"
            type="password"
            class="white-color bg-[#003e5c] border border-[#0a5e7f] px-4 pl-12 rounded-md w-full h-12"
            placeholder="请输入密码"
          />
          <div class="absolute left-0 top-0 flex justify-center items-center h-full w-12">
            <img class="w-[22px]" src="@/assets/images/密码.png" />
          </div>
        </a-form-item>

        <a-form-item>
          <button class="w-full text-black bg-[#60caeb] rounded-md py-1 mt-4 h-[40px]" type="submit">登录</button>
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

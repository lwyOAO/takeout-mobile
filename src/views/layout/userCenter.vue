<script setup>
import { useRouter } from 'vue-router'
import { userLogout } from '@/api/login'
import { showNotify } from 'vant'
import 'vant/es/notify/style'

const router = useRouter()

const OnLogout = async () => {
  const res = await userLogout()
  if (res.data.code === 1) {
    // 登出成功
    showNotify({ type: 'success', message: '登出成功' })
    router.push('/login')
  } else {
    // 登出失败
    showNotify({ type: 'danger', message: '登出失败' })
  }
}
</script>

<template>
  <van-button type="primary" @click="OnLogout">登出</van-button>
</template>
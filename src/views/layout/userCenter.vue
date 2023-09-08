<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const onSub = () => {
  router.push('/login')
}
</script>

<template>
  <van-button type="primary" @click="onSub">登录</van-button>
</template>
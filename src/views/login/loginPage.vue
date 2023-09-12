<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { userLogin, userRegister } from '@/api/login.js'
import { showNotify } from 'vant'
import 'vant/es/notify/style'

const router = useRouter()

const title = ref('登录')
const formModel = ref({
  phone: '',
  password: ''
})
// 注册和登录切换, true为登录，false为注册
const visiable = ref(true)
const GoRegister = () => {
  title.value = '注册'
  visiable.value = false
}
const GoLand = () => {
  title.value = '登录'
  visiable.value = true
}

// 登录
const OnLand = async () => {
  const res = await userLogin(formModel.value)
  console.log('登录成功')
  console.log(res)
  if (res.data.code === 1) {
    // 登录成功
    showNotify({ type: 'success', message: '登录成功' })
    router.push('/')
  } else {
    showNotify({ type: 'danger', message: res.data.msg })
  }
}

// 注册
const OnRegister = async () => {
  const res = await userRegister(formModel.value)
  if (res.data.code === 1) {
    showNotify({ type: 'success', message: '注册成功' })
    title.value = '登录'
    visiable.value = true
  } else {
    showNotify({ type: 'danger', message: '注册失败' })
  }
}
</script>

<template>
  <div class="top">
    <van-nav-bar :title="title" left-arrow @click-left="router.push('/main')" />
    <div class="container">
      <!--登录表单-->
      <van-form @submit="OnLand" v-if="visiable">
        <van-cell-group inset>
          <van-field
            v-model="formModel.phone"
            name="电话号码"
            label="电话号码"
            placeholder="电话号码"
            :rules="[{ required: true, message: '请填写电话号码' }]"
          />
          <van-field
            v-model="formModel.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>

        <div style="margin: 20px">
          <a href="#" @click="GoRegister">注册 -></a>
        </div>

        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>

      <!--注册表单-->
      <van-form @submit="OnRegister" v-else>
        <van-cell-group inset>
          <van-field
            v-model="formModel.phone"
            name="电话号码"
            label="电话号码"
            placeholder="电话号码"
            :rules="[{ required: true, message: '请填写电话号码' }]"
          />
          <van-field
            v-model="formModel.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>

        <div class="tip">
          <a href="#" @click="MissPwd">忘记密码？</a>
          <a href="#" @click="GoLand">&lt;- 返回</a>
        </div>

        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            注册
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  height: 100vh;
  .container {
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .tip {
      margin: 20px 20px 20px 20px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

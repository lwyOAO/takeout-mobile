<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()

const title = ref('登录')
// 注册和登录切换, true为登录，false为注册
const visiable = ref(true)
const OnRegister = () => {
  title.value = '注册'
  visiable.value = false
}
const OnLand = () => {
  title.value = '登录'
  visiable.value = true
}
</script>

<template>
  <div class="top">
    <van-nav-bar :title="title" left-arrow @click-left="router.push('/main')" />
    <div class="container">
      <!--登录表单-->
      <van-form @submit="onSubmit" v-if="visiable">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>

        <div style="margin: 20px">
          <a href="#" @click="OnRegister">注册 -></a>
        </div>

        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>

      <van-form @submit="onSubmit" v-else>
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>

        <div class="tip">
          <a href="#" @click="MissPwd">忘记密码？</a>
          <a href="#" @click="OnLand">&lt;- 返回</a>
        </div>

        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            提交
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

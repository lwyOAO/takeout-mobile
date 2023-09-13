<script setup>
import { useRouter } from 'vue-router'
import { userLogout } from '@/api/login'
import { showNotify } from 'vant'
import 'vant/es/notify/style'
import { ref, onMounted } from 'vue'
import { getDefaultAddress } from '@/api/addressBook'

const router = useRouter()

// 登出
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

// 地址管理
const chosenAddressId = ref('1')
const list = ref([
  {
    id: '1',
    name: '张三',
    tel: '13000000000',
    address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
    isDefault: true
  },
  {
    id: '2',
    name: '李四',
    tel: '1310000000',
    address: '浙江省杭州市拱墅区莫干山路 50 号'
  }
])
// 获取默认地址
const initDefaultAddress = async () => {
  const res = await getDefaultAddress()
  const data = res.data.data
  if (res.data.code === 1) {
    console.log('地址')
    console.log(data)
    let address = {
      id: data.id,
      name: '我',
      tel: data.phone,
      address: data.provinceName + data.cityName + data.districtName
    }
    list.value.push(address)
  } else {
    showNotify({ type: 'danger', message: res.data.msg })
  }
}
initDefaultAddress()

const onAdd = () => {}
const onEdit = () => {}

onMounted(() => {
  // 获取具有特定类名的所有元素
  const elements = document.querySelectorAll('.van-address-list__bottom')

  // 设置这些元素的 position 属性为 'relative'（示例值）
  elements.forEach((element) => {
    element.style.position = 'relative'
  })
})
</script>

<template>
  <van-button type="primary" @click="OnLogout">登出</van-button>

  <van-address-list
    v-model="chosenAddressId"
    :list="list"
    :disabled-list="disabledList"
    default-tag-text="默认"
    @add="onAdd"
    @edit="onEdit"
    class="adress"
  />
</template>

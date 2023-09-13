<script setup>
import { ref } from 'vue'
import { getOrder } from '@/api/orderList'
import { showFailToast } from 'vant'
import localImage from '@/assets/images/images.jpg'

// 订单查询参数
const params = ref({
  page: 1,
  pageSize: 5
})
// 订单列表
const orderList = ref([])
const orderDetail = ref([])
// 获取订单
const getOrderList = async () => {
  const res = await getOrder(params.value)
  if (res.data.code === 1) {
    console.log('订单')
    console.log(res)
    orderList.value = res.data.data.records
  } else {
    showFailToast('获取订单失败')
  }
  orderDetail.value = orderList.value[0].orderDetails
}
getOrderList()
</script>

<template>
  <div class="top"><span>订单</span></div>
  <div class="middle">
    <van-card
      v-for="(item, index) in orderDetail"
      :key="index"
      :thumb="localImage"
      :num="item.number"
      :price="item.amount"
      :desc="item.dishFlavor"
      :title="item.name"
    >
      <template #tags>
        <van-tag plain type="primary">香</van-tag>
        <van-tag plain type="primary">美味</van-tag>
      </template>
      <template #footer>
        <van-button size="small" color="#fcad03">再来一单</van-button>
        <van-button size="small" color="#fcad03">评价</van-button>
      </template>
    </van-card>
  </div>
</template>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
}
.middle {
  padding-bottom: 50px;
  overflow: hidden;
}
</style>

<script setup>
import countBox from '@/components/countBox.vue'
import { ref } from 'vue'
import { useCartStore } from '@/stores/'

// 统计购买数量
const count = ref(0)
const countChange = (type) => {
  if (type === 'add') {
    count.value = count.value + 1
  } else if (type === 'sub') {
    count.value = count.value - 1
  }
}
const change = (value) => {
  if (value >= 0) {
    count.value = value
  }
}

// 购物车列表管理
const cartStore = useCartStore()
</script>

<template>
  <div class="cart-list">
    <div class="cart-item" v-for="item in cartStore.cartlist" :key="item">
      <van-checkbox v-model="checked"></van-checkbox>
      <div class="show">
        <img src="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg" />
      </div>
      <div class="info">
        <span class="tit text-ellipsis-2"
          >新华为Pad 14英寸 12+128英寸 远峰蓝M6平板电脑 智能安卓娱乐</span
        >
        <span class="bottom">
          <div class="price">$<span>1999.99</span></div>
          <countBox
            :modelValue="count"
            @change="countChange"
            @update:modelValue="change"
          ></countBox>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-list {
  background-color: antiquewhite;
  .van-checkbox {
    margin-left: 5px;
  }
  .cart-item {
    height: 100px;
    display: flex;
    justify-content: baseline;
    margin: 10px 10px;
    background-color: #fff;
    border-radius: 10px;
    .show {
      height: 100px;
      width: 80px;
      overflow: hidden;
      margin: 0 5px;
    }
    .info {
      .tit {
        height: 50px;
        width: 180px;
        margin-top: 5px;
      }
      .bottom {
        display: flex;
        margin: 13px 0;
        .price {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>

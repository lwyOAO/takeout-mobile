<script setup>
import countBox from '@/components/countBox.vue'
import { computed } from 'vue'
import { ref } from 'vue'
import { getCartList, orderSub } from '@/api/shoppingCart'
import { showFailToast, showSuccessToast } from 'vant'
import { getDefaultAddress } from '@/api/addressBook'

// 购物车列表管理
const cartList = ref([])
// 初始化获取购物车数据
const getCartData = async () => {
  const res = await getCartList()
  res.data.data.forEach((item) => {
    item.isChecked = true
  })
  if (res.data.code === 1) {
    cartList.value = res.data.data
  } else {
    showFailToast('获取购物车数据失败')
  }
}
getCartData()

// 总价格
const totalPrice = computed(() => {
  return cartList.value
    .filter((item) => item.isChecked)
    .reduce((sum, item) => sum + item.number * item.amount, 0)
    .toFixed(2)
})
// 选中件数
const cartSelTotal = computed(() => {
  return cartList.value
    .filter((item) => item.isChecked)
    .reduce((sum, item) => sum + item.number, 0)
})
// 总件数
const cartTotal = computed(() => {
  return cartList.value.reduce((sum, item) => sum + item.number, 0)
})

// 复选框管理
const toggleCheckBox = (goodId) => {
  const good = cartList.value.find((item) => item.id === goodId)
  good.isChecked = !good.isChecked
}

// 是否全选
const selAll = computed(() => {
  return cartList.value.every((item) => item.isChecked === true)
})
// 反选
const selectAll = () => {
  let isTrue = !selAll.value
  cartList.value.forEach((item) => (item.isChecked = isTrue))
}

const address = ref({
  id: 3
})
const params = ref({
  remark: '来多点辣', // 备注信息
  payMethod: 1,
  addressBookId: address.value.id
})

// 结算
const OnSub = async () => {
  const ares = await getDefaultAddress()
  if (ares.data.code === 1) {
    params.value.addressBookId = ares.data.data.id
  }
  const res = await orderSub(params.value)
  if (res.data.code === 1) {
    showSuccessToast('结算成功')
    getCartData()
  }
}
</script>

<template>
  <div class="head">
    <span>购物车</span>
  </div>
  <div class="edit">
    <div class="tip">
      共<label>{{ cartTotal }}</label
      >件商品
    </div>
    <div class="tip">
      <van-icon name="edit" />
      <button>编辑</button>
    </div>
  </div>
  <div class="cart-list">
    <div class="cart-item" v-for="(item, index) in cartList" :key="index">
      <van-checkbox
        :modelValue="item.isChecked"
        @click="toggleCheckBox(item.id)"
      ></van-checkbox>
      <div class="show">
        <img src="~@/assets/images/images.jpg" class="img" />
      </div>
      <div class="info">
        <span class="tit text-ellipsis-2"
          >{{ item.name }} ({{ item.dishFlavor }})</span
        >
        <span class="bottom">
          <div class="price">
            $<span>{{ item.amount }}</span>
          </div>
          <countBox
            :modelValue="item.number"
            @update:modelValue="(value) => (item.number = value)"
          ></countBox>
        </span>
      </div>
    </div>
  </div>

  <div class="footer">
    <van-checkbox :modelValue="selAll" @click="selectAll">全选</van-checkbox>
    <div>
      <span class="count">合计：$ </span>
      <label class="count">{{ totalPrice }}</label>
      <van-button
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        size="small"
        @click="OnSub"
      >
        结算 ({{ cartSelTotal }})
      </van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
}
.edit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #dcdcdc;
  .tip {
    height: 25px;
    margin: 0 5px;
    button {
      border: none;
      background-color: #dcdcdc;
    }
    label {
      margin: 0 5px;
      color: darkorange;
    }
  }
}
.cart-list {
  background-color: #dcdcdc;
  padding-bottom: 100px;
  .van-checkbox {
    margin-left: 5px;
  }
  .cart-item {
    height: 100px;
    display: flex;
    justify-content: baseline;
    margin: 0 10px 10px 10px;
    background-color: #fff;
    border-radius: 10px;
    .show {
      height: 100px;
      width: 80px;
      overflow: hidden;
      margin: 0 5px;
      padding: 5px 0;
      .img {
        max-width: 100%;
        max-height: 100%;
        display: block;
        margin: auto;
      }
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

.footer {
  position: fixed;
  bottom: 50px;
  width: 100%;
  height: 45px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  label {
    margin-right: 10px;
    color: darkorange;
  }
  .van-button {
    width: 70px;
  }
}
</style>

<script setup>
import countBox from '@/components/countBox.vue'
import { computed } from 'vue'
import { useCartStore } from '@/stores/'

// 购物车列表管理
const cartStore = useCartStore()
cartStore.getCartList()

// 总价格
const totalPrice = computed(() => {
  return cartStore.getSelPrice()
})
const cartSelTotal = computed(() => {
  return cartStore.getSelCartNum()
})
const cartTotal = computed(() => {
  return cartStore.getCartNum()
})

// 复选框管理
const toggleCheckBox = (goodId) => {
  cartStore.toggleSelStatus(goodId)
}

// 单件商品数量管理
const countChange = (value, goodId) => {
  cartStore.changeNum(goodId, value)
}

// 是否全选
const selAll = computed(() => {
  return cartStore.SelAll()
})
const selectAll = () => {
  cartStore.toggleSelAll(!cartStore.SelAll())
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
    <div class="cart-item" v-for="item in cartStore.cartlist" :key="item.id">
      <van-checkbox
        :modelValue="item.isChecked"
        @click="toggleCheckBox(item.goods_id)"
      ></van-checkbox>
      <div class="show">
        <img src="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg" />
      </div>
      <div class="info">
        <span class="tit text-ellipsis-2"
          >新华为Pad 14英寸 12+128英寸 远峰蓝M6平板电脑 智能安卓娱乐</span
        >
        <span class="bottom">
          <div class="price">
            $<span>{{ item.price }}</span>
          </div>
          <countBox
            :modelValue="item.goods_num"
            @update:modelValue="(value) => countChange(value, item.goods_id)"
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

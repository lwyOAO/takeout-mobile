import { ref } from 'vue'
import { defineStore } from 'pinia'

// 用户模块
export const useCartStore = defineStore(
  'cart-list',
  () => {
    const cartlist = ref([])

    // 获取购物车列表
    const getCartList = () => {
      const data = [
        {
          goods_id: 10040,
          goods_num: 5,
          id: 10664,
          is_delete: 0,
          user_id: 10034,
          price: 1999
        },
        {
          goods_id: 10041,
          goods_num: 5,
          id: 10665,
          is_delete: 0,
          user_id: 10034,
          price: 1999
        },
        {
          goods_id: 10042,
          goods_num: 5,
          id: 10664,
          is_delete: 0,
          user_id: 10034,
          price: 1999
        },
        {
          goods_id: 10043,
          goods_num: 5,
          id: 10664,
          is_delete: 0,
          user_id: 10034,
          price: 1999
        },
        {
          goods_id: 10044,
          goods_num: 5,
          id: 10664,
          is_delete: 0,
          user_id: 10034,
          price: 1999
        }
        // {
        //   goods_id: 10045,
        //   goods_num: 5,
        //   id: 10664,
        //   is_delete: 0,
        //   user_id: 10034,
        //   price: 1999
        // }
      ]
      // 手动给每一个数据增加一个isChecked状态
      const newData = data.map((item) => {
        return {
          ...item,
          isChecked: true
        }
      })

      cartlist.value = newData
    }

    // 获取购物车所有商品总数
    const getCartNum = () => {
      return cartlist.value.reduce((sum, item) => sum + item.goods_num, 0)
    }

    // 获取购物车选中商品列表
    const getSelCartList = () => {
      return cartlist.value.filter((item) => item.isChecked)
    }

    // 获取选中商品总数
    const getSelCartNum = () => {
      return getSelCartList().reduce((sum, item) => sum + item.goods_num, 0)
    }

    // 获取选中商品总价
    const getSelPrice = () => {
      return getSelCartList()
        .reduce((sum, item) => sum + item.goods_num * item.price, 0)
        .toFixed(2)
    }

    // 改变商品选中状态
    const toggleSelStatus = (goodId) => {
      const good = cartlist.value.find((item) => item.goods_id === goodId)
      good.isChecked = !good.isChecked
    }

    // 改变商品数量
    const changeNum = (goodId, value) => {
      const good = cartlist.value.find((item) => item.goods_id === goodId)
      good.goods_num = value
    }

    // 是否全选
    const SelAll = () => {
      return cartlist.value.every((item) => item.isChecked)
    }

    // 反选
    const toggleSelAll = (flag) => {
      cartlist.value.forEach((item) => (item.isChecked = flag))
    }

    return {
      getCartList,
      cartlist,
      getCartNum,
      getSelCartNum,
      getSelPrice,
      toggleSelStatus,
      changeNum,
      SelAll,
      toggleSelAll
    }
  },
  {
    persist: true
  }
)

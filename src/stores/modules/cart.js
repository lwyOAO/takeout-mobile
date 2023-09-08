import { ref } from 'vue'
import { defineStore } from 'pinia'

// 用户模块
export const useCartStore = defineStore(
  'cart-list',
  () => {
    const cartlist = ref([])

    // 获取购物车列表
    const getCartList = () => {
      const data = [{ goods_id: 10040, goods_num: 5 }]
      data.list.forEach((item) => {
        item.isChecked = false
      })
      cartlist.value = data
      // 手动给每一个数据增加一个isChecked状态
    }

    return {
      getCartList,
      cartlist
    }
  },
  {
    persist: true
  }
)

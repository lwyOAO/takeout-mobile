import request from '@/utils/request'

// 获取购物车数据
export const getCartList = () => request.get('/shoppingCart/list')

// 加入购物车
export const addCart = (data) => request.post('/shoppingCart/add', data)

// 下单
export const orderSub = (data) => request.post('/order', data)
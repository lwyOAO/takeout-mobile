import request from '@/utils/request'

// 用户下单
export const createOrder = (data) => request.post('/order/create', data)

// 获取订单
export const getOrder = (params) =>
  request.get('/order/userPage', {
    params
  })

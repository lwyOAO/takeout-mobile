import request from '@/utils/request'

// 新增地址
export const addAddress = (data) => request.post('/addressBook', data)

// 设置默认地址
export const setDefaultAddress = (data) =>
  request.put('/addressBook/default', data)

// 根据id查询地址
export const getAddressById = (id) => request.get(`/addressBook/${id}`)

// 查询默认地址
export const getDefaultAddress = (params) =>
  request.get('/addressBook/default', {
    params
  })

// 查询指定用户的全部地址
export const getAddressList = (params) =>
  request.get('/addressBook', {
    params
  })
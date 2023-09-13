import request from '@/utils/request'

// 新增地址
export const addAddress = (data) => request.post('/addressBook', data)

// 设置默认地址
export const setDefaultAddress = (data) =>
  request.put('/addressBook/default', data)

// 根据id查询地址
export const getAddressById = (id) => request.get(`/addressBook/${id}`)

// 获取默认地址
export const getDefaultAddress = () => request.get('/addressBook/default')

// 查询指定用户的全部地址
export const getAddressList = (params) =>
  request.get('/addressBook', {
    params
  })

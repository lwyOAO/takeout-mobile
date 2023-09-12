import request from '@/utils/request'

// 登录
export const userLogin = (data) => request.post('user/login', data)

// 注册
export const userRegister = (data) => request.post('user/register', data)

// 登出
export const userLogout = () => request.post('user/logout')
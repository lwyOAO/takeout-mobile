import request from '@/utils/request'

// 模糊查询菜品
export const getDishes = (params) =>
  request.get('/setmeal/page', {
    params
  })

// 菜品分页查询
export const foodCategoryPage = (params) =>
  request.get('/category/page', {
    params
  })

// 菜品分类获取
export const getFoodCategory = () => request.get('/category/list')

// 获取分类对应的菜品
export const getFoodCategoryDishes = (categoryId, status) =>
  request.get('/dish/list', {
    params: {
      categoryId,
      status
    }
  })

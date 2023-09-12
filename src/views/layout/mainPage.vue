<script setup>
import BScroll from 'better-scroll'
import { ref, computed, onMounted, nextTick } from 'vue'
import countBox from '@/components/countBox.vue'
import { getFoodCategory, getFoodCategoryDishes } from '@/api/foodSet.js'
import { showSuccessToast, showFailToast } from 'vant'
import { addCart } from '@/api/shoppingCart.js'

// 轮播图片链接
const images = ref([
  'src/assets/images/11680438_185250860101_2.jpg',
  'src/assets/images/12428763_220448096035_2.jpg'
])

// 右侧滑动的Y轴坐标 (滑动过程时实时变化)
const _scrollY = ref(0)
const _scrollX = ref(0)
// 所有右侧分类li的top组成的数组  (列表第一次显示后就不再变化)
const _tops = ref([])
const goods = ref([
  { name: 'A' },
  { name: 'B' },
  { name: 'C' },
  { name: 'D' },
  { name: 'E' },
  { name: 'D' },
  { name: 'F' },
  { name: 'G' },
  { name: 'H' },
  { name: 'I' },
  { name: 'J' }
])

const _foodsScroll = ref()
// 初始化滚动
const _initScroll = () => {
  // 列表显示之后创建
  new BScroll('.left', {
    click: true
  })
  _foodsScroll.value = new BScroll('.right', {
    probeType: 2, // 因为惯性滑动不会触发
    click: true
  })
  // 给右侧列表绑定scroll监听
  _foodsScroll.value.on('scroll', ({ x, y }) => {
    _scrollX.value = Math.abs(x)
    _scrollY.value = Math.abs(y)
  })

  // 给右侧列表绑定scroll结束的监听
  _foodsScroll.value.on('scrollEnd', ({ x, y }) => {
    _scrollX.value = Math.abs(x)
    _scrollY.value = Math.abs(y)
  })
}

// 绑定右侧列表元素
const foodsUl = ref()

// 初始化tops
const _initTops = () => {
  // 1. 初始化tops
  const tops = []
  let top = 0
  tops.push(top)
  // 2. 收集
  // 找到所有分类的li
  const lis = foodsUl.value.getElementsByClassName('food-list-hook')
  Array.prototype.slice.call(lis).forEach((li) => {
    top += li.clientHeight
    tops.push(top)
  })

  // 3. 更新数据
  _tops.value = tops
}

// 使用右侧列表滑动到对应的位置
const clickMenuItem = (index) => {
  // 得到目标位置的scrollY
  const scrollY = _tops.value[index]
  // 立即更新scrollY(让点击的分类项成为当前分类)
  _scrollY.value = scrollY
  // 平滑滑动右侧列表
  _foodsScroll.value.scrollTo(0, -scrollY, 300)
}
// 计算得到当前分类的下标
const currentIndex = computed(() => {
  // 根据条件计算产生一个结果
  const index = _tops.value.findIndex((top, index) => {
    // scrollY>=当前top && scrollY<下一个top
    return _scrollY.value >= top && _scrollY.value < _tops.value[index + 1]
  })
  // 返回结果
  return index
})

onMounted(() => {
  nextTick(() => {
    _initScroll()
    _initTops()
  })
})

// 分页数据
const CateParams = ref({
  page: 1,
  pageSize: 10
})

// 初始获取套餐数据
const foodClassList = ref([])
const foodList = ref([])
const getComboData = async () => {
  const res = await getFoodCategory(CateParams.value)
  console.log(res)
  if (res.data.code === 1) {
    foodClassList.value = res.data.data
  }
  // 获取右侧数据
  foodClassList.value.forEach(async (item) => {
    console.log('分支')
    console.log(item)
    let res = await getFoodCategoryDishes(item.id, 1)
    // 处理数据，加上count字段
    res.data.data.forEach((item) => {
      item.count = 0
    })
    console.log('👉')
    console.log(res)
    if (res.data.code === 1) {
      foodList.value.push(res.data.data)
    }
  })

  console.log('右侧')
  console.log(foodList.value)
  goods.value = foodList.value
}
getComboData()

// 弹窗
const showCenter = ref(false)

// 加入购物车
const OnaddCart = () => {
  // 对goods的每一个元素进行判断，若count>0则发送请求
  goods.value.forEach((items) => {
    items.forEach(async (item) => {
      if (item.count > 0) {
        console.log('item')
        console.log(item)
        // 发送请求
        const res = await addCart({
          name: item.name,
          dishId: item.id,
          setmealId: item.categoryId,
          number: item.count,
          amount: item.price,
          dishFlavor: '不要蒜,不辣'
        })
        console.log(res)
        if (res.data.code === 1) {
          showSuccessToast('加入购物车成功')
        } else {
          showFailToast('加入购物车失败')
        }
      }
    })
  })
}
</script>

<template>
  <!--轮播图-->
  <div class="my-swipe">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" class="img" />
      </van-swipe-item>
    </van-swipe>
  </div>

  <!--滑动列表-->
  <div>
    <div class="goods">
      <div class="left">
        <ul>
          <li
            class="menu-item"
            v-for="(foodclass, index) in foodClassList"
            :key="index"
            :class="{ current: index === currentIndex }"
            @click="clickMenuItem(index)"
          >
            <span class="text">
              <img class="icon" :src="foodclass.icon" v-if="foodclass.icon" />
              {{ foodclass.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="right">
        <ul ref="foodsUl">
          <li
            class="food-list-hook"
            v-for="(listItem, index) in goods"
            :key="index"
          >
            <ul>
              <li v-for="(food, sindex) in listItem" :key="sindex">
                <van-card
                  :num="1"
                  :price="food.price"
                  desc="美食点击就送"
                  :title="food.name"
                  thumb="src/assets/images/images.jpg"
                >
                  <template #tags>
                    <van-tag plain type="primary">人气火热</van-tag>
                  </template>
                  <template #footer>
                    <div class="footer">
                      <countBox
                        :modelValue="food.count"
                        @update:modelValue="
                          (value) => {
                            food.count = value
                          }
                        "
                      ></countBox>
                    </div>
                  </template>
                </van-card>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="bottom">
    <van-button
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      size="small"
      @click="OnaddCart"
      >加入购物车</van-button
    >
  </div>

  <!-- 圆角弹窗（居中） -->
  <van-popup
    v-model:show="showCenter"
    round
    closeable
    :style="{ padding: '64px' }"
  ></van-popup>
</template>

<style lang="scss" scoped>
.my-swipe {
  .van-swipe-item {
    height: 120px;
    color: #fff;
    font-size: 20px;
    text-align: center;
    .img {
      max-width: 100%;
      max-height: 100%;
      display: block;
      margin: auto;
    }
  }
}
.goods {
  display: flex;
  position: absolute;
  top: 120px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;
  .left {
    flex: 0 0 20px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 90px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        // color: $green;
        font-weight: 700;
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 12px;
      }
    }
  }

  .right {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 16px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
      text-align: left;
      margin: 0;
    }

    .food-item {
      height: 500px;
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      // bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;
        text-align: left;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 16px;
          color: rgb(7, 17, 27);
        }

        .desc,
        .extra {
          line-height: 10px;
          font-size: 16px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 16px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 16px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
  .footer {
    display: flex;
    justify-content: right;
  }
}

li {
  list-style: none;
}

ul {
  padding: 0;
  margin: 0;
}

.bottom {
  position: fixed;
  bottom: 50px;
  width: 100%;
  height: 45px;
  background-color: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .van-popup {
    margin-top: 10px;
  }
}
</style>

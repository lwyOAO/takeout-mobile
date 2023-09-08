<script setup>
import BScroll from 'better-scroll'
import { ref, computed, onMounted, nextTick } from 'vue'
import countBox from '@/components/countBox.vue'

// 轮播图片链接
const images = ref([
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg'
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
  { name: 'J' },
  { name: 'K' },
  { name: 'L' },
  { name: 'M' },
  { name: 'N' },
  { name: 'O' }
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

const clickMenuItem = (index) => {
  // 使用右侧列表滑动到对应的位置

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

// 统计购买数量
const count = ref(0)
const countChange = (type) => {
  if (type === 'add') {
    count.value = count.value + 1
  } else if (type === 'sub') {
    count.value = count.value - 1
  }
}
const change = (value) => {
  if (value >= 0) {
    count.value = value
  }
}
</script>

<template>
  <!--轮播图-->
  <div class="my-swipe">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" />
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
            v-for="(good, index) in goods"
            :key="index"
            :class="{ current: index === currentIndex }"
            @click="clickMenuItem(index)"
          >
            <span class="text">
              <img class="icon" :src="good.icon" v-if="good.icon" />
              {{ good.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="right">
        <ul ref="foodsUl">
          <li
            class="food-list-hook"
            v-for="(good, index) in goods"
            :key="index"
          >
            <van-card
              :num="1"
              price="2999.00"
              desc="遥遥领先"
              title="华为平板"
              thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
            >
              <template #tags>
                <van-tag plain type="primary">孩子很喜欢</van-tag>
              </template>
              <template #footer>
                <div class="footer">
                  <countBox
                    :modelValue="count"
                    @change="countChange"
                    @update:modelValue="change"
                  ></countBox>
                </div>
              </template>
            </van-card>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.my-swipe {
  .van-swipe-item {
    height: 120px;
    color: #fff;
    font-size: 20px;
    text-align: center;
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
    width: 90px;
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
        // bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 16px;
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
</style>

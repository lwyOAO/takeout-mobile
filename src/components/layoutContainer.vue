<template>
  <RouterView></RouterView>
  <van-tabbar active-color="#ee0a24" route>
    <van-tabbar-item to="/main" icon="shop">首页</van-tabbar-item>
    <van-tabbar-item to="/main/orderlist" icon="comment">订单</van-tabbar-item>
    <van-tabbar-item to="/main/cart" icon="cart" badge="5"
      >购物车</van-tabbar-item
    >
    <van-tabbar-item to="/main/user" icon="friends" badge="20"
      >我的</van-tabbar-item
    >
  </van-tabbar>
</template>

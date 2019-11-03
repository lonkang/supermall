<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <!-- 导航 -->
      <div slot="center">购物车({{lenght}})</div>
      <!-- 商品数据 -->
    </nav-bar>
      <CartList />
      <cart-bottom-bar />
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartBottomBar from './childComps/CartBottomBar'
  import CartList from './childComps/CartList'
  
  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // 两种用法
      // ...mapGetters(['cartLength', 'cartList'])
      ...mapGetters({
        lenght: 'cartLength',
        list: 'cartList'
      })
    }
  }
</script>

<style scoped>
.nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed; */
    /* top : 0; */
    /* left: 0; */
    /* right: 0; */
    /* overflow: hidden; */
  }
</style>

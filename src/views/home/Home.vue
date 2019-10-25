<template>
  <div id="home" >
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control 
        ref="tabcontrol1"
          class="tab-control"
          :titles="['流行', '新款', '精选']"
          @tabClick="tabClick"
          v-show="isTabFixed"
          />
    <scroll
      class="content"
      ref="scroll" 
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <recommend-view :recommends="recommends"/>
        <featrue-view/>
        <tab-control 
          ref="tabControl2"
          :titles="['流行', '新款', '精选']"
          @tabClick="tabClick"
          />
          <goods-list :goods="showGoods" />
    </scroll>
    <!-- 组件直接点击不能获取原生事件 使用 .native就可以了 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatrueView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'content/tabControl/TabControl'
  import GoodsList from 'content/goods/GoodsList'
  import Scroll from 'content/scroll/Scroll'
  import BackTop from 'content/backtop/BackTop'

  import { getHomeMultidata, getHomeGoods } from "network/home";

  import {debounce} from '@/common/untils'
  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatrueView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          // 设计商品的数据结构 
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        // 设置默认显示哪个组件
        currentType: 'pop',
        // 默认回到顶部不显示 一旦大于1000 就显示
        isShowBackTop: false,
        // 距离顶部的距离
        tabOffsetTop: 0,
        // 控制虹吸效果
        isTabFixed: false,
        // offsettop
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据
        this.getHomeMultidata()
      // 2 请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

      
    },
    mounted() {
      // 图片加载完的事件监听 防抖函数
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })
    },
    methods: {
    tabClick(index) {
      switch (index) {
        case 0: 
          this.currentType = 'pop'
          break 
        case 1: 
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl2.currentIndex = index
      this.$refs.tabControl1.currentIndex = index
    },
    contentScroll(position) {
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        // 2 觉得tar-control 是否虹吸 
        this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      // 上拉加载
      this.getHomeGoods(this.currentType)

    },
    swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
    backClick() {
      // 回到顶部功能
        this.$refs.scroll.scrollTo(0, 0)
        // console.log('123')
    },
    // 请求轮播图相关的方法
    getHomeMultidata() {
        getHomeMultidata().then(res => {
        // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
      })
    },

    //  请求流行 新款 精选有关数据
    getHomeGoods(type) {
      // 每次调用函数 自动加一页
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1 

        // 加载更多完成之后要调用一次完成
        // 作用：当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载
        this.$refs.scroll.finishPullUp()
      }) 
    }
    },
    activated() {
      // 回来的时候就迅速回到回来的位置
      this.$refs.scroll.scrollTo(0, this.saveY ,0 )
      //  重新refresh
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 离开之前 保存当前位置
      this.saveY = this.$refs.scroll.getScrollY()
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
    .tab-control {
    position: relative;
    z-index: 9;
  }
</style>

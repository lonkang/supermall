<template>
  <div id="detail">
    <detail-nav-bar  @titClick="titClick" class="detail-nav" ref="NavBar" />
    <scroll 
    class="content" 
    ref="scroll"
    @scroll="contentScroll"
    :probeType="3"
    >
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-image-info :detail-info="detailInfo" @DetailImageLoad="DetailImageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
		<detail-bottom-bar @addToCar="addToCar" />
    <!-- <Toast :message="messages" :show="show" /> -->
  </div>
</template>

<script>
  // 导航栏
  import DetailNavBar from './childComps/DetailNavBar'
  // 轮播图
  import DetailSwiper from './childComps/DetailSwiper'
  // 商品信息
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  // 商城
  import DetailShopInfo from './childComps/DetailShopInfo'
  // 效果图
  import DetailImageInfo from './childComps/DetailImageInfo'
  // 尺寸
  import DetailParamInfo from './childComps/DetailParamInfo'
  // 评论信息
  import DetailCommentInfo from './childComps/DetailCommentInfo'
	// 底部加入购物车
	import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  // import Toast from 'components/content/toast/Toast'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import { debounce } from '@/common/untils'
  import {itemListenerMixin, BackTopMixin} from '@/common/mixin'
  import {mapActions} from 'vuex'
  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailImageInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends : [],
        itemImageListener: null,
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
      }
    },
    mixins: [itemListenerMixin, BackTopMixin],
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        
        // 6 保存评论信息
        if(data.rate.list) {
          this.commentInfo = data.rate.list[0]
          // 也拿不到
          this.$nextTick(() => {
            // 值不对 
            // 原因： 图片没有计算在内
            // 根据最新的数据， dom已经渲染出来了， 但是图片还没有加载出来 所有取出来的值是错误的
          //   this.themeTopYs = []
          // this.themeTopYs.push(0)
          // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          // console.log(this.themeTopYs)
          })

          // 值不对
          // 原因 this.$refs.params$el没有渲染
          // this.themeTopYs = []
          // this.themeTopYs.push(0)
          // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          // console.log(this.themeTopYs)

        }
      }),
      // 3 请求推荐数据
      getRecommend().then(res => {
        // console.log(this.recommends)
        this.recommends = res.data.list
      })
      // 4 给getThemeTopY赋值 (对this.themeTopY进行赋值的时候采用防抖)
      this.getThemeTopY = debounce(() => {
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)
      })
    },
    destroyed() {
      // 事件总线机制
      this.$bus.$off('itemImageLoad', this.itemImageListener)
    },
    methods: {
      ...mapActions(['addCart']),
      DetailImageLoad() {
        // this.$refs.scroll.refresh()
        // 调用混入的刷新
        this.newRefresh()
        // 监听详情页刷新完后 把offsetTop放在里面
        this.getThemeTopY() 
      },
      titClick(index) {
        // console.log(index);
        // 点击theme就去相应的地方
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },
      contentScroll(position) {
        // 1获取y值
        const positionY = position.y
        // 2 positionY和主题中的I进行对比
        // [0, 7938, 9120, 9452]
        // position.y 在0和7938 之间 index = 0
        // position.y 在=7938和9120 之间 index = 1
        // position.y 在9120和9452 之间 index = 2
        // position.y 在大于等于9452 之间 index =3
        let length = this.themeTopYs.length
        // console.log(length)
        for(let i = 0; i < length - 1 ; i++) {
          
          if(this.currentIndex !== i && ( -positionY >= this.themeTopYs[i] && -positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i
            this.$refs.NavBar.currentIndex = this.currentIndex
          }
        // if (-positionY >= this.themeTopYs[i] && -positionY < this.themeTopYs[i+1]) {
        //     if (this.currentIndex !== i) {
        //       this.currentIndex = i;
        //       console.log(this.currentIndex)
        //       this.$refs.NavBar.currentIndex = this.currentIndex
        //     }
        //     break;
        //   }
          // if( this.currentIndex !== i && ( (i < length -1 && positionY >= this.themeTopYs[i] 
          // && positionY < this.themeTopYs[i+1]) 
          // || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
          //   this.currentIndex = i
          //   console.log(this.currentIndex )
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }


        } 
        this.listenShowBackTop(position)
      },
      addToCar() {
        // 1 获取购物车所需要的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid  = this.iid
        
        // console.log(product)
        // this.$store.commit('addCart', product)
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res)
        // })
        // console.log(123)
        // this.addCart(product).then(res => {
        //   this.show = true
        //   this.messages = res

        //   setTimeout(() => {
        //     this.show = false,
        //     this.messages = ''
        //   }, 1500)
        // })
      this.addCart(product).then(res => {
        this.$toast.Show(res, 1500)

      })
      }
    },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
</style>

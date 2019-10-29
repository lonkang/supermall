<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :commentInfo="commentInfo" />
      <goods-list :goods="recommends" />
    </scroll>
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
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  // 尺寸
  import DetailParamInfo from './childComps/DetailParamInfo'
  // 评论信息
  import DetailCommentInfo from './childComps/DetailCommentInfo'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  // import { debounce } from '@/common/untils'
  import {itemListenerMixin} from '@/common/mixin'
  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
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
        itemImageListener: null
      }
    },
    mixins: [itemListenerMixin],
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
        }
      }),
      getRecommend().then(res => {
        // console.log(this.recommends)
        this.recommends = res.data.list
      })
    },
    destroyed() {
      // 事件总线机制
      this.$bus.$off('itemImageLoad', this.itemImageListener)
    }
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
    height: calc(100% - 44px);
  }
</style>

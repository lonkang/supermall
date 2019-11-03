  import {debounce} from "./untils";
  //  回到顶部
  import BackTop from 'components/content/backtop/BackTop'
    export const itemListenerMixin = {
    data() {
      return {
        itemImageListener: null,
        newRefresh: null
      }
    },
      mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh, 50)
        this.itemImageListener = () => {
          this.newRefresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImageListener)
      },
    }
    export const BackTopMixin = {
      components : {
        BackTop
      },
      data() {
        return {
          isShowBackTop: false
        }
      },
      methods: {
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 300)
      },
      listenShowBackTop(position) {
        this.isShowBackTop = (-position.y) > 1000
        // console.log('123')
      }
      },
    }
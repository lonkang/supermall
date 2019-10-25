<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      // 1 创建BScroll对象 
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        })
      }


      // 3 监听scroll滚顶到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
          // console.log('上拉加载')
        })
      }
    },
    methods: {
      //  滚动到指定的位置
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      refresh() {
        // refresh 重新计算 better-scroll 
        this.scroll && this.scroll.refresh()
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
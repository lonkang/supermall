<template>
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles"
              class="title-item"
              :class="{active: index === currentIndex}"
              :key="index"
              @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: 'DeatilNavBar',
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      backClick() {
        this.$router.back()
      },
      titleClick(index) {
        this.currentIndex = index
      }
    },
  }
</script>


<style scoped>
  .nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .back img {
    padding-top: 11px;
  }
  .active {
    color: var(--color-high-text) ;
  }
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }
</style>>

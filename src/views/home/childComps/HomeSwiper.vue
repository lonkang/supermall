<template>
  <Swiper>
    <swiper-item v-for="item in banners"  :key="item.link">
      <a :href="item.link">
        <img :src="item.image" alt="" />
      </a>
    </swiper-item>
  </Swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'common/swiper'
  export default {
    name: 'HomeSwiper',
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style  scoped>

</style>
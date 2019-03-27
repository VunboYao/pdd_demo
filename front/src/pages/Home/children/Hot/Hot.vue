<template>
  <div class="hot">
    <!--1.轮播图-->
    <div class="swiper-container" v-if="homecasual.length>0">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(casual,index) in homecasual" :key="index">
          <img :src="casual.imgurl" alt="" width="100%">
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <!--2.中间导航 -->
    <HotNav/>
    <!--5.新增买接口-->
    <router-link tag="div" to="/sellanything">
      <mt-button class="sell-btn" type="danger" size="large">我要卖</mt-button>
    </router-link>
    <!--3.广告位-->
    <!--<div class="hot-ad">
      <img src="./../../imgs/hot_ad/banner.png" alt="" width="100%">
    </div>-->
    <!--6 最新数据添加-->
    <NewData/>
    <!--4.商品列表-->
    <HotShopList/>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import HotNav from './HotNav'
  import HotShopList from './HotShopList'
  import NewData from './newData'

  import {
    mapState
  } from 'vuex'
  export default {
    name: "Hot",
    components: {
      HotNav,
      HotShopList,
      NewData
    },
    mounted() {
      // 1. 获取首页的轮播图
      this.$store.dispatch('reqHomeCasual',() => {
        this.$nextTick(() => {
          // 创建swiper实例
          new Swiper ('.swiper-container', {
            loop: true,
            autoplay: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })
        })
      })
      // 2. 获取首页nav
      this.$store.dispatch('reqHomeNav')
      // 3. 获取首页商品列表数据
      this.$store.dispatch('reqShopList')
    },
    computed: {
      ...mapState(['homecasual'])
    },
    // 深度监视
  /*  watch: {
      homecasual() {
        this.$nextTick(() => {
          // 创建swiper实例
          new Swiper ('.swiper-container', {
            loop: true,
            autoplay: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })
        })
      }
    }*/
  }
</script>

<style scoped lang="stylus">
  .swiper-container
    height 30vh
  .hot
    padding-top 34px
    width 100%
    background #f5f5f5
    .hot-ad
      margin 8px 0
      padding 5px
      background #fff
  .buy-btn,.sell-btn
    margin 10px 0 5px
</style>

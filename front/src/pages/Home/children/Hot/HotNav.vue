<template>
  <div class="hot-nav">
    <!--滚动区域-->
    <div class="hot-nav-content" ref="scrollDiv">
      <div class="nav-content-inner" v-if="homenav.length > 0">
        <a class="inner-item" v-for="(nav,index) in homenav" :key="index">
          <img v-lazy="nav.iconurl" alt="">
          <span>{{nav.icontitle}}</span>
        </a>
      </div>
    </div>
    <!--进度条-->
    <div class="hot-nav-bottom">
      <div class="hot-nav-bottom-inner" :style="innerBarStyle"></div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "HotNav",
    data() {
      return {
        //  1.屏幕的宽度
        screenWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        //  2.滚动内容的宽度
        scrollContentW: 720,
        //  3.滚动条背景的长度
        bgBarW: 100,
        //  4.滚动条的长度
        barXWidth: 0,
        //  5.起点
        startX: 0,
        //  6.结束点
        endFlag: 0,
        //  7.移动的距离
        barMoveWidth: 0
      }
    },
    mounted() {
      // 执行滚动条监听事件
      this.getBottomBarWidth()
      this.bindEvent()
    },
    methods: {
      // 获取滚动条宽度
      getBottomBarWidth() {
        this.barXWidth = this.bgBarW * (this.screenWidth / this.scrollContentW)
      },
    /*  // 绑定触摸事件
      bindEvent() {
        this.$el.addEventListener('touchstart', this.handleTouchStart, false)
        this.$el.addEventListener('touchmove', this.handleTouchMove, false)
        this.$el.addEventListener('touchend', this.handleTouchEnd, false)
      },
      // 开始触摸
      handleTouchStart(e) {
        //  1.获取第一个触点
        let touch = e.touches[0].pageX
        //  2.求出起始点
        this.startX = Number(touch)
      },
      // 开始移动
      handleTouchMove(e) {
        //  1.获取第一个触点
        let touch = e.touches[0].pageX
        //  2.求出移动的距离
        let moveWidth = Number(touch)-this.startX
        // 3.求出滚动条走的距离
        this.barMoveWidth = -((this.bgBarW / this.scrollContentW) * moveWidth -this.endFlag)
      //  4 边界值处理
        if (this.barMoveWidth <= 0) {
          this.barMoveWidth = 0
        } else if (this.barMoveWidth >= this.bgBarW - this.barXWidth) {
          this.barMoveWidth = this.bgBarW - this.barXWidth
        }
      },
      // 结束触摸
      handleTouchEnd() {
        this.endFlag = this.barMoveWidth
        console.log(this.$refs.scrollDiv.scrollLeft)
      }*/
    // 滚动监听
      bindEvent() {
        // 监听滚动区域的滚动事件
        this.$refs.scrollDiv.addEventListener('scroll', this.scrollEvent, false)
      },
      scrollEvent() {
        // 获取滚动区域滚动的左值
        let left = this.$refs.scrollDiv.scrollLeft
        // 移动的距离=左值/滚动内容的宽度(720) * 滚动条背景的长度(100)
        this.barMoveWidth = left / this.scrollContentW * this.bgBarW
      }
    },
    computed: {
      ...mapState(['homenav']),
      // 底部滚动条监听
      innerBarStyle() {
        return {
          width: `${this.barXWidth}px`,
          left: `${this.barMoveWidth}px`
        }
      }
    }
  }
</script>
<style scoped lang="stylus">
  .hot-nav
    padding-bottom 10px
    position relative
    width 100%
    height 180px
    background #fff
    .hot-nav-content
      width 100%
      overflow-x scroll
      &::-webkit-scrollbar
        display none
      .nav-content-inner
        display flex
        flex-wrap: wrap
        width 720px
        height 180px
        .inner-item
          display flex
          flex-direction column
          justify-content center
          align-items center
          width 90px
          height 90px
          font-size 14px
          color #666
          img
            margin-bottom 5px
            width 40%
    .hot-nav-bottom
      width 100px
      height 2px
      background #ccc
      position absolute
      left 50%
      bottom 8px
      margin-left -50px
      .hot-nav-bottom-inner
        position absolute
        left 0
        height 100%
        background orangered
        width 0
</style>

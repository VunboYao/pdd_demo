<template>
  <div class="searchPanel">
    <div class="search-nav">
      <div class="search-input">
        <img src="../images/search.png" alt="" width="25">
        <input ref="mySearch" type="search" placeholder="王者荣耀">
      </div>
      <button @click="isShowSearchPanel(false)">取消</button>
    </div>
    <div class="search-content">
      <div class="title">
        <img src="../images/hot.png" alt="" width="25">
        <span>热门搜索</span>
      </div>
      <ul class="search-list">
        <li>天天飞车</li>
        <li>大话西游</li>
        <li>梦幻水晶</li>
        <li>王者荣耀</li>
        <li>刀与剑</li>
        <li>剑舞鸿源</li>
        <li>飞剑问道</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SearchPanel",
    props: {
      isShowSearchPanel: Function
    },
    mounted() {
      this.$refs.mySearch.focus()
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../../common/stylus/mixins.styl"
  .searchPanel
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    background #fff
    z-index 1000
    .search-nav
      padding 0 20px
      display flex
      align-items: center
      justify-content space-between
      width 100%
      height 60px
      border-bottom-1px(#ddd)
      .search-input
        display flex
        padding 0 10px
        align-items center
        width: 85%
        height 38px
        border-radius 8px
        background #ededed
        input
          padding-left 10px
          width 90%
          height 90%
          background inherit
          font-size 16px
          outline none
      button
        background transparent
        font-size 16px
        color #aaa
    .search-content
      padding 30px 15px
      .title
        margin-bottom 10px
        display flex
        align-items center
        color #aaa
      .search-list
        display flex
        flex-wrap wrap
        color #aaa
        li
          margin 5px 10px
          padding 5px
          border-radius 8px
          font-size 14px
          font-weight lighter
          background #ededed
</style>

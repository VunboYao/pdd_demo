<template>
  <div class="home">
    <ly-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="handleChange"
      class="fixed"
    ></ly-tab>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data () {
      return {
        selectedId: 0,
        items: [
          {label: '首页'},
          {label: '游戏专区'},
          {label: '端游'},
          {label: '租号'},
          {label: '代练'},
          {label: '首充号'},
          {label: 'Steam专区'},
          {label: '帮助中心'}
        ],
        options: {
          activeColor: '#e9232c'  // 设置选中的颜色
        },
        // 二级路由路径
        subRouterUrl:[
          '/home/hot','/home/dress','/home/box','/home/man','/home/ele','/home/food','/home/general','/home/mbaby','/home/shirt'
        ]
      }
    },
    methods: {
      handleChange(item, index) {
        this.$router.replace(this.subRouterUrl[index])
      }
    }
  }
</script>

<style scoped lang="stylus">
  .home
    width: 100%
    height 100%
    background #f5f5f5
    .fixed
      position fixed
      left 0
      top 0
      z-index 998
</style>

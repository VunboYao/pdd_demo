<template>
    <div class="wrap">
      <div class="content">
        <h3>最新发布</h3>
        <div class="c-title">
          <span>游戏名称</span>
          <span>游戏大区</span>
          <span>价格</span>
          <span>操作</span>
        </div>
        <div class="c-list" v-if="newPublishData.length > 0">
          <div class="item" v-for="(item,index) in newPublishData" :key="index">
            <span class="i-name">{{item.gameName}}</span>
            <span class="i-area">{{item.areaName}}</span>
            <span class="i-price">￥{{item.price}}</span>
            <span class="i-operate" @click="addShoppingCar(item)">我要买</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import {Indicator} from 'mint-ui';
    import {mapState} from 'vuex'
    export default {
        name: "newData",
      computed: {
          ...mapState(['newPublishData'])
      },
      methods: {
          // 添加购物车
        addShoppingCar(goods) {
          let list = {
            goods_name: goods.gameName,
            sales_tip: goods.areaName,
            price: goods.price,
            account: goods.account,
            password: goods.password,
            checked: false,
            buy_count: 1
          }
          Indicator.open('添加购车中...');
          this.$store.dispatch('addGameAccountCar', {list});
          setTimeout(() => {
            Indicator.close();
            this.$router.push('/chat');
          },2000)
        }
      }
    }
</script>

<style scoped lang="stylus">
.wrap
  margin 20px 0;
  padding 0 10px
  .content
    box-shadow 0 0 5px #ccc
    h3
      font-size: 20px
      line-height: 40px;
      font-weight: 600;
      color: #333
      text-align: center
    .c-title
      display: flex
      justify-content space-between
      border-bottom 1px solid #aaa
      span
        width: 23%
        text-align center
        font-size:16px
        line-height:28px
        color #321325
    .c-list
      .item
        display: flex
        justify-content space-between
        font-size:14px
        line-height: 36px;
        color: #792342;
        border-bottom 1px solid #ccc
        box-sizing border-box
        span
          width 23%
          text-align center
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
          &.i-price
            color red
          &.i-operate
            background linear-gradient(to bottom, transparent 5px, #8f0000 8px, #de0000 28px, transparent 31px)
            color #ccc
            border-radius 5px
</style>

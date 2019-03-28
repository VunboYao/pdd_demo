<template>
  <div>
    <!-- 头部 -->
    <mt-header title="MGT交易中心">
      <router-link to="/mine" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <p class="tip">安全确认,谨慎防骗</p>
    <div class="list">
      <div class="item">
        <div class="title">
          <span class="title-uni">MGT商城</span>
          <span class="title-uni-desc">待收货</span>
        </div>
        <div class="content" v-for="(item,index) in unreceived" :key="index">
          <div class="c-img">
            <img src="./images/img.jpg" alt="">
          </div>
          <div class="c-details" v-show="isShow">
            <h3>{{item.goods_name}}</h3>
            <h4>{{item.sales_tip}}</h4>
            <h5>￥{{item.price}}</h5>
            <!--<button>查看账号</button>-->
            <div class="confirm">
              <span @click="showPwd(item)">查看账户</span>
              <span @click="popConfirm(item)">确认收货</span></div>
          </div>
         <!-- <div class="c-details" v-show="!isShow">
            <span class="account">账户:{{item.account}}</span>
            <span class="password">密码:{{item.password}}</span>
            <div class="confirm" @click="isShow=!isShow"><span>查看大区</span></div>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {MessageBox,Indicator} from 'mint-ui'

  export default {
    name: "receipt",
    data() {
      return {
        demo: 'Receipt',
        isShow: true
      }
    },
    computed: {
      ...mapState(['unreceived'])
    },
    methods: {
      showPwd(item) {
        MessageBox('GMT账户管理', `账号:${item.account},密码:${item.password}`);
      },
      // 收货提示
      popConfirm(item) {
        var data = item;
        MessageBox.confirm('确认收货 ?').then(action => {
          let json = {demo: 'ok'}
          this.$store.dispatch('allOrderGet',{data});
          Indicator.open('确认收货中...');
          setTimeout(() => {
            Indicator.close();
            this.$store.dispatch('confirmReceived',{data})
          },500)
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .tip
    height: 60px;
    line-height: 60px;
    font-weight: 600;
    color: #ad0000
    background linear-gradient(to right, #ffb879, gold, #806a7f)
    text-align: center

  .list
    margin 10px 0
    background #fff

    .item
      padding 10px

    .title
      display: flex
      justify-content space-between
      height: 30px
      line-height: 30px;

      .title-uni
        padding 2px 5px
        color: #fff;
        border-radius 5px;
        background: linear-gradient(#c7a600, #7ad29e);

      .title-uni-desc
        padding 2px 5px
        color: #333
        border-radius 5px
        background: linear-gradient(to 60deg, #8f8f8f, #939393);

    .content
      display: flex
      padding 5px
      box-shadow 0 0 5px #ccc
      border-radius 10px

      .c-img
        display: inline-block
        width 30%
        height: 30%

        img
          width 100%
          border-radius 10px

      .c-details
        display flex
        flex-flow wrap
        padding-left 3%
        width: 65%
        height: 100%

        .account, .password
          display: block
          width 100%
          line-height: 30px;
          color #8a0000

        button
          border: none

          font-size: 22px
          height: 35px
          width 100%
          color #ab0000
          line-height: 35px;

        h4
          fonfont-size: 18px
          height 30px
          line-height: 30px;
          width 100%
          color #333

        h5
          fonfont-size: 18px
          height 30px
          line-height: 30px;
          width 100%
          color #f00

    .confirm
      position relative
      text-align: right
      margin: 20px 10px;

      span
        padding 5px 8px
        box-shadow 0 0 3px #ddd
        border-radius 5px
        color #fff
        background: #00B7FF;


</style>

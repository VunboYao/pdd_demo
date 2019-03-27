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
        <div class="content">
          <div class="c-img">
            <img src="./images/avatar.jpg" alt="">
          </div>
          <div class="c-details">
            <h3>地下城与勇士</h3>
            <h4>广州一区</h4>
            <h5>￥88</h5>
          </div>
        </div>
        <div class="confirm" @click="popConfirm"><span>确认收货</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  export default {
    name: "receipt",
    data() {
      return {
        demo: 'Receipt'
      }
    },
    methods: {
      popConfirm() {
        MessageBox({
          title: 'GMT安全提示',
          message: '确认收货?',
          showCancelButton: true
        });
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
        height:30%
        img
          width 100%
          border-radius 10px
      .c-details
        display flex
        flex-flow wrap
        padding-left 3%
        width:65%
        height:100%
        h3
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

<template>
  <div v-if="userInfo.id">
    <div class="chat">
      <!--一级页面-->
      <div>
        <!--头部区域-->
        <div class="header">
          <a href="" class="icon_back"></a>
          <h3>MGT购物车</h3>
          <a href="" class="icon_menu"></a>
        </div>
        <!--安全提示-->
        <div class="jd_safe_tip">
          <p class="tip_word">
            您正在安全购物环境中，请放心购物
          </p>
        </div>
        <!--中间的列表-->
        <!--<main class="jd_shopCart_list">
          <section>
            <div class="shopCart_list_con"
                 v-for="(goods,index) in carGoods" :key="index">
              <div class="list_con_left">
                <a href="javascript:;"
                   class="cart_check_box"
                   @click.stop="singleSelected(goods)"
                   :checked="goods.checked"></a>
              </div>
              <div class="list_con_right">
                <div class="shop_img">
                  <img :src="goods.thumb_url" alt="图片数据丢失">
                </div>
                <div class="shop_con">
                  <a href="#">{{goods.goods_name}}&nbsp;&nbsp;&nbsp;{{goods.sales_tip}}</a>
                  <p class="shop_price">￥{{goods.price}}</p>
                  &lt;!&ndash;<div class="shop_deal">&ndash;&gt;
                    &lt;!&ndash;<div class="shop_deal_left">&ndash;&gt;
                      &lt;!&ndash;<span @click="updateGoodsCount(goods,false)">-</span>&ndash;&gt;
                      &lt;!&ndash;<input disabled type="tel" value="1" v-model="goods.buy_count">&ndash;&gt;
                      &lt;!&ndash;<span @click.stop="updateGoodsCount(goods,true)">+</span>&ndash;&gt;
                    &lt;!&ndash;</div>&ndash;&gt;
                    &lt;!&ndash;<div class="shop_deal_right" @click.stop="clickTrash(goods)">&ndash;&gt;
                      &lt;!&ndash;<span></span>&ndash;&gt;
                      &lt;!&ndash;<span></span>&ndash;&gt;
                    &lt;!&ndash;</div>&ndash;&gt;
                  &lt;!&ndash;</div>&ndash;&gt;
                </div>
              </div>
            </div>
            <div class="null_tip">-&#45;&#45;&#45;&#45;&#45;&#45; 我是有底线的 -&#45;&#45;&#45;&#45;&#45;&#45;</div>
          </section>
        </main>-->
        <main class="jd_shopCart_list">
          <section>
            <div class="shopCart_list_con"
                 v-for="(goods,index) in gameAccountCar" :key="index">
              <div class="list_con_left">
                <a href="javascript:;"
                   class="cart_check_box"
                   @click.stop="singleSelected(goods)"
                   :checked="goods.checked"></a>
              </div>
              <div class="list_con_right">
                <div class="shop_img">
                  <img src="./images/img.jpg" alt="MGT游戏交易">
                </div>
                <div class="shop_con">
                  <a href="#">{{goods.goods_name}}&nbsp;&nbsp;&nbsp;{{goods.sales_tip}}</a>
                  <p class="shop_price">￥{{goods.price}}</p>
                </div>
                <div class="shop_deal" style="opacity: 0;">
                  <div class="shop_deal_left">
                    <!--<span @click="updateGoodsCount(goods,false)">-</span>-->
                    <input disabled type="tel" value="1" v-model="goods.buy_count">
                    <!--<span @click.stop="updateGoodsCount(goods,true)">+</span>-->
                  </div>
                  <div class="shop_deal_right" @click.stop="clickTrash(goods)">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="null_tip">------- 我是有底线的 -------</div>
          </section>
        </main>
        <!--底部通栏-->
        <div id="tab_bar">
          <div class="tab-bar-left">
            <a href="javascript:;"
               class="cart_check_box"
               :checked="isSelectAll"
               @click.stop="selectAll(isSelectAll)"
            ></a>
            <span style="font-size: 16px;">全选</span>
            <div class="select-all">
              合计：<span class="total-price">{{totalMoney | moneyFormat(totalMoney)}}</span>
            </div>
          </div>
          <div class="tab-bar-right">
            <a href="#" class="pay" @click="goSubPay" v-if="totalMoney > 0">去结算</a>
          </div>
        </div>
      </div>

      <!--二级页面-->
      <div class="subPay" ref="subPay">
        <div class="pay_info" ref="pay_info">
          <h3>支付<span>{{totalMoney}}</span>元</h3>
          <button class="confirm_pay" @click.stop="confirmPay">确认支付</button>
          <button class="cancel_pay" @click.stop="cancelPay">取消</button>
        </div>
      </div>
    </div>
  </div>
  <select-login v-else/>
</template>

<script>
  import {mapState} from 'vuex'
  import {MessageBox} from 'mint-ui'
  import SelectLogin from '@/pages/Me/Login/SelectLogin'
  import {delCartGoods, delCartGoodsGroup} from '@/api/index'
  import {Indicator} from 'mint-ui'
  import {Toast} from 'mint-ui'

  export default {
    name: "Chat",
    data() {
      return {
        isSelectAll: false,   // 是否选中所有商品
        totalMoney: 0, // 总价格
        currentDelGoods: {}, // 当前删除商品
      }
    },
    components: {
      SelectLogin
    },
    computed: {
      ...mapState(['userInfo', 'carGoods', 'gameAccountCar'])
    },
    created() {
      //请求数据
      // this.$store.dispatch('getCartGoods')
    },
    methods: {
      // 1.计算商品的增加和减少
      updateGoodsCount(goods, isAdd) {
        this.$store.dispatch('updateGoodsCount', {goods, isAdd})
        // 计算总价
        this.getAllGoodsPrice()
      },
      // 2.是否全部选中
      selectAll(isSelected) {
        // 总控制
        this.isSelectAll = !isSelected
        this.$store.dispatch('selectAll', isSelected)
        // 总价格
        this.getAllGoodsPrice()
      },
      // 3.goods totalMoney
      getAllGoodsPrice() {
        let totalPrice = 0
        // this.carGoods.forEach((goods, index) => {
        this.gameAccountCar.forEach((goods, index) => {
          if (goods.checked) {
            totalPrice += goods.price * goods.buy_count
          }
        })
        this.totalMoney = totalPrice
      },
      // 4.单个商品的选中/取消
      singleSelected(goods) {
        this.$store.dispatch('sinSelected', {goods})
        // hasSelectedAll
        this.hasSelectedAll()
        // goods totalMoney
        this.getAllGoodsPrice()
      },
      // 5.判断是否全选
      hasSelectedAll() {
        let flag = true
        this.gameAccountCar.forEach((goods, index) => {
          if (!goods.checked) {
            flag = false
          }
        })
        this.isSelectAll = flag
      },
      // 6.点击删除商品
      clickTrash(goods) {
        MessageBox.confirm('确定删除该商品？').then(action => {
          if (action === 'confirm') {
            this.currentDelGoods = goods
            // 删除vuex中数据
            this.$store.dispatch('delGoods', {goods})
            // 获取总价格
            this.getAllGoodsPrice()
            // 删除数据库数据
            delCartGoods(goods.goods_id)
          }
        })
      },
      // 7.支付界面
      goSubPay() {
        this.$refs.subPay.style.height = '100%'
        this.$refs.pay_info.style.display = 'block'
      },
      // 8.确认支付
      async confirmPay() {
        // 隐藏支付信息
        this.$refs.pay_info.style.display = 'none'
        Indicator.open('正在支付...')
         // 定义临时数组
         let goodsGroup = []
         // 遍历选中的商品，删除
         this.gameAccountCar.forEach(goods => {
           if (goods.checked) {
             // 获取选中的id
             goodsGroup.push(goods)
           }
         })
        // 数据库删除
       /* let goodsGroup = await this.getGroup()
        delCartGoodsGroup(goodsGroup)*/
        // vuex中删除
        this.$store.dispatch('add2unreceived',{goodsGroup})
        // 延时关闭提示
        setTimeout(() => {
          Indicator.close()
          this.$store.dispatch('delGoodsGroup', {goodsGroup})
          this.$refs.subPay.style.height = '0'
          this.totalMoney = 0
          this.isSelectAll = false
          Toast({
            message: '支付成功',
            duration: 2000
          })
        }, 2000)

      },
      // 9取消支付
      cancelPay() {
        this.$refs.subPay.style.height = '0'
        this.$refs.pay_info.style.display = 'none'
      },
      getGroup() {
        // 定义临时数组
        let goodsGroup = []
        // 遍历选中的商品，删除
        this.gameAccountCar.forEach(goods => {
          if (goods.checked) {
            // 获取选中的id
            goodsGroup.push(goods.goods_id)
          }
        })
        return goodsGroup
      }
    },
    filters: {
      // 格式化金钱
      moneyFormat(money) {
        return `￥` + money.toFixed(2)
      }
    }
  }
</script>


<style scoped lang="stylus" ref="stylesheet/stylus">
  .chat
    width 100%
    height 100%
    background-color #f5f5f5

    .header
      width: 100%;
      height: 44px;
      background: #ececec;
      -webkit-background-size: 1px 44px;
      background-size: 1px 44px;
      border-bottom: 1px solid #e0e0e0;
      position: fixed;
      left: 0;
      top: 0;
      display flex
      justify-content center
      align-items center
      font-size 18px
      font-weight bolder
      color #E9232C
      z-index 999

    .jd_safe_tip
      margin-top 44px
      height 36px
      line-height 36px
      border-bottom: 1px solid #e0e0e0;
      background-color #fff
      text-align center

      .tip_word
        display inline-block
        font-size 14px
        padding-left 20px
        position relative

        &:before
          content ''
          width 18px
          height 18px
          background url("./images/safe_icon.png") no-repeat
          -webkit-background-size 18px 18px
          background-size 18px 18px
          position absolute
          top 9px
          left 0

    .jd_shopCart_list
      margin-bottom 64px
      background-color #e0e0e0

      section
        margin-top 15px
        border-top 1px solid #e0e0e0
        background-color #fff

        .shopCart_list_con
          padding: 10px 0
          border-bottom 1px solid #e0e0e0

          .list_con_left
            .cart_check_box
              float left
              background url("./images/shop-icon.png") no-repeat
              -webkit-background-size 50px 100px
              background-size 50px 100px
              width 20px
              height 20px
              margin-top 17px
              margin-left 7px

            .cart_check_box[checked]
              background-position -25px 0

          .list_con_right
            overflow: hidden;
            padding: 0 7px;

            .shop_img
              float left
              width 80px
              height 80px

              img
                width 80px
                height 80px
                display block

            .shop_con
              overflow hidden
              padding-left 7px

              & > a
                /*font-size 14px*/
                color #000
                line-height 30px
                height 30px
                overflow hidden
                display block
                text-decoration none

              .shop_price
                color #E9232C
                margin-top 5px

              .shop_deal
                margin-top 5px

                .shop_deal_left
                  float left

                  & > span
                    border 1px solid #e0e0e0
                    display inline-block
                    width 30px
                    height 25px
                    line-height 25px
                    text-align center
                    float left

                    &:first-child
                      border-top-left-radius 3px
                      border-bottom-left-radius 3px

                    &:last-child
                      border-top-right-radius 3px
                      border-bottom-right-radius 3px

                  input
                    border none
                    border-top 1px solid #e0e0e0
                    border-bottom 1px solid #e0e0e0
                    float left
                    width 50px
                    height 23px
                    text-align center

                .shop_deal_right
                  float right

                  & > span:first-child
                    background url('./images/delete_up.png') no-repeat
                    background-size 18px 4px
                    width 18px
                    height 4px
                    display block

                  & > span:last-child
                    background url('./images/delete_down.png') no-repeat
                    background-size 17px 17px
                    width 17px
                    height 17px
                    display block
                    margin-top -3px

        .null_tip
          text-align center
          width 100%
          height 100px
          fontsize 60px
          line-height: 60px;
          color: #999

    #tab_bar
      position: fixed
      left 0
      bottom 50px
      width 100%
      height 44px
      background-color #fff
      display flex
      justify-content space-between
      align-items center
      box-shadow 0 -5px 5px #e0e0e0
      border-bottom: 1px solid #e0e0e0

      .tab-bar-left
        display flex
        align-items center
        margin-left 7px

        .cart_check_box
          float left
          background url("./images/shop-icon.png") no-repeat
          -webkit-background-size 50px 100px
          background-size 50px 100px
          width 20px
          height 20px
          margin-top 4px
          margin-left 4px

        .cart_check_box[checked]
          background-position -25px 0

        .select-all
          margin-left 8px
          font-size 16px

      .tab-bar-right
        .pay
          width 90px
          height 44px
          background-color #E9232C
          display flex
          justify-content center
          align-items center
          font-size 18px
          color #fff
          text-decoration none

  .subPay
    position fixed
    top 0
    left 0
    display flex
    justify-content center
    align-items center
    width 100%
    height 0
    background rgba(0, 0, 0, .6)
    z-index 999
    transition height .3s

    .pay_info
      display: none
      width 80vw
      min-height 30vh
      border-radius 4px
      background #fff

      h3
        margin: 5px 0 40px
        text-align center
        font-size 24px
        color #666

        span
          font-size: 40px
          color #222

      button
        margin 10px auto
        padding 5px 0
        width 60vw
        display block
        border none
        outline none
        font-size 22px
        color #fff
        border-radius 5px
        background-color #00aaef

</style>

<template>
  <div class="main">
    <!--导航栏设置-->
    <mt-header fixed title="MGT游戏出售">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="content">
      <mt-field label="游戏名" placeholder="请输入游戏名称" v-model="gameName"></mt-field>
      <mt-field label="大区名称" placeholder="请输入大区名称" v-model="areaName"></mt-field>
      <mt-field label="游戏账号" placeholder="请输入账号"
                v-model="account"></mt-field>
      <mt-field label="游戏密码" placeholder="请输入账号密码" v-model="password"></mt-field>
      <mt-field label="价格" v-model="price" type="number" placeholder="请输入您出售的价格"></mt-field>
      <div class="btn-options">
        <router-link to="/">
          <mt-button class="btn-cancel" type="danger">取 消</mt-button>
        </router-link>
        <mt-button type="primary" @click.stop="publishAccount">出 售</mt-button>
      </div>
      <p class="info-tip-title">安全提示</p>
      <p class="info-tips">
        1.您在发布物品前须确认所要发布物品真实存在，并保证此物品为合法所得，且获得此物品之方式不违反该网络游戏开发商及运营商之相关游戏规定；如因游戏库存上限、封印装备等问题需要卖家补充物品或协助操作，在不违反寄售相关规定情况下必须10分钟内操作完成。
      </p>
      <p class="info-tips">
        2.您在使用寄售服务过程中发布所要寄售物品之时，须确认所发布信息与所要寄售物品之属性完全相符，并保证此物品在移交本网站之时，该属性未发生变化。
      </p>
    </div>
  </div>
</template>

<script>
  import {Indicator,MessageBox } from 'mint-ui';
  export default {
    data() {
      return {
        gameName: '',
        areaName: '',
        password: '',
        account: '',
        price: ''
      }
    },
    name: "sellAnything",
    methods: {
      async publishAccount() {
        // 非空验证
        if (this.price === '' || this.gameName === '' || this.account === '' || this.areaName === '' || this.password === '') {
          MessageBox('警告', '发布内容不能为空');
          return false;
        }
        let list =  {
          gameName: this.gameName,
          areaName: this.areaName,
          account: this.account,
          password: this.password,
          price: this.price
        }
        this.$store.dispatch('publishNewData',{list});
        Indicator.open('发布成功!');
        let that = this;
        setTimeout(function () {
          Indicator.close();
          that.$router.push("/home");
        },1000)
      }
    }
  }
</script>

<style scoped>
  .main {
    overflow-y: hidden;
  }

  .content {
    margin-top: 50px;
  }

  .btn-options {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 160px;
  }

  .btn-cancel {
    margin-right: 20px;
  }

  .info-tip-title {
    text-align: center;
    line-height: 2;
  }

  .info-tips {
    padding: 0 10px;
    text-align: justify;
    font-size: 14px;
    line-height: 1.5;
    color: #999;
  }
</style>

import Vue from 'vue'
import App from './App'
import store from './store'

// minu-UI
import 'mint-ui/lib/style.css'
import { Actionsheet } from 'mint-ui';
Vue.component(Actionsheet.name, Actionsheet);

import { DatetimePicker } from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);

import { Button } from 'mint-ui';
Vue.component(Button.name, Button);

import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

import { Field } from 'mint-ui';
Vue.component(Field.name, Field);

// 全局路由配置
import router from './router/index'
import LyTab from 'ly-tab'
import './../static/css/reset.css'
import '@/common/css/style.css'
Vue.use(LyTab)

// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
import loading from './common/images/logo.png'
Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: loading,
  attempt: 1
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

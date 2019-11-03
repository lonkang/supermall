import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/content/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false

// 安装toast插件
Vue.use(toast)

// 使用懒加载插件
Vue.use(VueLazyLoad, {
    loading: require('./assets/img/common/placeholder.png')
})

// 添加事件总线机制
Vue.prototype.$bus = new Vue()

// 移动端300ms延迟解决
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

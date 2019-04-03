// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入封装 axios
import {postRequest, getRequest, deleteRequest, putRequest, uploadFileRequest} from './api/request'

// 设置title
import VueWeChatTitle from 'vue-wechat-title'

Vue.use(ElementUI)
Vue.use(VueWeChatTitle)

Vue.config.productionTip = false

// 全局使用封装 axios
Vue.prototype.postRequest = postRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.uploadFileRequest = uploadFileRequest

require('./mock')

// 设置title
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

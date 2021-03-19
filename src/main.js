import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';


// 内核
import cloudbase from "@cloudbase/js-sdk/app";
// 登录模块
import "@cloudbase/js-sdk/auth";
// 云函数模块
import "@cloudbase/js-sdk/functions";

const app = cloudbase.init({
  env: "new-music-vote-406bd7"
});

app.auth().anonymousAuthProvider().signIn()

Vue.prototype.tcb = app;

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './directive/Dialog'
import './viewsCommon/page.css'


Vue.config.productionTip = false

Vue.prototype.$tableBack = function({ row, rowIndex }) {
  if (rowIndex % 2 === 0) {
    return "bjq-warning-row";
  } else if (rowIndex % 2 !== 0) {
    return "bjq-success-row";
  }
  return "";
};


Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

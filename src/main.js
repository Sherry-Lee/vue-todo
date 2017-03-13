// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
Vue.directive('focus', {
  inserted: function (el) {
    el.focus();
  }
});
Vue.directive('blur', {
  inserted: function (el) {
    el.blur();
  }
})


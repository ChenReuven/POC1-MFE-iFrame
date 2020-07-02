import Vue from "vue";
import App from "./App.vue";
import Router from 'vue-router'
import FirstPage from './components/FirstPage.vue';
import SecondPage from './components/SecondPage.vue';

Vue.use(Router)

Vue.config.productionTip = false;
const router = new Router({
  routes: [{
    path: '/',
    name: 'first-page',
    component: FirstPage
  }, {
    path: '/first-page',
    name: 'first-page',
    component: FirstPage
  }, {
    path: '/second-page',
    name: 'second-page',
    component: SecondPage
  }]
})
new Vue({
  render: (h) => h(App),
  router: router
}).$mount("#app");
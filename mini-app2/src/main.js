import Vue from "vue";
import App from "./App.vue";
import Router from 'vue-router'
import FirstPage from './components/FirstPage.vue';
import SecondPage from './components/SecondPage.vue';


function sendNavConfig() {
  window.parent.postMessage({
    type: 'UPDATE_NAVIGATION', payload: {
      appName: 'mini-app2',
      routes: [{
        routerLink: 'first-page',
        displayName: 'First page (Vue)'
      },
      {
        routerLink: 'second-page',
        displayName: 'Second page (Vue)'
      }]
    }
  }, '*');
}
sendNavConfig();
window.addEventListener('message', ({ data: { type } }) => {
  switch (type) {
    case 'RESUME':
      sendNavConfig();
      break;
  }
})

Vue.use(Router)

Vue.config.productionTip = false;
const router = new Router({
  mode: "hash",
  routes: [{
    path: '/',
    redirect: '/first-page'
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
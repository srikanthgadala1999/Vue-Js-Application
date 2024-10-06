import Vue from 'vue'
import App from './campaignLayout.vue'
import './assets/styles/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

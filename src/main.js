import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import fb from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import tooltipDirective from '@/directives/tooltipDirective'
import dateFilter from '@/filters/dateFilter'
import currencyFilter from '@/filters/currencyFilter'
import localizeFilter from '@/filters/localizeFilter'
import Loader from '@/components/app/Loader'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import './assets/index.css'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'

Vue.config.productionTip = false
let app = null

Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(VueMeta)
Vue.component('Paginate', Paginate)
Vue.component('Loader', Loader)

fb.initializeApp({
  apiKey: "AIzaSyATW85QFnntWg6v80W7R_ofAoG0azHaF20",
  authDomain: "vue-crm-170db.firebaseapp.com",
  databaseURL: "https://vue-crm-170db.firebaseio.com",
  projectId: "vue-crm-170db",
  storageBucket: "vue-crm-170db.appspot.com",
  messagingSenderId: "1049058009732",
  appId: "1:1049058009732:web:d07bef796c14716e0d58d1"
})

fb.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

// vue object to JS standart object
window.debug = (param) => {
  console.log(JSON.parse(JSON.stringify(param)))
}

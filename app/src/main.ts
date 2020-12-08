import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import firebase from 'firebase'

// Boostrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue } from 'bootstrap-vue'

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCookie, faUtensils, faBeer, faMoneyCheckAlt, faChevronDown, faChevronUp, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import VueTheMask from 'vue-the-mask'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueTheMask)

library.add(
  faCookie,
  faUtensils,
  faBeer,
  faMoneyCheckAlt,
  faChevronDown,
  faChevronUp,
  faTimesCircle
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// let app = {}

// Your web app's Firebase configuration
//  const firebaseConfig = {
//   apiKey: "AIzaSyCifynvwhDFrERlHWwsfyOt8zvQYezScwo",
//   authDomain: "tcc-ufsc-6954c.firebaseapp.com",
//   databaseURL: "https://tcc-ufsc-6954c.firebaseio.com",
//   projectId: "tcc-ufsc-6954c",
//   storageBucket: "tcc-ufsc-6954c.appspot.com",
//   messagingSenderId: "1001793926821",
//   appId: "1:1001793926821:web:f26424917bf0c89f80bf4c",
//   measurementId: "G-K6R7557CX3"
// };
const firebaseConfig = {
  apiKey: "AIzaSyAGkkA8UFPr64IdxNWgXtgyseXbLDMcsY0",
  authDomain: "food-wallet-1ed2b.firebaseapp.com",
  databaseURL: "https://food-wallet-1ed2b.firebaseio.com",
  projectId: "food-wallet-1ed2b",
  storageBucket: "food-wallet-1ed2b.appspot.com",
  messagingSenderId: "679562323939",
  appId: "1:679562323939:web:d9e944e954a317d826a2d6",
  measurementId: "G-K7Q1LMQ2P3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.firestore().enablePersistence()
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });

// firebase.auth().onAuthStateChanged(() => {
//   if (!app) {
//     app = new Vue({
//       router,
//       render: h => h(App)
//     }).$mount('#app')
//   }
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
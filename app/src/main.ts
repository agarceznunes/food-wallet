import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import firebase from 'firebase'

// Boostrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue } from 'bootstrap-vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

// let app = {}

// Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyCifynvwhDFrERlHWwsfyOt8zvQYezScwo",
  authDomain: "tcc-ufsc-6954c.firebaseapp.com",
  databaseURL: "https://tcc-ufsc-6954c.firebaseio.com",
  projectId: "tcc-ufsc-6954c",
  storageBucket: "tcc-ufsc-6954c.appspot.com",
  messagingSenderId: "1001793926821",
  appId: "1:1001793926821:web:f26424917bf0c89f80bf4c",
  measurementId: "G-K6R7557CX3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

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
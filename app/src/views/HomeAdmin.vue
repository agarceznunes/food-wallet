<template>
  <div class="home-admin">
    <img class="logo" alt="Vue logo" src="@/assets/logo.png">
    <h1>Administrador</h1>
    <h3 class="pb-5 subtitle">{{userName}}</h3>
    <div class="py-3">
      <router-link class="btn btn-secondary w-50" :to="{ name: 'UserRegister', params: {userName: this.userName, restaurantId: this.restaurantId}}">Cadastro de Clientes</router-link>
    </div>
    <div class="py-3">
      <router-link class="btn btn-secondary w-50" :to="{ name: 'Points', params: {userName: this.userName}}">Pontos</router-link>
    </div>
    <div class="py-3">
      <router-link class="btn btn-secondary w-50" :to="{ name: 'Coupons', params: {userName: this.userName}}">Cupons</router-link>
    </div>
    <div class="py-3">
      <router-link class="btn btn-secondary w-50" :to="{ name: 'Plans', params: {userName: this.userName}}">Programa de Fidelidade</router-link>
    </div>
    <div class="py-3">
      <router-link class="btn btn-secondary w-50" :to="{ name: 'Simulator', params: {userName: this.userName}}">Simulador</router-link>
    </div>
    <button class="btn btn-primary w-50 my-3" @click="logout">Sair</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import router from '@/router'

export default {
  name: 'HomeAdmin',
  data () {
    return {
      userName: '',
      restaurantId: undefined
    }
  },
  created () {
    this.getParameters()
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        router.push('login')
      })
    },
    getParameters(){
      if (firebase.auth().currentUser) {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(data => {
          if (data.data().name) this.userName = data.data().name
          if (data.data().restaurant) this.restaurantId = data.data().restaurant.id
        })
      }
    }
  }
}
</script>

<style scoped>
</style>

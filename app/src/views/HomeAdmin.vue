<template>
  <div class="home-admin py-5">
    <img class="logo" alt="Vue logo" src="@/assets/logo.png">
    <div class="py-3">
      <router-link class="btn btn-primary w-50" to="/user-register">Cadastro de Usuários</router-link>
    </div>
    <div class="py-3">
      <router-link class="btn btn-primary w-50" to="/points">Pontos</router-link>
    </div>
    <div class="py-3">
      <router-link class="btn btn-primary w-50" to="/coupons">Cupons</router-link>
    </div>
    <div class="py-3">
      <router-link class="btn btn-primary w-50" to="/plans">Plano</router-link>
    </div>
    <div class="py-3">
      <router-link class="btn btn-primary w-50" to="/home-admin">Simulador</router-link>
    </div>
    <button class="btn btn-primary my-3" @click="logout">Sair</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import router from '@/router'

export default {
  name: 'HomeAdmin',
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        router.push('login')
      })
    }
  }
}
</script>

<style scoped>

</style>

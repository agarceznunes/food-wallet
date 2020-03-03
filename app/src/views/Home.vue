<template>
  <div class="home">
    <h1>Bem vindo.</h1>
    <button class="btn btn-primary" @click="logout">Sair</button>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'
import router from '@/router'

export default {
  name: 'Home',
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        router.push('login')
      })
    }
  }
}
</script>

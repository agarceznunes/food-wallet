<template>
    <div class="login">
        <img class="logo" alt="Vue logo" src="@/assets/logo.png">
        <div class="container">
            <h1 class="pb-5">A sua carteira de pontos!</h1>
            <form @submit.prevent="login()">
                <div class="form-group">
                    <input class="form-control w-100" type="text" v-model="email" placeholder="E-mail" autocomplete="off">
                </div>
                <div class="form-group">
                    <input class="form-control w-100" type="password" v-model="password" placeholder="Senha" autocomplete="off">
                </div>
                <button type="submit" class="btn btn-block btn-primary">Entrar</button>
            </form>    
            <!-- <span>Não tem cadastro? <router-link to="/sign-up">Cadastre-se</router-link></span> -->
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import router from '@/router'

    export default {
        name: 'Login',
        data() {
            return {
                email: undefined,
                password: undefined
            }
        },
        methods: {
            login() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(data => {  
                    firebase.firestore().collection('users').doc(data.user.uid).get().then(user => {
                        user.data().admin ? router.push('home-admin') : router.push('home')     
                    })
                }, reject => {
                    this.$root.$emit('changeToast', { message: reject.message, type: 'error' })
                })
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
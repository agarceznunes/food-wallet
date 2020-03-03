<template>
    <div class="sign-up">
        <div class="container">
            <h1>Cadastrar</h1>
            <form @submit.prevent="signUp()">
                <div class="form-group">
                    <input class="w-100" type="text" v-model="email" placeholder="E-mail" autocomplete="off">
                </div>
                <div class="form-group">
                    <input class="w-100" type="password" v-model="password" placeholder="Password" autocomplete="off">
                </div>
                <button type="submit" class="btn btn-block btn-primary">Cadastrar</button>
            </form>    
            <router-link to="/">Voltar</router-link>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import router from '../../router'

    export default {
        name: 'SignUp',
        data() {
            return {
                email: undefined,
                password: undefined
            }
        },
        methods: {
            signUp() {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => {
                    this.$root.$emit('changeToast', { message: 'Cadastro realizado com sucesso.', type: 'success' })
                    router.push('home')
                }, reject => {
                    this.$root.$emit('changeToast', { message: reject.message, type: 'error' })
                })
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
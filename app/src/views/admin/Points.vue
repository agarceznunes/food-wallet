<template>
    <div class="perfil">
        <div class="container">
            <h1>Pontos</h1>
            <form @submit.prevent="score()">
                <div class="form-group">
                    <input class="w-100" type="text" v-model="cpf" placeholder="CPF" autocomplete="off">
                </div>
                <button type="submit" class="btn btn-block btn-primary">Pontuar</button>
            </form>
            <form @submit.prevent="validate()" class="mt-5">
                <div class="form-group">
                    <input class="w-100" type="text" v-model="code" placeholder="Código" autocomplete="off">
                </div>
                <button type="submit" class="btn btn-block btn-primary">Validar</button>
            </form>    
            <router-link to="/home-admin">Voltar</router-link>
        </div>
    </div>
</template>

<script>
    // import firebase from 'firebase'
    // import router from '@/router'

    export default {
        name: 'Points',
        data() {
            return {
                cpf: undefined,
                code: undefined
            }
        },
        methods: {
            score() {
                // firebase.auth().createUserWithEmailAndPassword(this.email, this.cpf).then(() => {
                //     this.$root.$emit('changeToast', { message: 'Cadastro realizado com sucesso.', type: 'success' })
                //     router.push('home-admin')
                // }, reject => {
                //     this.$root.$emit('changeToast', { message: reject.message, type: 'error' })
                // })
                return null
            },
            validate() {
                return null
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
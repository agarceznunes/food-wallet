<template>
    <div class="perfil">
        <div class="container">
            <h1>Cadastro de Usuários</h1>
            <form @submit.prevent="register()">
                <div class="form-group">
                    <input class="w-100" type="text" v-model="email" placeholder="E-mail" autocomplete="off">
                </div>
                <div class="form-group">
                    <input class="w-100" type="text" v-model="cpf" placeholder="CPF" autocomplete="off">
                </div>
                <button type="submit" class="btn btn-block btn-primary">Salvar</button>
            </form>    
            <router-link to="/home-admin">Voltar</router-link>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import router from '@/router'

    export default {
        name: 'Perfil',
        data() {
            return {
                email: undefined,
                cpf: undefined
            }
        },
        methods: {
            register() {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.cpf).then(data => {
                    firebase.firestore().collection('users').doc(data.user.uid).set({admin: false}).then(() => {
                        this.$root.$emit('changeToast', { message: 'Cadastro realizado com sucesso.', type: 'success' })
                        router.push('home-admin')
                    }, reject => {
                        this.$root.$emit('changeToast', { message: reject.message, type: 'error' })
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
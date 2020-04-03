<template>
    <div class="perfil">
        <div class="container">
            <h1>Dados Cadastrais</h1>
            <form @submit.prevent="updatePerfil()">
                <div class="form-group">
                    <input class="w-100" type="text" v-model="name" placeholder="Nome" autocomplete="off">
                </div>
                <div class="form-group float-left">
                    <input type="radio" class="mr-2" v-model="gender" value="1" checked>Masculino
                    <input type="radio" class="mr-2" v-model="gender" value="2">Feminino
                    <input type="radio" class="mr-2" v-model="gender" value="0">Não informar
                </div>
                <div class="form-group">
                    <input class="w-100" type="date" v-model="birthDate" placeholder="Data de Nascimento" autocomplete="off">
                </div>
                <div class="form-group float-left">
                    <button type="button" class="btn btn-primary" v-on:click="passwordFields = !passwordFields">Mudar Senha</button>
                </div>
                <div v-if="passwordFields" class="form-group">
                    <input class="w-100" type="password" v-model="currentPassword" placeholder="Senha Atual" autocomplete="off">
                </div>
                <div v-if="passwordFields" class="form-group">
                    <input class="w-100" type="password" v-model="password" placeholder="Nova Senha" autocomplete="off">
                </div>
                <div v-if="passwordFields" class="form-group">
                    <input class="w-100" type="password" v-model="confirmationPassword" placeholder="Confirmar Senha" autocomplete="off">
                </div>
                <button type="submit" class="btn btn-block btn-primary">Salvar</button>
            </form>    
            <router-link to="/home">Voltar</router-link>
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
                name: undefined,
                gender: undefined,
                birthDate: undefined,
                currentPassword: undefined,
                password: undefined,
                confirmationPassword: undefined,
                passwordFields: false
            }
        },
        methods: {
            // login() {
            //     firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
            //         router.push('home')
            //     }, reject => {
            //         this.$root.$emit('changeToast', { message: reject.message, type: 'error' })
            //     })
            // }
            updatePerfil() {
                if (this.password !== undefined) {
                    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
                        name: this.name,
                        gender: this.gender,
                        birthDate: this.birthDate,
                        password: this.password
                    })
                    .then(() => {
                        this.$root.$emit('changeToast', { message: 'Atualização realizada com sucesso.', type: 'success' })
                        router.push('home')
                    }, reject => {
                        this.$root.$emit('changeToast', { message: reject.message, type: 'error' })
                    })
                } else {
                    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
                        name: this.name,
                        gender: this.gender,
                        birthDate: this.birthDate,
                    })
                    .then(() => {
                        this.$root.$emit('changeToast', { message: 'Atualização realizada com sucesso.', type: 'success' })
                        router.push('home')
                    }, reject => {
                        this.$root.$emit('changeToast', { message: reject.message, type: 'error' })
                    })
                }
                
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
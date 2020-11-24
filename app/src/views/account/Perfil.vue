<template>
    <div class="perfil">
        <div class="container">
            <h1 class="pb-5">Dados Cadastrais</h1>
            <form @submit.prevent="updatePerfil()">
                <div class="form-group">
                    <label class="float-left font-weight-bold" for="name">Nome Completo:</label>
                    <input class="form-control w-100" type="text" id="name" v-model="name" placeholder="Nome completo" autocomplete="off" required>
                </div>
                <div class="form-group text-left">
                    <label class="float-left font-weight-bold mr-3" for="gender">Sexo:</label>
                    <input type="radio" class="mr-2" v-model="gender" name="gender" value="1" checked>Masculino
                    <input type="radio" class="mr-2" v-model="gender" name="gender" value="2">Feminino
                    <input type="radio" class="mr-2" v-model="gender" name="gender" value="0">Não informar
                </div>
                <div class="form-group">
                    <label class="float-left font-weight-bold" for="birthDate">Data de Nascimento:</label>
                    <input class="form-control w-100" type="date" name="birthDate" v-model="birthDate" placeholder="Data de Nascimento" autocomplete="off" required>
                </div>
                <div class="form-group float-left">
                    <button type="button" class="btn btn-secondary" v-on:click="passwordFields = !passwordFields">Mudar Senha<font-awesome-icon class="ml-2" icon="chevron-down" /></button>
                </div>
                <div v-if="passwordFields" class="form-group">
                    <input class="form-control w-100" type="password" v-model="password" placeholder="Nova Senha" autocomplete="off">
                </div>
                <div v-if="passwordFields" class="form-group">
                    <input class="form-control w-100" type="password" v-model="confirmationPassword" placeholder="Confirmar Senha" autocomplete="off">
                </div>
                <button type="submit" class="btn btn-block btn-primary mb-3">Salvar</button>
            </form>    
            <router-link to="/home"><button class="btn btn-block btn-tertiary mb-3">Voltar</button></router-link>
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
                data: [],
                name: undefined,
                gender: 1,
                birthDate: undefined,
                password: undefined,
                confirmationPassword: undefined,
                passwordFields: false
            }
        },
        created() {
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(data => {
                this.name = data.data().name
                this.gender = data.data().gender
                this.birthDate = data.data().birthDate
            })
        },
        methods: {
            updatePerfil() {
                if (this.password !== undefined) {
                    if (this.password === this.confirmationPassword) {
                        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
                            name: this.name,
                            gender: this.gender,
                            birthDate: this.birthDate
                        }, { merge: true })
                        .then(() => {
                            firebase.auth().currentUser.updatePassword(this.password).then(() => {
                                this.$root.$emit('changeToast', { message: 'Atualização realizada com sucesso.', type: 'success' })
                                router.push('home')
                            }, reject => {
                                this.$root.$emit('changeToast', { message: reject.message, type: 'error' })
                            })
                        }, reject => {
                            this.$root.$emit('changeToast', { message: reject.message, type: 'error' })
                        })
                    } else {
                        this.$root.$emit('changeToast', { message: 'Confirmação de senha incorreta.', type: 'error' })
                    }
                } else {
                    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
                        name: this.name,
                        gender: this.gender,
                        birthDate: this.birthDate,
                    }, {merge: true})
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
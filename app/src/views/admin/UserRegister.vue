<template>
    <div class="perfil">
        <div class="container">
            <h1>Administrador</h1>
            <h3 class="pb-5 subtitle">{{userName}}</h3>
            <h1 class="pb-5">Cadastro de Usuários</h1>
            <form @submit.prevent="register()">
                <div class="form-group">
                    <input class="form-control w-100" type="email" v-model="email" placeholder="E-mail" autocomplete="off" required>
                </div>
                <div class="form-group">
                    <input class="form-control w-100" type="text" v-model="cpf" placeholder="CPF" v-mask="'###.###.###-##'" autocomplete="off" required>
                </div>
                <button type="submit" class="btn btn-block btn-primary mb-3">Salvar</button>
            </form>    
            <router-link to="/home-admin"><button class="btn btn-block btn-tertiary mb-3">Voltar</button></router-link>
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
                data: undefined,
                email: undefined,
                cpf: undefined,
                userName: this.$route.params.userName,
                restaurantId: this.$route.params.restaurantId,
                txPrimeiroCliente: undefined
            }
        },
        created () {
            this.getTxPrimeiroCliente()
        },
        methods: {
            register() {
                firebase.firestore().collection('users').where('cpf', '==', this.cpf.replace(/\W+/gi, '')).get().then(data => {
                    if (data.empty) {
                        firebase.auth().createUserWithEmailAndPassword(this.email, this.cpf.replace(/\W+/gi, '')).then(data => {
                            this.data = data
                            firebase.firestore().collection('users').doc(data.user.uid).set({admin: false, cpf: this.cpf.replace(/\W+/gi, '')}).then(() => {
                                this.setPontuation()
                            }, reject => {
                                this.$root.$emit('changeToast', { message: reject.message, type: 'error' })
                            })
                        }, reject => {
                            this.$root.$emit('changeToast', { message: reject.message, type: 'error' })
                        })
                    } else {
                        this.$root.$emit('changeToast', { message: 'Já existe um usuário com este CPF cadastrado.', type: 'error' })
                    }
                }, reject => {
                    this.$root.$emit('changeToast', { message: reject.message, type: 'error' })
                })
            },
            getTxPrimeiroCliente() {
                firebase.firestore().collection('restaurants').doc(this.restaurantId).get().then(data => {
                    this.txPrimeiroCliente = data.data().txPrimeiroCliente
                })
            },
            setPontuation() {
                // firebase.firestore().collection('users').doc(this.data.user.uid).collection('pontuation').add({restaurant:firebase.firestore().doc('restaurants/'+this.restaurantId), value: this.txPrimeiroCliente}).then(() => {
                //     this.$root.$emit('changeToast', { message: 'Cadastro realizado com sucesso.', type: 'success' })
                //     router.push('home-admin')
                // }, reject => {
                //     this.$root.$emit('changeToast', { message: reject.message, type: 'error' })
                // })
                firebase.firestore().collection('pontuation').add({
                    restaurant: firebase.firestore().doc('restaurants/'+this.restaurantId),
                    user: firebase.firestore().doc('users/'+this.data.user.uid),
                    value: parseInt(this.txPrimeiroCliente)
                }).then(() => {
                    this.$root.$emit('changeToast', { message: 'Cadastro realizado e adicionados '+ this.txPrimeiroCliente +' pontos na conta.', type: 'success' })
                    router.push('home-admin')
                })
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
<template>
    <div class="perfil">
        <div class="container">
            <h1>Administrador</h1>
            <h3 class="pb-5 subtitle">Burger Bar</h3>
            <h1 class="pb-5">Pontos</h1>
            <form @submit.prevent="score()">
                <div class="form-group">
                    <input class="form-control w-100" type="text" v-model="cpf" placeholder="CPF" v-mask="'###.###.###-##'" autocomplete="off" required>
                </div>
                <button type="submit" class="btn btn-block btn-primary">Pontuar</button>
            </form>
            <form @submit.prevent="validate()" class="mt-5">
                <div class="form-group">
                    <input class="form-control w-100" type="text" v-model="cpf2" placeholder="CPF" v-mask="'###.###.###-##'" autocomplete="off" required>
                </div>
                <div class="form-group">
                    <input class="form-control w-100" type="text" v-model="code" placeholder="Código" autocomplete="off" required>
                </div>
                <button type="submit" class="btn btn-block btn-primary mb-3">Validar</button>
            </form>    
            <router-link to="/home-admin"><button class="btn btn-block btn-tertiary mb-3">Voltar</button></router-link>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import router from '@/router'

    export default {
        name: 'Points',
        data() {
            return {
                cpf: undefined,
                cpf2: undefined,
                code: undefined,
                restaurant: undefined,
                couponUser: {},
                pontuation: {}
            }
        },
        created () {
            this.getPlans()
        },
        methods: {
            getPlans() {
                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(data => {
                    firebase.firestore().collection('restaurants').doc(data.data().restaurant.id).get().then(restaurant => {
                        this.restaurant = restaurant
                    })
                })
            },
            score() {
                firebase.firestore().collection('users').where('cpf', '==', this.cpf.replace(/\W+/gi, '')).get().then(data => {
                    if (!data.empty) {
                        firebase.firestore().collection('pontuation').get().then(data2 => {
                            let alreadyHas = false
                            data2.forEach(element => {
                              if (element.data().restaurant.id === this.restaurant.id && element.data().user.id === data.docs[0].id) {
                                  this.pontuation = element
                                  alreadyHas = true
                              }
                            })
                            if (alreadyHas === true) {
                                firebase.firestore().collection('pontuation').doc(this.pontuation.id).set({
                                    value: firebase.firestore.FieldValue.increment(parseInt(this.restaurant.data().txPontuacao))
                                }, { merge: true }).then(() => {
                                    this.$root.$emit('changeToast', { message: 'Foram adicionados '+ this.restaurant.data().txPontuacao +' pontos na conta.', type: 'success' })
                                    router.push('home-admin')
                                })
                            } else {
                                firebase.firestore().collection('pontuation').add({
                                    restaurant: firebase.firestore().doc('restaurants/'+this.restaurant.id),
                                    user: firebase.firestore().doc('users/'+data.docs[0].id),
                                    value: firebase.firestore.FieldValue.increment(parseInt(this.restaurant.data().txPontuacao))
                                }).then(() => {
                                    this.$root.$emit('changeToast', { message: 'Foram adicionados '+ this.restaurant.data().txPontuacao +' pontos na conta.', type: 'success' })
                                    router.push('home-admin')
                                })
                            }
                        })
                    }
                })
            },
            validate() {
                firebase.firestore().collection('userCoupons').where('userCpf', '==', this.cpf2.replace(/\W+/gi, '')).where('code', '==', parseInt(this.code)).get().then(data2 => {
                    if (!data2.empty) {
                        firebase.firestore().collection('userCoupons').doc(data2.docs[0].id).delete().then(() => {
                            this.$root.$emit('changeToast', { message: 'Cupom validado com sucesso.', type: 'success' })
                            router.push('home-admin')
                        })
                    } else {
                        this.$root.$emit('changeToast', { message: 'Dados incorretos ou inexistentes.', type: 'error' })
                    }
                }, reject => {
                    this.$root.$emit('changeToast', { message: reject.message, type: 'error' })
                })
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
<template>
    <div class="perfil">
        <div class="container">
            <h1>Administrador</h1>
            <h3 class="pb-5 subtitle">Burger Bar</h3>
            <h1 class="pb-5">Plano</h1>
            <form @submit.prevent="save()">
                <div class="form-group">
                    <input class="form-control w-100" type="number" v-model="txPontuacao" placeholder="Pontuação por Vendas" autocomplete="off" required>
                </div>
                <div class="form-group">
                    <input class="form-control w-100" type="number" v-model="txPrimeiroCliente" placeholder="Pontuação para 1º Cliente" autocomplete="off" required>
                </div>
                <div class="form-group">
                    <input class="form-control w-100" type="number" v-model="txFimSemana" placeholder="Pontuação por Vendas - Final de Semana" autocomplete="off">
                </div>
                <div class="form-group">
                    <input class="form-control w-100" type="number" v-model="txDiurno" placeholder="Pontuação por Vendas - Período Diurno" autocomplete="off">
                </div>
                <div class="form-group">
                    <input class="form-control w-100" type="number" v-model="txNoturno" placeholder="Pontuação por Vendas - Período Noturno" autocomplete="off">
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
        name: 'Plans',
        data() {
            return {
                txPontuacao: undefined,
                txPrimeiroCliente: undefined,
                txFimSemana: undefined,
                txDiurno: undefined,
                txNoturno: undefined
            }
        },
        methods: {
            save() {
                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(data => {
                    firebase.firestore().collection('restaurants').doc(data.data().restaurant.id).set({
                        txPontuacao: this.txPontuacao,
                        txPrimeiroCliente: this.txPrimeiroCliente,
                        txFimSemana: this.txFimSemana,
                        txDiaSemana: this.txDiaSemana,
                        txDiurno: this.txDiurno,
                        txNoturno: this.txNoturno
                    }, { merge: true })
                    .then(() => {
                        this.$root.$emit('changeToast', { message: 'O plano do seu restaurante foi atualizado.', type: 'success' })
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
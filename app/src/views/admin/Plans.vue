<template>
    <div class="perfil">
        <div class="container">
            <h1>Plano</h1>
            <form @submit.prevent="save()">
                <div class="form-group">
                    <input class="w-100" type="number" v-model="txPontuacao" placeholder="Taxa de Pontuação" autocomplete="off">
                </div>
                <div class="form-group">
                    <input class="w-100" type="number" v-model="txPrimeiroCliente" placeholder="Pontuação para 1º Cliente" autocomplete="off">
                </div>
                <div class="form-group">
                    <input class="w-100" type="number" v-model="txFimSemana" placeholder="Taxa de Fim de Semana" autocomplete="off">
                </div>
                <div class="form-group">
                    <input class="w-100" type="number" v-model="txDiaSemana" placeholder="Taxa de Dia de Semana" autocomplete="off">
                </div>
                <div class="form-group">
                    <input class="w-100" type="number" v-model="txDiurno" placeholder="Taxa Período Diurno" autocomplete="off">
                </div>
                <div class="form-group">
                    <input class="w-100" type="number" v-model="txNoturno" placeholder="Taxa Período Noturno" autocomplete="off">
                </div>
                <button type="submit" class="btn btn-block btn-primary">Salvar</button>
            </form>
            <router-link to="/home-admin">Voltar</router-link>
        </div>
    </div>
</template>

<script>
    // import firebase from 'firebase'
    // import router from '@/router'

    export default {
        name: 'Plans',
        data() {
            return {
                txPontuacao: undefined,
                txPrimeiroCliente: undefined,
                txFimSemana: undefined,
                txDiaSemana: undefined,
                txDiurno: undefined,
                txNoturno: undefined
            }
        },
        methods: {
            save() {
                // firebase.auth().createUserWithEmailAndPassword(this.email, this.cpf).then(() => {
                //     this.$root.$emit('changeToast', { message: 'Cadastro realizado com sucesso.', type: 'success' })
                //     router.push('home-admin')
                // }, reject => {
                //     this.$root.$emit('changeToast', { message: reject.message, type: 'error' })
                // })
                return null
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
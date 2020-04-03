<template>
    <div class="perfil">
        <div class="container">
            <h1>Cupons</h1>
            <form @submit.prevent="save()">
                <div class="form-group">
                    <input class="w-100" type="number" v-model="pratoPrincipal" placeholder="Prato Principal (pts.)" autocomplete="off">
                </div>
                <div class="form-group">
                    <input class="w-100" type="text" v-model="acompanhamento" placeholder="Acompanhamento (pts.)" autocomplete="off">
                </div>
                <div class="form-group">
                    <input class="w-100" type="text" v-model="bebida" placeholder="Bebida (pts.)" autocomplete="off">
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
        name: 'Coupons',
        data() {
            return {
                pratoPrincipal: undefined,
                acompanhamento: undefined,
                bebida: undefined
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
<template>
    <div class="perfil">
        <div class="container">
            <h1>Administrador</h1>
            <h3 class="pb-5 subtitle">Burger Bar</h3>
            <h1 class="pb-5">Cupons</h1>
            <form @submit.prevent="save()">
                <div class="form-group">
                    <input class="form-control w-100" type="text" v-model="nmPrato" placeholder="Nome do Prato" autocomplete="off" required>
                </div>
                <div class="form-group">
                    <input class="form-control w-100" type="number" v-model="valorPrato" placeholder="Valor em pts." autocomplete="off" required>
                </div>
                <!-- <div class="form-group">
                    <input class="w-100" type="text" v-model="imagem" placeholder="Ícone do prato" autocomplete="off">
                </div> -->
                <div class="form-group text-left my-5">
                    <label class="float-left font-weight-bold mr-3" for="itemType">Tipo de item:</label>
                    <input type="radio" class="mr-2" v-model="itemType" name="itemType" value="1">Prato Principal
                    <input type="radio" class="mr-2" v-model="itemType" name="itemType" value="2">Aperitivo
                    <input type="radio" class="mr-2" v-model="itemType" name="itemType" value="0">Bebida
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
        name: 'Coupons',
        data() {
            return {
                nmPrato: undefined,
                valorPrato: undefined,
                // imagem: undefined,
                itemType: 1
            }
        },
        methods: {
            save() {
                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(data => {
                    firebase.firestore().collection('coupons').doc().set({
                        name: this.nmPrato,
                        points: this.valorPrato,
                        // imagem: this.imagem,
                        itemType: this.itemType,
                        restaurant: firebase.firestore().doc('restaurants/'+data.data().restaurant.id)
                    })
                    .then(() => {
                        this.$root.$emit('changeToast', { message: 'O cupom foi cadastrado em seu restaurante.', type: 'success' })
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
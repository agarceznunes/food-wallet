<template>
    <div class="perfil">
        <div class="container">
            <h1>Administrador</h1>
            <h3 class="pb-5 subtitle">{{userName}}</h3>
            <h1 class="pb-5">Meus Cupons</h1>
            <div>
                <table class="table table-bordered table-hover table-sm">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Tipo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody v-if="data.length > 0">
                        <tr v-for="item in data" :key="item.id">
                            <td>{{item.data().name}}</td>
                            <td>{{item.data().points}}</td>
                            <td>{{getItemTypeName(item.data().itemType)}}</td>
                            <td class="cursor-pointer" v-b-modal.my-modal @click="sendDataToModal(item.id)"><font-awesome-icon class="text-danger" icon="times-circle"/></td>
                        </tr>
                    </tbody>
                    <tbody v-else class="text-center">
                        <td colspan="100%">O restaurante ainda não possui cupons cadastrados.</td>
                    </tbody>
                </table>
            </div>
            <h1 class="py-5">Adicionar Cupom</h1>
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
            <b-modal id="my-modal" hide-footer>
                Tem certeza que deseja remover o cupom selecionado?
                <div class="row mt-3 mx-auto">
                    <b-button class="btn btn-primary mr-3" @click="removeCoupon(selectedCoupon)">Sim</b-button>
                    <b-button class="btn btn-primary" @click="$bvModal.hide('my-modal')">Não</b-button>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: 'Coupons',
        data() {
            return {
                data: [],
                nmPrato: undefined,
                valorPrato: undefined,
                // imagem: undefined,
                itemType: 1,
                selectedCoupon: '' ,
                userName: this.$route.params.userName
            }
        },
        created (){
            this.getData()
        },
        methods: {
            getData() {
                this.data = []
                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(data => {
                    firebase.firestore().collection('coupons').get().then(querySnapshot => {
                        if (querySnapshot.size > 0) {
                            querySnapshot.docs.forEach(element => {
                                if (element.data().restaurant.path === 'restaurants/' + data.data().restaurant.id) this.data.push(element)
                            })
                        }
                    })
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                })
            },
            getItemTypeName(itemType) {
                if (itemType == 1) {
                    return 'Prato P.'
                } else if (itemType == 2) {
                    return 'Aperitivo'
                } else if (itemType == 0){
                    return 'Bebida'
                }
            },
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
                        this.nmPrato = ''
                        this.valorPrato = ''
                        this.itemType = 1
                        this.getData()
                    }, reject => {
                        this.$root.$emit('changeToast', { message: reject.message, type: 'error' })
                    })                    
                }, reject => {
                    this.$root.$emit('changeToast', { message: reject.message, type: 'error' })
                })
            },
            sendDataToModal(item) {
                this.selectedCoupon = item
            },
            removeCoupon(id) {
                firebase.firestore().collection('coupons').doc(id).delete().then(() => {
                    this.$bvModal.hide('my-modal')
                    this.getData()
                    this.$root.$emit('changeToast', { message: 'O cupom foi removido do seu restaurante.', type: 'success' })
                }, reject => {
                    this.$root.$emit('changeToast', { message: reject.message, type: 'error' })
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.table {
    background-color: #fff;
}
.table thead {
    background-color: gold;
}
.cursor-pointer {
    cursor: pointer;
}
</style>
<template>
  <div class="home">
    <img class="logo" alt="Vue logo" src="@/assets/logo.png">
    <div class="container">
      <h1>Bem vindo, {{userName}}.</h1>

      <div class="wallet-accordion my-5" role="tablist">
        <b-card no-body class="mb-1" v-for="item in restaurantList" :key="item.id">
          <b-card-header header-tag="header" class="p-1 header" role="tab">
            <b-button block href="#" v-b-toggle="'id-'+item.id" variant="info">
              <div class="row">
                <div class="col-sm-2 col-6">
                  <img class="restaurant-icon" :src="getImgUrl(item.data().logo)">
                </div>
                <div class="col-sm-4 col-6 d-flex align-items-center">
                  <span class="custom-margin-auto">{{item.data().name}}</span> 
                </div>
                <div class="col-sm-3 col-6 d-flex align-items-center">
                  <span class="mx-3 custom-margin-auto">Pontos<br>{{getPontuation(item.id)}}</span> 
                </div>
                <div class="col-sm-3 col-6 d-flex align-items-center">
                  <font-awesome-icon v-if="getPontuation(item.id) > 0" class="ml-4 custom-margin-auto" icon="money-check-alt" />
                </div>
              </div>
            </b-button>
          </b-card-header>
          <b-collapse :id="'id-'+item.id" role="tabpanel">
            <b-card-body class="p-0">
              <b-card-text>
                <!-- <div class="row"> -->
                <div v-for="coupon in coupons" :key="coupon.id">
                  <div class="row py-1" v-if="coupon.data().restaurant.path == 'restaurants/'+item.id">
                    <div class="col-sm-2 col-6 d-flex align-items-center">
                      <span class="custom-margin-auto" v-if="coupon.data().itemType === 1"><font-awesome-icon class="ml-3 custom-margin-auto-2" icon="utensils" /></span>
                      <span class="custom-margin-auto" v-else-if="coupon.data().itemType === 2"><font-awesome-icon class="ml-3 custom-margin-auto-2" icon="cookie" /></span>
                      <span class="custom-margin-auto" v-else><font-awesome-icon class="ml-3 custom-margin-auto-2" icon="beer" /></span>
                    </div>
                    <div class="col-sm-4 col-6 d-flex align-items-center">
                      <span class="custom-margin-auto">{{coupon.data().name}}</span>
                    </div>
                    <div class="col-sm-3 col-6 d-flex align-items-center">
                      <span class="mx-3 custom-margin-auto">Pontos<br>{{coupon.data().points}}</span>
                    </div>
                    <div class="col-sm-3 col-6 d-flex align-items-center">
                      <button v-if="getPontuation(item.id) >= coupon.data().points" id="btnResgate" @click="rescueCoupon(item.id, getPontuationId(item.id), coupon.data().points, coupon.data().name)" class="btn btn-primary custom-margin-auto">Resgatar</button>
                    </div>
                  </div>
                  <!-- <div v-else>Sem cupons disponíveis.</div> -->
                </div>
              </b-card-text>
            </b-card-body>
            <b-card-footer class="m-0 p-0">
              <div v-for="userCoupon in userCoupons" :key="userCoupon.id">
                <div class="py-2" v-if="userCoupon.data().restaurant.path == 'restaurants/'+item.id && userCoupon.data().user.path == 'users/'+userId">
                  <b>{{userCoupon.data().code}}</b> - {{userCoupon.data().itemName}}
                </div>
              </div>
            </b-card-footer>
          </b-collapse>
        </b-card>
      </div>
      <div class="row mb-5">
        <div class="col-sm-6">
          <router-link class="btn btn-primary w-100" to="/perfil">Perfil</router-link>
        </div>
        <div class="col-sm-6">
          <button class="btn btn-secondary w-100" @click="logout">Sair</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import router from '@/router'

export default {
  name: 'Home',
   data () {
    return {
      user: {},
      restaurantList: [],
      pontuationList: [],
      pontuation: undefined,
      pontuationId: undefined,
      coupons: [],
      userCoupons: [],
      userName: 'Usuário',
      userCpf: undefined,
      userId: undefined
    }
  },
  created () {
    this.getUser()
    this.getListRestaurant()
    this.getPontuationList()
    this.getCoupons()
    this.getUserCoupons()
    this.getUserName()
  },
  methods: {
    getUser () {
      if (firebase.auth().currentUser) {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(data => {
            this.user = data
        })
      }
    },
    getListRestaurant () {
      firebase.firestore().collection('restaurants').get().then(data => {
        this.restaurantList = data.docs
      })
    },
    logout() {
      firebase.auth().signOut().then(() => {
        router.push('login')
      })
    },
    getImgUrl(imgName) {
      if (imgName != null) {
        const images = require.context('@/assets/', false, /\.png$/)
        return images('./' + imgName + ".png")
      }
      return null
    },
    getPontuationList(){
      firebase.firestore().collection('pontuation').get().then(data => {
        this.pontuationList = data.docs
      })
    },
    getPontuation(restaurantId) {
      let hasPoints = false
      this.pontuationList.forEach(element => {
        if (element.data().restaurant.id === restaurantId && element.data().user.id === this.user.id) {
          hasPoints = true
          this.pontuation = element.data().value
        }
      })
      if (hasPoints) return this.pontuation
      return 0
    },
    getPontuationId(restaurantId) {
      let hasPoints = false
      this.pontuationList.forEach(element => {
        if (element.data().restaurant.id === restaurantId && element.data().user.id === this.user.id) {
          hasPoints = true
          this.pontuationId = element.id
        }
      })
      if (hasPoints) return this.pontuationId
      return null
    },
    getCoupons() {
      firebase.firestore().collection('coupons')
      .get()
      .then(querySnapshot => {
          this.coupons = querySnapshot.docs
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
    },
    getUserCoupons() {
      firebase.firestore().collection('userCoupons')
      .get()
      .then(querySnapshot => {
          this.userCoupons = querySnapshot.docs
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
    },
    getUserName(){
      if (firebase.auth().currentUser) {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(data => {
          if (data.id) this.userId = data.id
          if (data.data().name) this.userName = data.data().name
          if (data.data().cpf) this.userCpf = data.data().cpf
        })
      }
    },
    rescueCoupon(restaurantId ,pontuationId, points, itemName) {
      const code = Math.floor(Math.random()*(999999999)+99999999)

      firebase.firestore().collection('pontuation').doc(pontuationId).set({
        value: firebase.firestore.FieldValue.increment(parseInt(-(points))),
      }, { merge: true })
      .then(() => {

        firebase.firestore().collection('userCoupons').add({
          restaurant: firebase.firestore().doc('restaurants/'+restaurantId),
          user: firebase.firestore().doc('users/'+this.user.id),
          userCpf: this.userCpf,
          code: code,
          itemName: itemName,
          value: points
        }).then(() => {
          this.getPontuationList()
          this.getCoupons()
          this.getUserCoupons()
          this.$root.$emit('changeToast', { message: 'Parabéns, mostre o cód do cupom para o responsável do restaurante.', type: 'success' })
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

<style scoped>
  .restaurant-icon {
    width: 80px;
    height: 80px;
  }
  .wallet-accordion .header {
    background-color: #0C326F;
  }
  .wallet-accordion .btn-info {
    background-color: gold;
    border: none;
    color: initial;
    font-weight: 700;
  }
  @media (max-width: 575.98px) { 
    .custom-margin-auto {
      margin-left: auto !important;
      margin-right: auto !important;
      margin-top: 10px;
    }
    .custom-margin-auto-2 {
      margin-left: 0 !important;
    }
  }
</style>

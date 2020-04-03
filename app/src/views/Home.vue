<template>
  <div class="home py-5">
    <img class="logo" alt="Vue logo" src="@/assets/logo.png">
    <div class="container">
      <h1>Bem vindo!</h1>

      <div class="wallet-accordion my-5" role="tablist">
        <b-card no-body class="mb-1" v-for="item in data" :key="item.id">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block href="#" v-b-toggle="'id-'+item.id" variant="info">
              <div class="row">
                <div class="col-sm-2">
                  <img class="restaurant-icon" src="@/assets/mcdonalds-icon.png">
                </div>
                <div class="col-sm-4 d-flex align-items-center">
                  <span>{{item.data().name}}</span> 
                </div>
                <div class="col-sm-3 d-flex align-items-center">
                  <span class="mx-3">Pontos<br></span> 
                </div>
                <div class="col-sm-1 d-flex align-items-center">
                  <font-awesome-icon icon="utensils" />
                </div>
                <div class="col-sm-1 d-flex align-items-center">
                  <font-awesome-icon icon="cookie" />
                </div>
                <div class="col-sm-1 d-flex align-items-center">
                  <font-awesome-icon icon="beer" />
                </div>
              </div>
            </b-button>
          </b-card-header>
          <b-collapse :id="'id-'+item.id" role="tabpanel">
            <b-card-body class="p-1">
              <b-card-text>
                <div class="row">
                  <div class="col-sm-2 d-flex align-items-center">
                    <span><font-awesome-icon icon="utensils" /></span>
                  </div>
                  <div class="col-sm-4 d-flex align-items-center">
                    <span>Prato Principal</span>
                  </div>
                  <div class="col-sm-3 d-flex align-items-center">
                    <span class="mx-3">Pontos<br>100</span>
                  </div>
                  <div class="col-sm-3 d-flex align-items-center">
                    <button class="btn btn-primary">RESGATAR</button>
                  </div>
                </div>
                <!-- <div class="row">
                  <div class="col-sm-2 d-flex align-items-center">
                    <span><font-awesome-icon icon="cookie" /></span>
                  </div>
                  <div class="col-sm-4 d-flex align-items-center">
                    <span>Acompanhamento</span>
                  </div>
                  <div class="col-sm-3 d-flex align-items-center">
                    <span class="mx-3">Pontos<br>50</span>
                  </div>
                  <div class="col-sm-3 d-flex align-items-center">
                    <button class="btn btn-primary">RESGATAR</button>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-2 d-flex align-items-center">
                    <span><font-awesome-icon icon="beer" /></span>
                  </div>
                  <div class="col-sm-4 d-flex align-items-center">
                    <span>Bebida</span>
                  </div>
                  <div class="col-sm-3 d-flex align-items-center">
                    <span class="mx-3">Pontos<br>25</span>
                  </div>
                  <div class="col-sm-3 d-flex align-items-center">
                    <button class="btn btn-primary">RESGATAR</button>
                  </div>
                </div> -->
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <!-- <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block href="#" v-b-toggle.accordion-2 variant="info">
              <div class="row">
                <div class="col-sm-2">
                  <img class="restaurant-icon" src="@/assets/mcdonalds-icon.png">
                </div>
                <div class="col-sm-4 d-flex align-items-center">
                  <span>McDonald's</span> 
                </div>
                <div class="col-sm-3 d-flex align-items-center">
                  <span class="mx-3">Pontos<br>75</span> 
                </div>
                <div class="col-sm-1 d-flex align-items-center">
                  @
                </div>
                <div class="col-sm-1 d-flex align-items-center">
                  @
                </div>
                <div class="col-sm-1 d-flex align-items-center">
                  @
                </div>
              </div>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-2" role="tabpanel">
            <b-card-body>
              <b-card-text>CARTEIRA ITEM 2</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block href="#" v-b-toggle.accordion-3 variant="info">
              <div class="row">
                <div class="col-sm-2">
                  <img class="restaurant-icon" src="@/assets/subway-icon.png">
                </div>
                <div class="col-sm-4 d-flex align-items-center">
                  <span>Subway</span> 
                </div>
                <div class="col-sm-3 d-flex align-items-center">
                  <span class="mx-3">Pontos<br>50</span> 
                </div>
                <div class="col-sm-1 d-flex align-items-center">
                  @
                </div>
                <div class="col-sm-1 d-flex align-items-center">
                  @
                </div>
                <div class="col-sm-1 d-flex align-items-center">
                  @
                </div>
              </div>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-3" role="tabpanel">
            <b-card-body>
              <b-card-text>CARTEIRA ITEM 3</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block href="#" v-b-toggle.accordion-4 variant="info">
              <div class="row">
                <div class="col-sm-2">
                  <img class="restaurant-icon" src="@/assets/moochacho-icon.png">
                </div>
                <div class="col-sm-4 d-flex align-items-center">
                  <span>Moochacho</span> 
                </div>
                <div class="col-sm-3 d-flex align-items-center">
                  <span class="mx-3">Pontos<br>0</span> 
                </div>
                <div class="col-sm-1 d-flex align-items-center">
                  @
                </div>
                <div class="col-sm-1 d-flex align-items-center">
                  @
                </div>
                <div class="col-sm-1 d-flex align-items-center">
                  @
                </div>
              </div>
            </b-button>
          </b-card-header>
          <b-collapse id="accordion-4" role="tabpanel">
            <b-card-body>
              <b-card-text>CARTEIRA ITEM 4</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card> -->
      </div>
      <div class="row mb-5">
        <div class="col-sm-6">
          <router-link class="btn btn-primary w-100" to="/perfil">Perfil</router-link>
        </div>
        <div class="col-sm-6">
          <button class="btn btn-primary w-100" @click="logout">Sair</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'
import router from '@/router'

export default {
  name: 'Home',
   data () {
    return {
      data: [],
      coupons: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      firebase.firestore().collection('restaurants').get().then(data => {
        this.data = data.docs   
        // data.docs.forEach(function(restaurant) {
        //   firebase.firestore().collection('restaurants').doc(restaurant.id).collection('cupons').get().then(data2 => {
        //     if(data2.docs.length > 0) {
        //       data2.docs.forEach(function(cupom) {
        //         console.log(restaurant.id + cupom.data().name)
        //         // cupons.push({restaurantId: restaurant.id, coupomName: cupom.data().name})
        //       })  
        //     }
        //   }, reject => {
        //     this.$root.$emit('changeToast', { message: reject.message, type: 'error' })
        //   })
        // })
      })
      // this.getCoupons('87yXe4YOmWx51WRC8uHH')
      // this.$http.get('Infracao', { params: { auto: this.auto, placa: this.placa, skip: 0, pageSize: this.pageSize, ordenacaoCrescente: this.ordenacaoCrescente } }).then((response) => {
      //   this.hasMore = response.body.hasMore
      //   this.data = response.body.infracoes
      //   if (this.hasMore) this.skip += this.pageSize
      // })
    },
    getCoupons(docUid, name) {
      // firebase.firestore().collection('restaurants').doc(docUid).collection('cupons').get().then(data2 => {
      //   if(data2.docs.exists) console.log(data2.docs[0].data())
      // }, reject => {
      //   this.$root.$emit('changeToast', { message: reject.message, type: 'error' })
      // })
      console.log(docUid + name)
    },
    logout() {
      firebase.auth().signOut().then(() => {
        router.push('login')
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
</style>

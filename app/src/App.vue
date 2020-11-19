<template>
  <div id="app">
    <toast />
    <router-view></router-view>
  </div>
</template>

<script>
import toast from '@/views/shared/Toast.vue'

export default {
  name: 'app',
  components: {
    toast
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-color: #EDEDED !important;
  padding-top: 45px;
  padding-bottom: 45px;
}

.btn-primary {
  background-color: #0C326F !important;
  font-weight: 700 !important;
}

.btn-secondary {
  background-color: #fff !important;
  border: 1px solid !important;
  color: #2c3e50 !important;
  font-weight: 700 !important;
}

.btn-tertiary {
  background-color: #CCCCCC !important;
  border: 1px solid !important;
  color: #2c3e50 !important;
  font-weight: 700 !important;
}

.subtitle {
  color: #E60000;
}

.btn-primary, .btn-secondary, .btn-tertiary {
  padding: 10px !important;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.logo {
  width: 200px;
  height: 200px;
  margin-bottom: 30px;
}
</style>

<template>
  <div :class="['wrapper-toast container', type, opened ? 'toast-open' :  '']" @click="opened = false" @mouseover="clearTime" @mouseout="setTime">
    <div class="text-center" style="padding: 15px">
      <i class="fas fa-exclamation-triangle" style="margin-right: 5px; font-size: 20px"></i> {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data () {
    return {
      opened: false,
      message: '',
      type: 'toast-success',
      time: null
    }
  },
  created () {
    this.$root.$on('changeToast', (properties) => {
      this.onChangeToast(properties)
      this.setTime()
    })
  },
  methods: {
    onChangeToast (properties) {
      this.opened = true
      this.message = properties.message
      this.type = `toast-${properties.type}`
    },
    setTime () {
      this.clearTime()
      this.time = setTimeout(() => {
        this.opened = false
      }, 8000)
    },
    clearTime () {
      clearTimeout(this.time)
    }
  }
}
</script>

<style scoped>
  .wrapper-toast {
    position: fixed;
    color: #FFF;
    font-size: 14px;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    max-height: 0;
    max-width: 400px;
    overflow: hidden;
    box-shadow: 0 0 12px #999;
    cursor: pointer;
    transition: max-height 1s;
  }
  .toast-open {
    max-height: 100px;
  }
  .toast-error {
    background-color: #da4f49;
  }
  .toast-error:hover {
    background-color: #C62828;
    opacity: 1;
  }
  .toast-success {
    background-color: #73b573;
  }
  .toast-success:hover {
    background-color: #51a351;
    opacity: 1;
  }
  .toast-alert {
    background-color: #fbda43;
    color: #2c3e50;
  }
  .toast-alert:hover {
    background-color: #f8c60b;
    opacity: 1;
  }
</style>

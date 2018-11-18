<template>
  <div class="conWrap"></div>
</template>

<script>
let socket
export default {
  name: 'Con',
  data () {
    return {
      msg: []
    }
  },
  mounted: function () {
    // eslint-disable-next-line
    socket = io('http://192.168.31.203:3000/?type=player')
    this.listener()
  },
  methods: {
    listener: function () {
      // eslint-disable-next-line
      socket.on('welcome', () => {
        console.log('welcome')
      })
    }
  }
}
</script>

<style>

</style>

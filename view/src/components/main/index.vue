<template>
  <div class="mainWrap">
    <img src="/qrcode">
    <div class="msgWrap">
      <div v-for="(item, index) in msg" :key="index">
        <span
          :style="{
            'color': item.color
          }"
        >
          {{item.msg}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
let socket
export default {
  name: 'Main',
  data () {
    return {
      msg: []
    }
  },
  mounted: function () {
    // eslint-disable-next-line
    socket = io('http://192.168.31.203:3000/?type=admin')
    this.listener()
  },
  methods: {
    listener: function () {
      socket.on('newPlayer', (id) => {
        this.msg.push({
          msg: `用户 ${id} 加入了`,
          color: 'green'
        })
      })

      socket.on('delPlayer', (id) => {
        this.msg.push({
          msg: `用户 ${id} 离开了`,
          color: 'red'
        })
      })
    }
  }
}
</script>

<style>

</style>

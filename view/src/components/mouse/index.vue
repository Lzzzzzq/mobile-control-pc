<template>
  <div
    class="mouseField"
    @touchstart="handleTouchStart"
    @touchmove.stop="handleTouchMove"
    @touchend="handleTouchEnd"
    @click="handleClick"
  >

  </div>
</template>

<script>
let startX = 0
let startY = 0

export default {
  name: 'Mouse',
  mounted: function () {
    this.listener()
  },
  methods: {
    handleTouchStart: async function (e) {
      const touch = e.targetTouches[0]
      startX = touch.screenX
      startY = touch.screenY
      this.$socket.emit('touchstart')
    },
    handleTouchMove: function (e) {
      const {screenX, screenY} = e.targetTouches[0]
      const changeX = screenX - startX
      const changeY = screenY - startY

      this.$socket.emit('changeMousePos', {
        x: changeX,
        y: changeY
      })
    },
    handleTouchEnd: async function (e) {
      this.$socket.emit('touchend')
    },
    handleClick: function () {
      this.$socket.emit('mouseclick')
    }
  }
}
</script>

<style scoped>
.mouseField {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: lightblue;
}
</style>

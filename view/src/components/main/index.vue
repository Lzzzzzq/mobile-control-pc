<template>
  <div class="mainWrap">
    <img src="/qrcode">
    <div class="msgWrap">
      <table>
        <tr>
          <td>序号</td>
          <td>ID</td>
        </tr>
        <tr v-for="(item, index) in list" :key="item">
          <td>{{index + 1}}</td>
          <td>{{item}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
let socket
export default {
  name: 'Main',
  data () {
    return {
      msg: [],
      list: []
    }
  },
  mounted: function () {
    // eslint-disable-next-line
    socket = io('/?type=admin')
    this.listener()
  },
  methods: {
    listener: function () {
      socket.on('playerChange', (list) => {
        this.list = list
      })
    }
  }
}
</script>

<style lang='less'>
@import './index.less';
</style>

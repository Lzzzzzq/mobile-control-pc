<template>
  <div class="conWrap">

    <mt-popup
      v-model="popupVisible"
      position="bottom"
      style="width: 100%"
    >
      <mt-picker :slots="slots" @change="onValuesChange" style="width: 100%"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
let socket
export default {
  name: 'Con',
  data () {
    return {
      popupVisible: true,
      slots: [
        {
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06']
        }
      ]
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
    },
    onValuesChange: function (val) {
      console.log(val)
    }
  }
}
</script>

<style lang='less'>
@import './index.less';
</style>

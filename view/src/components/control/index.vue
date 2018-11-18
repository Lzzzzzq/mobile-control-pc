<template>
  <div class="conWrap">
    <mt-button
      v-if="!edit"
      type="primary"
      size="small"
      class="conGoEdit"
      @click="handleGoEdit"
    >自定义</mt-button>
    <div class="conOpeBar" v-if="edit">
      <mt-button
        type="primary"
        size="small"
        class="conBtn"
        @click="handleClickAdd"
      >新增按钮</mt-button>
      <mt-button
        type="primary"
        size="small"
        class="conBtn"
      >完成</mt-button>
      <mt-button
        type="danger"
        size="small"
        class="conBtn"
      >删除</mt-button>
      <mt-button
        size="small"
        class="conBtn"
        @click="edit = false"
      >取消</mt-button>
    </div>
    <div class="conBoard">
      <div
        class="conBoardBtn"
        v-for="(item, index) in btnList"
        :key="index"
        :style="{
          width: item.side + 'px',
          height: item.side + 'px',
          x: item.x + 'px',
          y: item.y + 'px'
        }"
        @click="!edit ? handleClickBtn(item) : false"
        @touchstart="edit ? handleTouchStart($event, item) : false"
        @touchmove="edit ? handleTouchMove($event, item) : false"
      >
        {{item.key}}
      </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      style="width: 100%"
      :closeOnClickModal="false"
    >
      <div class="conPopOpe">
        <div class="conPopOpeCancel" @click="popupVisible = false">取消</div>
        <div class="contPopOpeSure">确定</div>
      </div>
      <mt-picker :slots="slots" @change="onValuesChange" style="width: 100%"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
let socket
export default {
  name: 'Con',
  data () {
    this.touchX = 0
    this.touchY = 0

    return {
      popupVisible: false,
      slots: [
        {
          values: ['w', 'a', 's', 'd', 'up', 'down', 'left', 'right']
        }
      ],
      edit: false,
      btnList: [{
        key: 'w',
        side: 60,
        x: 0,
        y: 0
      }]
    }
  },
  mounted: function () {
    // eslint-disable-next-line
    socket = io('http://192.168.1.102:3000/?type=player')
    this.listener()
  },
  methods: {
    /**
     * socket监听
     */
    listener: function () {
      // eslint-disable-next-line
      socket.on('welcome', () => {
        console.log('welcome')
      })
    },

    /**
     * 按钮选择器
     */
    onValuesChange: function (val) {
      console.log(val)
    },

    /**
     * 进入自定模式
     */
    handleGoEdit: function () {
      this.edit = true
    },

    /**
     * 点击了添加按钮
     */
    handleClickAdd: function () {
      this.popupVisible = true
    },

    /**
     * 按键被点击
     */
    handleClickBtn: function (item) {
      console.log('按键被点击')
    },

    /**
     * 按键被手指接触
     */
    handleTouchStart: function (e, item) {
      console.log(e)
      console.log(item)
      if (!this.edit) return
      this.touchX = e.targetTouches[0].clientX
      this.touchY = e.targetTouches[0].clientY
    },

    /**
     * 手指开始拖动
     */
    handleTouchMove: function (e) {
    }
  }
}
</script>

<style lang='less'>
@import './index.less';
</style>

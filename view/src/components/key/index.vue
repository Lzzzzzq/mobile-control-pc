<template>
  <div class="conWrap">
    <mt-button v-if="!edit" type="primary" size="small" class="conGoEdit" @click="handleGoEdit">自定义</mt-button>
    <div class="conOpeBar" v-if="edit">
      <mt-button type="primary" size="small" class="conBtn" :disabled="selectIndex < 0" @click="handleClickLarge">放大</mt-button>
      <mt-button type="primary" size="small" class="conBtn" :disabled="selectIndex < 0" @click="handleClickSmall">缩小</mt-button>
      <mt-button type="primary" size="small" class="conBtn" @click="handleClickAdd">新增</mt-button>
      <mt-button type="primary" size="small" class="conBtn" @click="handleClickSure">完成</mt-button>
      <mt-button type="danger" size="small" class="conBtn" :disabled="selectIndex < 0" @click="handleClickDel">删除</mt-button>
      <mt-button size="small" class="conBtn" @click="handleClickCancel">取消</mt-button>
    </div>
    <div class="conBoard">
      <div class="conBoardBtn" :class="{
          'conBoardBtnActive': selectIndex === index
        }" v-for="(item, index) in btnList" :key="index" :style="{
          width: item.side + 'px',
          height: item.side + 'px',
          left: item.x + 'px',
          top: item.y + 'px'
        }" @touchstart="edit ? handleTouchStart($event, index) : handleKeyDown(item.key)" @touchmove="edit ? handleTouchMove($event, item) : false" @touchend="edit ? false : handleKeyUp(item.key)">
        {{item.key}}
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom" style="width: 100%" :closeOnClickModal="false">
      <div class="conPopOpe">
        <div class="conPopOpeCancel" @click="popupVisible = false">取消</div>
        <div class="contPopOpeSure" @click="handleClickAddSure">确定</div>
      </div>
      <mt-picker :slots="slots" @change="onValuesChange" style="width: 100%"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
let keyList = [
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
  'up',
  'down',
  'left',
  'right'
]
export default {
  name: 'Key',
  data () {
    this.touchX = 0
    this.touchY = 0

    return {
      popupVisible: false,
      slots: [
        {
          values: keyList
        }
      ],
      edit: false,
      btnList: [],
      editBtnList: [],
      selectIndex: -1,
      newBtnKey: keyList[0]
    }
  },
  mounted: function () {
    this.listener()
  },
  methods: {
    /**
     * socket监听
     */
    listener: function () {
      // eslint-disable-next-line
      this.$socket.on('welcome', () => {
        console.log('welcome')
      })
    },

    /**
     * 按钮选择器
     */
    onValuesChange: function (picker, values) {
      this.newBtnKey = values[0]
    },

    /**
     * 进入自定模式
     */
    handleGoEdit: function () {
      this.edit = true
      this.editBtnList = JSON.parse(JSON.stringify(this.btnList))
    },

    /**
     * 点击了添加按钮
     */
    handleClickAdd: function () {
      this.popupVisible = true
    },

    /**
     * 按键被按下
     */
    handleKeyDown: function (key) {
      console.log('按键被按下', key)
      this.$socket.emit('keydown', key)
    },

    /**
     * 按键被抬起
     */
    handleKeyUp: function (key) {
      console.log('按键被抬起', key)
      this.$socket.emit('keyup', key)
    },

    /**
     * 按键被手指接触
     */
    handleTouchStart: function (e, index) {
      console.log(e)
      this.selectIndex = index
      this.touchX = e.targetTouches[0].clientX
      this.touchY = e.targetTouches[0].clientY
    },

    /**
     * 手指开始拖动
     */
    handleTouchMove: function (e, item) {
      let curX = e.targetTouches[0].clientX
      let curY = e.targetTouches[0].clientY
      let changeX = curX - this.touchX
      let changeY = curY - this.touchY
      this.touchX = curX
      this.touchY = curY
      this.btnList[this.selectIndex].x += changeX
      this.btnList[this.selectIndex].y += changeY
    },

    /**
     * 点击了取消
     */
    handleClickCancel: function () {
      this.btnList = [].concat(this.editBtnList)
      this.editBtnList = []
      this.edit = false
      this.selectIndex = -1
    },

    /**
     * 点击了确定
     */
    handleClickSure: function () {
      this.editBtnList = []
      this.edit = false
      this.selectIndex = -1
    },

    /**
     * 点击了确定添加
     */
    handleClickAddSure: function () {
      this.btnList.push({
        key: this.newBtnKey,
        side: 60,
        x: 50,
        y: 50
      })
      this.selectIndex = -1
      this.popupVisible = false
    },

    /**
     * 点击了删除
     */
    handleClickDel: function () {
      this.btnList.splice(this.selectIndex, 1)
      this.selectIndex = -1
    },

    /**
     * 点击了放大
     */
    handleClickLarge: function () {
      if (this.btnList[this.selectIndex].side < 200) {
        this.btnList[this.selectIndex].side += 10
      }
    },

    /**
     * 点击了缩小
     */
    handleClickSmall: function () {
      if (this.btnList[this.selectIndex].side > 10) {
        this.btnList[this.selectIndex].side -= 10
      }
    }
  }
}
</script>

<style lang='less' scoped>
@import './index.less';
</style>

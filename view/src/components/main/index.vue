<template>
  <div class="mainWrap">
    <mt-button type="primary" style="width: 100%" @click="handleToKey">键盘模式</mt-button>
    <mt-button type="primary" style="width: 100%; margin-top: 20px;" @click="handleToMouse">鼠标模式</mt-button>
  </div>
</template>

<script>

export default {
  name: 'Main',
  mounted: function () {
  },
  methods: {
    /**
     * 跳转到键盘模式
     */
    handleToKey: function () {
      this.$router.push('key')
    },
    /**
     * 跳转到鼠标模式
     */
    handleToMouse: function () {
      this.$router.push('mouse')
    }
  }
}
</script>

<style lang='less'>
@import './index.less';
</style>

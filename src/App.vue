<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  mounted () {
    const docEl = document.documentElement.style
    const recalc = () => {
      docEl.fontSize = 24 * (window.innerWidth / 1920) + 'px'
    }
    window.addEventListener('resize', recalc, false)
    window.addEventListener('pageshow', recalc, false)
    document.addEventListener('DOMContentLoaded', recalc, false)
  }
}
</script>

<style lang="less">
#app {
  font-family: "幼圆", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
@scrollcolor: #ccc;
@bgcolor: rgba(114, 203, 255, 0.3);
@rem: 1rem;
div {
  box-sizing: border-box;
}
:root {
  --base: @rem;
  --xsfont: calc(@rem * 0.7);
  --sfont: calc(@rem * 0.8);
  --mfont: calc(@rem * 1);
  --xmfont: calc(@rem * 1.25);
  --lfont: calc(@rem * 1.33);
  --xl2font: calc(@rem * 1.5);
  --xlfont: calc(@rem * 2);
  --xxlfont: calc(@rem * 2.5);
  --xxxlfont: calc(@rem * 3);
  --lineshadow: 0 0px 2px 0px rgba(0, 0, 0, 0.2);
  letter-spacing: 1px;
}
.bold {
  font-weight: 400;
}
.bolder {
  font-weight: 600;
}
.boldest{
  font-weight: bold;
}
.yahei {
  font-family: "yahei";
}
.h-title {
  font-size: var(--xxlfont);
  .bold();
  .yahei();
  letter-spacing: 4px;
}
.f-title {
  font-size: var(--xlfont);
  .bolder();
  .yahei();
  letter-spacing: 2px;
}
.s-title {
  .bolder();
  font-size: var(--xmfont);
}
.cen {
  margin: auto;
}
.con-cen > * {
  .cen();
}
.bg {
  position: absolute;
  transform: scale(0.8);
  z-index: -1;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  background: @scrollcolor;
  border-radius: 3px;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
  border-radius: 1px;
  background: #ededed;
}
.flex {
  display: flex;
}
.flex-cen {
  .flex();
  justify-content: center;
}
.flex-ter {
  .flex();
  align-items: center;
}
.flex-center {
  .flex-cen();
  .flex-ter();
}
.flex-bwn {
  .flex();
  justify-content: space-between;
}
.flex-col {
  .flex();
  flex-direction: column;
}
.flex-rev {
  .flex();
  flex-direction: row-reverse;
}
.flex-col-rev {
  .flex();
  flex-direction: column-reverse;
}
.flex-col-cen {
  .flex-col();
  justify-content: center;
}
.flex-wrap {
  .flex();
  flex-wrap: nowrap;
}
a {
  text-decoration: none;
}
@color: rgba(114, 203, 255, 0.3);
@fontcolor: #0b96cc;
.el-button.el-button--light {
  background: @color;
  border: none;
  color: @fontcolor;
  font-size: var(--mfont);
  padding: 1rem 1.6rem;
  border-radius: .8rem;
  font-weight: 600;
  &:hover {
    color: darken(@fontcolor, 10%);
    background: darken(@color, 20%);
  }
  &:active {
    background: darken(@color, 30%);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
}
.link {
  cursor:pointer;
  font-size: var(--xmfont);
  color: @fontcolor;
  position: relative;
  &:hover {
    color: desaturate(@fontcolor, 50%) !important;
  }
}
.box{
  box-shadow:
  0 0 2px 8px rgba(0, 0, 0, 0.02),
  0 0 2px 16px rgba(0, 0, 0, 0.02),
  0 0 2px 24px rgba(0, 0, 0, 0.02);
}
</style>

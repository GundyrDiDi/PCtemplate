<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import '@/assets/css/scroll.less'
import '@/assets/css/flex.less'
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
  font-family: "yahei", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
div {
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
@rem: 1rem; // 24px / 1920drp
:root {
  --base: @rem;
  --xxsfont: calc(@rem * 0.6);
  --xs2font: calc(@rem * 0.65);
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
  --lineshadow2:
  0 2px 2px 0px rgba(0, 0, 0, 0.05),
  0 4px 4px 0px rgba(0, 0, 0, 0.05);
  --boxshadow:
  0 0 3px 3px rgba(6, 119, 212, 0.02),
  0 0 6px 6px rgba(6, 119, 212, 0.02);
  --boxshadow2:
  0 0 4px 4px rgba(6, 119, 212, 0.03),
  0 0 8px 8px rgba(6, 119, 212, 0.03);
  --prcol:#299eff;
  --wacol:#ff9d26;
  --dacol:#ff5a12;
  --decol:#727272;
  --bgcol:#e3f2ff;
  --lbgcol:tint(#e3f2ff,50%);
  --dbcol:#fff;
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
  font-size: var(--xmfont);
  .bold();
  .yahei();
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
.box{
  box-shadow:
  0 0 2px 8px rgba(0, 0, 0, 0.02),
  0 0 2px 16px rgba(0, 0, 0, 0.02),
  0 0 2px 24px rgba(0, 0, 0, 0.02);
}
.module-box{
  box-shadow:var(--boxshadow2);
  border-radius:3px;
  background:var(--dbcol);
  padding:1rem 1.5rem;
  text-align:center;
}
.brcircle{
  border-radius:50%;
}
.f-l{
  float:left;
}
.f-r{
  float:right;
}
@bgcolor: rgba(114, 203, 255, 0.3);
@color: rgba(114, 203, 255, 0.3);
@color2: #42a1f2;
@fontcolor: #0b96cc;
.el-menu-item{
  font-size:var(--sfont);
}
.el-button{
  font-size:var(--sfont);
  padding:.5rem 1rem;
}
.el-button--small{
  font-size:var(--xs2font);
  padding:.4rem .8rem;
}
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
</style>

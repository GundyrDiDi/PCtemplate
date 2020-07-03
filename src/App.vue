<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  letter-spacing: 1px
}

@scrollcolor:#ccc;
@fontsize:18px;
:root{
  font-size:@fontsize;
  --sfont:.8rem;
  --mfont:1rem;
  --lfont:1.1rem;
  --xlfont:1.2rem;
  --xxlfont:1.5rem;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  background:@scrollcolor;
  border-radius: 3px;
  box-shadow   : inset 0 0 3px rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 3px rgba(0, 0, 0, 0.2);
  border-radius: 1px;
  background   : #ededed;
}
.flex{
  display: flex;
}
.flex-cen{
  .flex();
  justify-content: center;
}
.flex-ter{
  .flex();
  align-items: center;
}
.flex-center{
  .flex-cen();
  .flex-ter();
}
.flex-col{
  .flex();
  flex-direction: column;
}
.flex-col-rev{
  .flex();
  flex-direction: column-reverse;
}
.flex-wrap{
  .flex();
  flex-wrap:nowrap;
}
a{
  text-decoration: none;
}
</style>

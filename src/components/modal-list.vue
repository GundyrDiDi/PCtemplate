<template>
  <Modal v-model="_show" width="50vw" style="text-align:center" footer-hide>
    <header slot="header" class="p-title">
      {{instHosts?instHosts.inst:''}} — 旗下大咖
    </header>
    <div class="flex-wrap" style="max-height:460px;overflow:auto">
        <div v-for="v in instHosts" :key="v.anchorId" class="myhost">
        <div @click="detail(v.anchorId)">
          <img v-lazy:src="v.anchorImg"/>
          <div class="name bolder">{{v.anchorName}}</div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
export default {
  name: 'modal-table',
  data () {
    return {}
  },
  computed: {
    _show: {
      get () {
        return !!this.instHosts
      },
      set () {
        requestAnimationFrame(() => {
          this.$store.commit('tables/instHosts', null)
        })
      }
    }
  },
  methods: {
    detail (v) {
      if (v.anchorFlag) {
        this._show = false
        requestAnimationFrame(() => {
          this.inslist.events.detail.call(this, v.anchorId)
        })
      } else {
        this.$myalert('该大咖暂未直播过!')
      }
    }
  }
}
</script>

<style scoped lang="less">
.myhost {
  width: 20%;
  padding: 3px 3%;
  cursor: pointer;
  > div {
    border-radius: 0.4rem;
    padding: 0.5rem;
    &:hover {
      box-shadow: 0 0 2px 1px rgba(0,0,0,.1);
      background:var(--lbgcol)
    }
  }
  img {
    border-radius:50%;
    height: 3rem;
    width: 3rem;
    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5));
  }
  .name {
    padding-bottom: 0.2rem;
  }
}
</style>

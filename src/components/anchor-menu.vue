<template>
  <div class="container">
    <div class="nav flex-bwn" :class="navClass" :style="move" ref="nav">
      <slot name="nav"></slot>
      <div class="flex-bwn menu">
        <div
          v-for="(v,i) in tabs"
          :key="v.name"
          :class="{active:i===index}"
          @click="scroll(i)"
        >{{v.label}}</div>
        <b class="line" :style="bottomline"></b>
      </div>
    </div>
    <template v-for="v in tabs">
      <div ref="tabs" :key="v.name">
        <slot :name="v.name"></slot>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'anchorNav',
  props: {
    tabs: {
      type: Array,
      required: true
    },
    threshold: {
      type: Number,
      default () {
        return 0
      }
    },
    navClass: {
      type: String
    }
  },
  data () {
    return {
      index: 0,
      top: 0
    }
  },
  computed: {
    bottomline () {
      return {
        width: 100 / this.tabs.length + '%',
        transform: `translateX(${this.index * 100}%)`
      }
    },
    move () {
      if (this.top) {
        return {
          transform: `translateY(${this.top}px)`,
          marginLeft: '0px',
          marginRight: '0px',
          borderRadius: '0px',
          zIndex: 1
        }
      } else {
        return {}
      }
    }
  },
  methods: {
    scroll (i) {
      this.$refs.tabs[i].scrollIntoView()
    }
  },
  async mounted () {
    requestAnimationFrame(() => {
      const navtop = (this.$refs.nav.offsetTop + 1)
      this.$el.addEventListener('scroll', e => {
        const scrollTop = e.target.scrollTop
        this.top = Math.max(0, scrollTop - navtop)
        this.$refs.tabs.forEach((v, i) => {
          if (v.offsetTop <= scrollTop + this.threshold) {
            this.index = i
          }
        })
      })
    })
  }
}
</script>

<style scoped lang="less">
.container {
  height: 100%;
  width: 100%;
  overflow:auto;
  scroll-behavior: smooth;
}
.nav {
  position:relative;
  transition:margin .2s linear;
  .flex-bwn {
    position: relative;
    justify-content: space-around;
    > div {
      text-align: center;
      font-size: var(--xs2font);
      cursor: pointer;
    }
    .active {
      color: #409eff;
    }
  }
  .line {
    position: absolute;
    left: 0;
    bottom: -0.4rem;
    height: 2px;
    background: var(--prcol);
    transition: all linear 0.5s;
  }
}
</style>

<template>
  <div>
    <div class="module-box flex-ter">
      <div class="flex searchbox">
        <el-select
          v-model="followWord"
          filterable
          remote
          clearable
          size="small"
          placeholder="请输入主播的昵称"
          no-match-text="无匹配主播"
          :remote-method="remoteMethod"
          popper-class="custom-options"
          :loading="loading">
          <el-option
            v-for="v in hostsbackup"
            :key="v.name"
            :label="v.name"
            :value="v.name">
            <div class="flex-ter">
              <img :src="imgs.head"/>
              <span>{{v.name}}</span>
            </div>
            <el-button @click="addhost(v)" size="mini" type="primary">
              <i class="el-icon-plus"></i>
            </el-button>
          </el-option>
        </el-select>
        <el-button @click.stop="addhost" size="small" type="primary">添加主播</el-button>

      </div>
      <el-tooltip>
        <div slot="content">
          开启提醒后，主播在开播前，我们<br/>
          将以微信服务号的方式推送给您，<br/>
          请务必关注 <b style="color:var(--prcol)">鲸宸数据</b> 的服务号
        </div>
        <el-switch
          class="switch"
          v-model="notice"
          inactive-text="开播提醒">
        </el-switch>
      </el-tooltip>
    </div>
    <transition-group tag="div" class="module-box flex-wrap list" name="list">
      <div v-for="(v, i) in followlist" :key="v.name" class="myhost">
        <div>
          <img src v-lazy:src="imgs.head" alt />
          <div class="name bolder">{{v.name}}</div>
          <div class="btns">
            <el-button size="mini" type="primary" @click="godetail(v)">查看主页</el-button>
            <el-button size="mini" type="default" @click="comfirmnot(i)">取消关注</el-button>
          </div>
        </div>
      </div>
    </transition-group>
    <Modal width="30vw" v-model="notFollowModal" @on-ok="notfollow">不再关注该主播？</Modal>
  </div>
</template>

<script>
export default {
  name: 'follow',
  data () {
    return {
      followWord: '',
      selectedhost: null,
      notFollowModal: false,
      notice: true,
      loading: false
    }
  },
  watch: {
    followlist (f) {
      console.log(f)
    },
    hostsbackup (bp) {
      console.log(bp)
    }
  },
  methods: {
    addhost (v) {
      console.log(v)
      requestAnimationFrame(() => {
        this.followWord = ''
      })
    },
    godetail (v) {
      this.$store.commit('host/actHost', v)
      this.$router.push({ name: 'hostDetail' })
    },
    comfirmnot (i) {
      this.selectedhost = i
      this.notFollowModal = true
    },
    notfollow () {
      this.followlist.splice(this.selectedhost, 1)
      // console.log(this.followlist[this.selectedhost])
    },
    async remoteMethod () {
      this.loading = true
      console.log(this.followWord)
      await this.host_search({})
      this.loading = false
    }
  },
  mounted () {
    this.user_getfollowlist()
  }
}
</script>
<style scoped lang="less">
.module-box {
  margin-bottom: 1rem;
  position:relative;
}
.switch{
  position:absolute;
  right:2rem;
}
.list {
  min-height: 30rem;
}
.myhost {
  width: 20%;
  padding:1%;
  >div{
    background: #fff;
    height: 12.5rem;
    box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.08);
    border-radius: 0.4rem;
    padding: 0.5rem;
    &:hover {
      box-shadow: 0 1px 2px 1px var(--prcolsd);
    }
  }
  img {
    height: 8rem;
    width: 8rem;
    cursor: pointer;
    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5));
  }
  .name {
    padding-bottom: 0.4rem;
  }
}
</style>
<style lang="less">
.searchbox {
  width: 26rem;
  .el-select{
    flex:1;
  }
  .el-input__inner {
    border-radius: 4px 0 0 4px;
    font-size: var(--xs2font);
  }
  .el-button {
    border-radius: 0 4px 4px 0;
  }
}
.custom-options{
  .el-select-dropdown__item{
    display: flex;
    align-items: center;
    height: 2rem;
    justify-content: space-between;
    div{
      img{
        height:1.5rem;
      width:1.5rem;
      margin-right:.5rem;
      }
      span{
        font-size:var(--xs2font);
      }
    }
  }
}
.list-enter-active,
.list-leave-active {
  transition: all .6s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: scale(0);
}
.list-move {
  transition: all .6s;
}
.list-leave-active {
  position: absolute;
}
</style>

<template>
  <div v-loading="loading" id="guanzhu">
    <div class="module-box flex-ter">
      <div class="flex searchbox">
        <el-select
          v-model="followWord"
          filterable
          clearable
          size="small"
          placeholder="请输入主播的昵称"
          no-match-text="无匹配主播"
          popper-class="custom-options"
          remote
          :remote-method="remoteMethod"
          :loading="sloading"
        >
          <el-option v-for="v in results" :key="v.anchorId" :label="v.anchorName" :value="v.anchorName">
            <div class="suggestions flex-ter">
              <img :src="'http:'+v.anchorImg" alt />
              <div>
                <div>{{v.anchorName}}</div>
                <div class="sub-suggestions">
                  机构: {{v.mechanismName}}
                  <i></i>
                  粉丝: {{v.fansNum}}</div>
              </div>
            </div>
            <el-button @click="followornot(v)" size="mini" :type="v.follow?'success':'primary'">
              <i v-show="!v.follow" class="el-icon-plus"></i>
              <i v-show="v.follow">已关注</i>
            </el-button>
          </el-option>
        </el-select>
        <el-button @click.stop="followornot()" size="small" type="primary">{{text}}</el-button>
      </div>
      <el-tooltip>
        <div slot="content">
          开启提醒后，主播在开播前，我们
          <br />将以微信服务号的方式推送给您，
          <br />请务必关注
          <b style="color:var(--prcol)">鲸宸数据</b> 的服务号
        </div>
        <el-switch @change="pushnotice" :disabled="!followlist.length" class="switch" v-model="isnotice" inactive-text="开播提醒"></el-switch>
      </el-tooltip>
    </div>
    <transition-group tag="div" class="module-box flex-wrap list" name="list">
      <div v-for="v in followlist" :key="v.anchorId" class="myhost">
        <div>
          <img @click="godetail(v)" v-lazy:src="v.anchorImg"/>
          <div class="name bolder">{{v.anchorName}}</div>
          <div class="btns">
            <el-button size="mini" type="primary" @click="godetail(v)">查看主页</el-button>
            <el-button size="mini" type="default" @click="followornot(v)">取消关注</el-button>
          </div>
        </div>
      </div>
      <div v-if="!followlist.length" :key="'notdata'" style="color:#aaa;">{{nodatatext}}</div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'follow',
  data () {
    return {
      followWord: '',
      results: [],
      loading: false,
      sloading: false,
      text: '添加主播',
      nodatatext: '加载中...'
    }
  },
  computed: {
    followhost () {
      return this.results.find(v => v.anchorName === this.followWord) || {}
    }
  },
  watch: {
    followhost (f) {
      this.text = !f.follow ? '添加主播' : '取消关注'
    }
  },
  methods: {
    pushnotice (v) {
      const status = v ? 1 : 0
      this.loading = true
      this.user_pushnotice({ status }).then(res => {
        this.loading = false
      })
    },
    followornot (v) {
      if (!v) {
        v = this.followhost
      }
      if (!Object.keys(v).length) return
      this.loading = true
      this.user_followornot({ host: v, vm: this }).then(res => {
        if (res.code === 200) {
          this.success(res.obj)
          this.followWord = ''
        }
        this.loading = false
      })
    },
    godetail (v) {
      this.$router.push({ name: 'hostDetail', params: { host_id: v.anchorId } })
    },
    success (msg) {
      this.fengzhuang().then(res => {
        this.msgSuccess(msg + ' ！')
      })
      this.results = []
    },
    async remoteMethod (word) {
      this.sloading = true
      this.results = await this.user_search(word)
      this.sloading = false
    },
    async fengzhuang () {
      const has = await this.user_getfollowlist()
      this.nodatatext = has ? '' : '搜索主播，添加关注 !'
      return has
    }
  },
  mounted () {
    this.fengzhuang()
  }
}
</script>
<style scoped lang="less">
.module-box {
  margin-bottom: 1rem;
  position: relative;
}
.switch {
  position: absolute;
  right: 2rem;
}
.list {
  min-height: 30rem;
}
.myhost {
  width: 20%;
  padding: 1%;
  > div {
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
    border-radius:50%;
    height: 8rem;
    width: 8rem;
    cursor: pointer;
    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5));
  }
  .name {
    padding-bottom: 0.4rem;
  }
}
.suggestions{
  font-size:var(--xxsfont);
  line-height:1rem;
  justify-content: space-around;
  padding:0.2rem 0;
  img{
    margin-right:.5rem;
    width:2rem;
    border-radius:50%;
  }
  .sub-suggestions{
    color:#aaa;
    font-weight: normal;
    i{
      margin:0 .5rem;
    }
  }
}
</style>
<style lang="less">
.searchbox {
  width: 26rem;
  .el-select {
    flex: 1;
    margin-right:1rem;
  }
}
.custom-options {
  .el-select-dropdown__item {
    display: flex;
    align-items: center;
    height: 2.4rem;
    justify-content: space-between;
  }
}
#guanzhu{
  .el-switch__label *{
    font-size:var(--xs2font)
  }
}
</style>

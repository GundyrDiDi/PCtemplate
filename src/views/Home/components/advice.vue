<template>
  <div id="advice">
    <div class="module-box">
      <el-form ref="form" :model="form" :rules="rules">
        <div class="text bolder">意见与反馈：</div>
        <!-- <el-form-item prop="advice">
          <el-input placeholder="您在使用过程中有任何不满或意见时，欢迎与我们及时联系，感谢使用！"
          type="textarea" v-model="form.advice" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
        </el-form-item>
        <div class="text bolder">上传附件(可选)：</div>
        <el-form-item prop="snippet">
          <el-upload
          accept=".rar,.zip,.doc,.docx,.pdf,.jpg"
          drag multiple show-file-list :auto-upload="false" action :limit="3">
            <i class="uploadicon el-icon-receiving"></i>
            <div>点击或将文件拖拽到此处上传</div>
            <div class="des">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</div>
          </el-upload>
        </el-form-item> -->
        <div id="editor" ref="editor" style="text-align:left"></div>
      </el-form>
      <div class="update">
        <el-button type="primary" @click="updateadvice">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import wangeditor from 'wangeditor'
export default {
  name: '',
  data () {
    return {
      editor: {},
      form: {
        advice: '',
        snippet: null
      },
      rules: {
        advice: [
          { required: true, message: '您的意见与反馈不得少于10个字' },
          {
            validator: (rule, value, callback) => {
              if (value.length < 10) {
                callback(new Error('您的意见与反馈不得少于10个字'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        snippet: []
      }
    }
  },
  methods: {
    updateadvice () {
      // this.$refs.form.validate(valid => {
      //   console.log(valid)
      // })
      const content = this.editor.txt.html().replace(/<script>.*<\/script>/, '')
      if (content.length > 17) {
        Axios.post('user/advices', {
          content,
          // ...this.User
          name: this.User.name,
          cellPhone: this.User.cellPhone
        }).then(res => {
          this.editor.txt.html('')
          this.msgSuccess('提交成功 ！')
        }).catch(res => {
          this.msgFail('提交失败 ！')
        })
      } else {
        this.msgFail('提交失败，意见反馈不得少于10个字！')
      }
    },
    reset () {
      this.form.advice = ''
      this.form.snippet = null
    }
  },
  mounted () {
    const E = wangeditor
    const editor = new E('#editor')
    editor.customConfig.menus = [
      'image'
    ]
    editor.customConfig.uploadImgShowBase64 = true
    editor.customConfig.justify = 'left'
    editor.create()
    this.editor = editor
  }
}
</script>

<style scoped lang="less">
.module-box {
  margin: auto;
}
.el-form-item{
  margin-bottom:1rem;
}
.text {
  text-align: left;
  line-height: 40px;
}
.uploadicon{
  font-size:var(--xlfont);
  color:var(--prcol)
}
.des{
  color:#aaa;
  font-size:var(--xxsfont)
}
.update{
  margin:2rem 0 1rem 0;
  .el-button{
    width:6rem;
    margin:0 2rem;
  }
}
</style>
<style lang="less">
#advice {
  .el-upload{
    width:100%;
  }
  .el-upload-dragger {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background:#fafafa;
  }
  .el-upload-list__item{
    text-align: left;
  }
}
</style>

<template>
  <div class="add-commnet-module">
    <h4>
      发表评论
    </h4>
    <hr/>
    <p>*标注项为必填项</p>
    <el-form :model="commentForm" :rules="rules" ref="commnetModule" :disabled="commentEnable">
      <el-form-item label="昵称" prop="author">
        <el-input v-model="commentForm.author"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="commentForm.email"></el-input>
      </el-form-item>
      <el-form-item v-if="!commentEnable" label="评论" prop="content">
        <el-input type="textarea" rows="5"
                  v-model="commentForm.content"
                  maxlength="100" minlength="1"></el-input>
      </el-form-item>
      <div v-else style="text-align: center; color: #409EFF; margin: 50px 0">
        该文章关闭了评论
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('commnetModule')">发表评论</el-button>
        <el-button @click="resetForm('commnetModule')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {addComment} from '@/api/api'

export default {
  data () {
    let validateEmail = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('内容不能为空'))
      } else {
        if (/^[\w-]+@([\w-]+\.){1,3}[\w-]+$/.test(value)) {
          callback()
        } else {
          callback(new Error('邮箱格式错误'))
        }
      }
    }
    return {
      commentForm: {
        author: '',
        email: '',
        content: ''
      },
      rules: {
        author: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写评论', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (commnetModule) {
      let self = this
      this.$refs[commnetModule].validate((valid) => {
        if (valid) {
          let data = self.commentForm
          data['article'] = self.articleId
          addComment(data)
            .then(function (data) {
              self.$message(
                {
                  message: '评论成功',
                  type: 'success'
                })
              self.$emit('add-comment')
              self.resetForm(commnetModule)
            }).catch(function () {
              self.$message.error('评论失败')
            })
        } else {
          self.$message.error('评论失败')
        }
      })
    },
    resetForm (formName) {
      this.$emit('add-comment')
      this.$refs[formName].resetFields()
    }
  },
  props: ['articleId', 'commentEnable']
}
</script>
<style scoped lang="less">
  hr {
    height: 1px;
    border: none;
    background-color: #ccc;
  }
</style>

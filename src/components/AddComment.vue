<template>
  <div class="add-commnet-container">
    <div class="comment-header">
      <h4>
        发表评论
      </h4>
    </div>
    <el-form class="comment-form"
             :model="commentForm"
             :rules="rules"
             ref="commnetForm"
             :disabled="commentEnable">
      <el-form-item v-if="!commentEnable"
                    prop="content">
        <el-input type="textarea"
                  rows="5"
                  v-model="commentForm.content"
                  maxlength="100"
                  minlength="1"></el-input>
      </el-form-item>
      <div class="disable-comment"
           v-else>
        该文章关闭了评论
      </div>
      <el-form-item class="form-footer">
        <el-button type="primary"
                   @click="submitForm('commnetForm')">发表评论</el-button>
        <el-button @click="resetForm('commnetForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addComment } from '@/api/api'

export default {
  props: ['articleId', 'commentEnable'],
  data () {
    return {
      commentForm: {
        content: ''
      },
      rules: {
        content: [
          { required: true, message: '请填写评论', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (commnetForm) {
      let self = this
      this.$refs[commnetForm].validate((valid) => {
        if (valid) {
          let data = self.commentForm
          data['article'] = self.articleId
          data['is_root'] = true
          data['author'] = '游客'
          addComment(data)
            .then(function (data) {
              self.$message(
                {
                  message: '评论成功',
                  type: 'success'
                })
              self.$emit('add-comment')
              self.resetForm(commnetForm)
            }).catch(function () {
              self.$message.error('评论失败')
            })
        } else {
          self.$message.error('评论失败')
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped lang="less">
@import "~@/style/mixin";
@import "~@/style/base";
.add-commnet-container {
  .margin(0, auto);
  .comment-header {
    text-align: left;
    hr {
      .h(1px);
      border: none;
      .bgc(@border-1);
    }
  }
  .comment-form {
    .margin(top, 15px);
    .disable-comment {
      .margin(50px, 0);
      .fontC(@common-blue);
    }
    .form-footer {
      .margin(top, 10px);
      text-align: left;
    }
  }
}
</style>

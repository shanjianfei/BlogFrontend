<template>
  <div class="add-commnet-container">
    <div class="comment-header">
      <h4>
        发表评论
      </h4>
    </div>
    <el-form
      :model="commentForm"
      class="comment-form"
      ref="commnetForm"
      :rules="rules"
      :disabled="commentEnable"
    >
      <el-form-item prop="rootInputValue" v-if="!commentEnable">
        <el-input
          type="textarea"
          rows="5"
          v-model="commentForm.rootInputValue"
          maxlength="100"
          minlength="1"
        ></el-input>
      </el-form-item>
      <div class="disable-comment" v-else>
        该文章关闭了评论
      </div>
      <el-form-item class="form-footer">
        <el-button type="primary" @click="addComment('commnetForm')"
          >发表评论</el-button
        >
        <el-button @click="resetForm('commnetForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import { addComment } from '@/api/api'
import { mapActions } from 'vuex'

export default {
  props: ['articleId', 'commentEnable'],
  data () {
    return {
      commentForm: {
        rootInputValue: ''
      },
      rules: {
        rootInputValue: [
          { required: true, message: '请填写评论', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('commentModule', ['submitComment']),
    addComment (formName) {
      let self = this
      this.$refs[formName].validate((valid) => {
        if (this.commentForm.rootInputValue) {
          let postData = {
            article: self.articleId,
            is_root: true,
            content: this.commentForm.rootInputValue
          }
          self.submitComment({ postData, self })
        } else {
          console.log('error submit!!')
          return false
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

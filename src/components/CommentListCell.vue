<template>
  <div class="comment-list-cell">
    <div class="comment-content">
      <el-row class="comment-header">
        <span>{{comment.author}}</span>
        <span>·</span>
        <span>{{comment.create_time | formatDate('yyyy年MM月dd日')}}</span>
      </el-row>
      <div class="comment-main" v-html="comment.content"></div>
      <ul class="comment-bottom">
        <li>
          <span class="like-active" @click="show=!show">回复</span>
        </li>
        <li>
          <span @click="giveLike(comment.id)">赞</span>
          <span v-if="comment.like" class="like-active">+{{comment.like}}</span>
        </li>
      </ul>
    </div>
    <div class="sub-comment-list">
      <sub-comment-list-cell
        v-for="(subComment, index) in comment.subs"
        :key="index"
        :subComment="subComment"
        style="margin-top: 15px;">
      </sub-comment-list-cell>
    </div>
    <div class="add-sub-comment" v-if="comment.subs.length">
      <el-link type="primary" @click="$emit('showCommentArea', subComment.id)">添加回复</el-link>
    </div>
    <div class="comment-area">
      <el-form
        v-show="show"
        class="comment-form"
        ref="commnetForm"
        :model="postComment"
        size="mini">
        <el-form-item>
          <el-input
            type="textarea"
            rows="1"
            placeholder="填写评论"
            v-model="postComment.text"></el-input>
        </el-form-item>
        <el-form-item class="form-footer">
          <el-button type="primary" @click="submitComment(comment.id)">发表评论</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
import {util, commentUtil} from '@/config/mixin'
import {addComment} from '@/api/api'
import SubCommentListCell from '@/components/SubCommentListCell'
export default {
  name: 'CommentListCell',
  props: {
    comment: {
      type: Object,
      default: undefined
    },
    articleId: {
      validator: function (value) {
        return /^\d+$/.test(value)
      },
      default: undefined
    }
  },
  components: {SubCommentListCell},
  mixins: [util, commentUtil],
  data () {
    return {
      show: false, // 显示评论框
      postComment: {
        text: ''
      }
    }
  },
  methods: {
    submitComment (commentId) {
      let self = this
      if (!this.postComment.text) return
      let postData = {
        article: self.articleId,
        is_root: false,
        author: 'guest',
        super_comment: commentId,
        belong_root: commentId,
        content: this.postComment.text
      }
      addComment(postData)
        .then(function (data) {
          self.$message({
            type: 'success',
            message: '评论成功'
          })
          self.postComment.text = ''
        })
        .catch(function (data) {
          self.$message.error('评论失败')
        })
    }
  }
}
</script>

<style scoped lang="less">
  @import '~@/style/mixin';
  @import '~@/style/base';

  .comment-list-cell {
    .comment-content {
      .comment-header {
        span:first-child {
          .fontC(@common-blue);
          .fontW700;
        }

        span:last-child {
          .fontSC(.8rem, @common-gray);
        }
      }

      .comment-main {
        .margin(top, 10px);
      }

      .comment-bottom {
        .margin(top, 10px);

        li {
          margin-right: 10px;
          display: inline-block;
          cursor: pointer;

          span {
            .fontS(.75rem);
          }
        }

        li:last-child {
          margin-right: 0;
        }

        .like-active {
          .fontSC(.75rem, @common-blue);
        }
      }
    }
    .sub-comment-list {
      .margin(left, 20px);
    }
    .add-sub-comment {
      .margin(top, 20px);
    }
    .comment-area {
      .margin(top, 20px);
    }
  }
</style>

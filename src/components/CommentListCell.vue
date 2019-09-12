<template>
  <div class="comment-list-cell">
    <div class="comment-content">
      <el-row class="comment-header">
        <span>{{ comment.user.username }}</span>
        <span>·</span>
        <span>{{ comment.create_time | formatDate("yyyy年MM月dd日") }}</span>
      </el-row>
      <div class="comment-main" v-html="comment.content"></div>
      <ul class="comment-bottom">
        <li>
          <span class="like-active" @click="show = !show">回复</span>
        </li>
        <li>
          <span @click="giveLike(comment.id)">赞</span>
          <span v-if="comment.like" class="like-active"
            >+{{ comment.like }}</span
          >
        </li>
      </ul>
    </div>
    <div class="sub-comment-list">
      <sub-comment-list-cell
        v-for="(subComment, index) in comment.all_sub_comment"
        :key="index"
        :subComment="subComment"
        style="margin-top: 15px;"
      >
      </sub-comment-list-cell>
    </div>
    <div class="add-sub-comment" v-if="comment.sub_comment_count">
      <el-link type="primary" @click="$emit('showCommentArea', subComment.id)"
        >添加回复</el-link
      >
    </div>
    <div class="comment-area">
      <el-form v-show="show" class="comment-form" ref="commnetForm" size="mini">
        <el-form-item>
          <el-input
            type="textarea"
            rows="1"
            placeholder="填写评论"
            v-model="subInputValue"
          ></el-input>
        </el-form-item>
        <el-form-item class="form-footer">
          <el-button type="primary" @click="addComment(comment.id)"
            >发表评论</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
import { util, commentUtil } from '@/config/mixin'
import SubCommentListCell from '@/components/SubCommentListCell'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CommentListCell',
  components: { SubCommentListCell },
  props: ['comment'],
  mixins: [util, commentUtil],
  data () {
    return {
      show: false, // 显示评论框
      subInputValue: ''
    }
  },
  computed: {
    ...mapState('commentModule', ['articleId'])
  },
  methods: {
    ...mapActions('commentModule', ['getComments', 'submitComment', 'postLikeComment']),
    addComment (commentId) {
      if (!this.subInputValue) return
      let postData = {
        article: this.articleId,
        is_root: false,
        super_comment: commentId,
        belong_root: commentId,
        content: this.subInputValue
      }
      this.submitComment({ postData, self: this })
    },
    giveLike (commentId) {
      this.postLikeComment({ commentId, self: this })
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/style/mixin";
@import "~@/style/base";

.comment-list-cell {
  .comment-content {
    .comment-header {
      span:first-child {
        .fontC(@common-blue);
        .fontW700;
      }

      span:last-child {
        .fontSC(0.8rem, @common-gray);
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
          .fontS(0.75rem);
        }
      }

      li:last-child {
        margin-right: 0;
      }

      .like-active {
        .fontSC(0.75rem, @common-blue);
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

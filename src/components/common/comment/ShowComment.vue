<template>
  <div class="show-comment-module" id="comments">
    <el-divider><i class="el-icon-chat-dot-square"></i></el-divider>
    <div v-if="rootComments.length" class="comment-container">
      <div class="comment-label">
        <span>
          最新评论
        </span>
      </div>
      <comment-list-cell
        v-for="(comment, index) in rootComments"
        :comment="comment"
        :key="index"
      ></comment-list-cell>
    </div>
    <div v-else class="tips-no-comment">暂无评论</div>
  </div>
</template>
<script>
import { giveLikeToCommnet } from '@/api/api'
import Vue from 'vue'
import CommentListCell from '@/components/common/comment/CommentListCell'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'ShowComment',
  props: ['articleId'],
  components: { CommentListCell },
  // data () {
  //   return {
  //     rootComments: []
  //   }
  // },
  computed: {
    ...mapState('commentModule', ['rootComments'])
  },
  methods: {
    ...mapMutations('commentModule', ['setArticleId']),
    ...mapActions('commentModule', ['getComments', 'submitComment']),
    giveLike: function (commentId) {
      let self = this
      let postData = { 'comment_id': commentId, 'like': true }
      giveLikeToCommnet(postData)
        .then(function (data) {
          for (let i in self.comments) {
            if (self.comments[i].id === commentId) {
              self.comments[i].like += 1
              break
            } else {
              for (let j in self.comments[i].subs) {
                if (self.comments[i].subs[j].id === commentId) {
                  self.comments[i].subs[j].like += 1
                  console.log(1)
                  break
                }
              }
            }
          }
          self.$message({
            message: '点赞成功',
            type: 'success'
          })
        })
        .catch(function () {
          self.$message.error('点赞失败')
        })
    }
  },
  filters: {
    formatDatetime (value) {
      return Vue.formatDate(new Date(value), 'yyyy年MM月dd日')
    }
  },
  created: function () {
    this.setArticleId(this.articleId)
    this.getComments()
  }
}
</script>

<style scoped lang="less">
@import "~@/style/mixin";
@import "~@/style/base";
.show-comment-module {
  .margin(15px, auto);
  text-align: left;
  .comment-container {
    .fontS(0.85rem);
    .comment-label {
      .margin(bottom, 20px);
      border-left: 5px solid @common-blue;
      span {
        .fontC(@common-blue);
        .margin(left, 15px);
      }
    }

    .comment-form {
      .w100;
      .margin(top, 30px);
    }
  }
  .tips-no-comment {
    .margin(top, 30px);
    .fontC(@common-gray);
  }

  .like-active {
    .fontSC(0.75rem, @common-blue);
  }
  .el-link {
    .fontS(0.85rem);
  }
}
</style>

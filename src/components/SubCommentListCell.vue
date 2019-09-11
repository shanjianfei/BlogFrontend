<template>
  <div class="sub-comment-list-cell">
    <el-row class="sub-comment-content">
      {{ subComment.content }}
    </el-row>
    <el-row class="sub-comment-bottom">
      <span class="author">--{{ subComment.user.username }}</span>
      <span>·</span>
      <span class="createtime">{{
        subComment.create_time | formatDate("yyyy年MM月dd日")
      }}</span>
      <el-link @click="giveLike(subComment.id)">赞</el-link>
      <span v-if="subComment.like" class="like-active"
        >+{{ subComment.like }}</span
      >
    </el-row>
  </div>
</template>

<script>
import { util } from '@/config/mixin'
import { mapActions } from 'vuex'

export default {
  name: 'SubCommentListCell',
  props: {
    subComment: {
      type: Object,
      default: undefined
    }
  },
  methods: {
    ...mapActions('commentModule', ['postLikeComment']),
    giveLike (id) {
      this.postLikeComment({ commentId: id, self: this })
    }
  },
  mixins: [util]
}
</script>

<style scoped lang="less">
@import "~@/style/mixin";
@import "~@/style/base";
.sub-comment-list-cell {
  .sub-comment {
    border-bottom: 1px dotted @common-gray;
    .margin(left, 20px);
    .padding(10px);
  }

  .sub-comment-bottom {
    .margin(top, 8px);
    .flexV;

    .author {
      .fontW700;
      .fontC(@common-blue);
    }

    .createtime {
      .fontSC(0.75rem, @common-gray);
    }

    .el-link {
      .fontS(0.75rem);
    }

    * {
      .margin(right, 5px);
    }
  }

  .add-sub-comment {
    .margin(top, 10px);
  }

  .like-active {
    .fontSC(0.75rem, @common-blue);
  }
}
</style>

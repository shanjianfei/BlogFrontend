<template>
  <div class="timeline-header">
    <div class="timeline-header-left">
      <i class="el-icon-document"></i>
      <span class="title-zh">时光轴&nbsp;</span>
      <span class="vertical-line"></span>
      <span class="title-en">&nbsp;Timeline</span>
    </div>
    <div class="timeline-header-right">
      <ul>
        <li
          class="default"
          :class="{ active: activeName === 0 }"
          @click="activeName = 0; $emit('default')">
          <span>顺序</span>
        </li>
        <li
          class="lasted"
          :class="{ active: activeName === 1 }"
          @click="activeName = 1; $emit('lasted')">
          <span>最新</span>
        </li>
        <li
          class="hot"
          :class="{ active: activeName === 2 }"
          @click="activeName = 2; $emit('hot')">
          <span>最热</span>
        </li>
        <li>
          <el-date-picker
            v-model="dateSelected"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="$emit('change', dateSelected)">
          </el-date-picker>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeLineHead',
  data () {
    return {
      activeName: 0, // 默认按照时间排序文章
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      dateSelected: []
    }
  }
}
</script>

<style scoped lang="less">
  @import '~@/style/mixin';
  @import '~@/style/base';
  .timeline-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;

    &-left {
      display: flex;
      align-items: center;
      .el-icon-document {
        .fontS(1.5rem);
        .margin(right, 5px);
        .fontC(@common-yellow);
      }

      .title-zh, .title-en {
        .fontW(500);
      }

      .title-zh {
        .fontS(1.5rem);
      }

      .title-en {
        .fontS(1.2rem);
      }

      .vertical-line {
        .displayI;
        .h(25px);
        .margin(0, 5px);
        border-right: 1px solid @base-black;
      }
    }

    &-right {
      text-align: right;

      ul {
        .active {
          border-bottom: 3px solid @common-blue;
        }

        li {
          .margin(right, 10px);
          .h(2rem);
          .displayI;
          cursor: pointer;

          span {
            line-height: 2rem;
          }
        }
      }
    }
  }
</style>

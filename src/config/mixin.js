import {giveLikeToCommnet} from '@/api/api'
import {imageBaseUrl} from '@/config/env'

export const util = {
  data () {
    return {
      throttleTimer: null,
      throttleBegin: new Date()
    }
  },
  methods: { // 去抖
    throttle (func, self, delay, duration) {
      delay = delay || 200
      duration = duration || 500
      return function () {
        let current = new Date()
        let args = arguments
        clearTimeout(self.throttleTimer)
        if (self.throttleBegin && (current - self.throttleBegin >= duration)) {
          func.apply(self, args)
          self.throttleBegin = new Date()
        } else {
          self.throttleTimer = setTimeout(function () {
            self.throttleBegin = new Date()
            func.apply(self, args)
          }, delay)
        }
      }
    },
    getImageUrl (originUrl) {
      if (imageBaseUrl && originUrl) {
        return originUrl.replace(/http.+:\d+\//, '')
      } else {
        return originUrl
      }
    }
  },
  filters: {
    formatDate: function (date, fmt) {
      date = new Date(date)
      let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    }
  }
}

export const commentUtil = {
  method: {
    giveLike: function (commentId) {
      let self = this
      let postData = {'comment_id': commentId, 'like': true}
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
  }
}

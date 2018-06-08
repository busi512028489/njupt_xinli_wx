//app.js
App({ 
  globalData: {
    location: 'http://101.200.55.61/yb/api/',
  },
  onLaunch: function () {
    var that = this
    that.order.location = that.student.location = that.globalData.location
  },
  student:{
    location:'',
    xh:'',
    info:{},
    login: function (xh,password,cb) {
      wx.request({
        url: this.location + 'student.php',
        data: {
          'type': 'login',
          // xh: xh,
          // password: password
          xh: 'B13010526',
          password: 141038
        },
        success: function (res) {
          return typeof cb == "function" && cb(res.data);
        }
      })
    },
  },
  order:{
    location: '',
    xh:'',
    zcdate:'',
    insert: function (state, reason, emergency, require1, chooseTime, extra, cb) {
      wx.request({
        url: this.location + 'order.php',
        data: {
          'type': 'insert',
          xh:this.xh,
          state: state,
          reason: reason,
          emergency: emergency,
          require1: require1,
          timelist: chooseTime,
          extra: extra,
        },
        type:'post',
        success: function (res) {
          return typeof cb == "function" && cb(res.data);
        }
      })
    },
    select: function (cb) {
      wx.request({
        url: this.location + 'order.php',
        data: {
          'type': 'select',
           xh: this.xh,
        },
        success: function (res) {
          return typeof cb == "function" && cb(res.data);
        }
      })
    },
    select_detail: function (cb) {
      wx.request({
        url: this.location + 'order.php',
        data: {
          'type': 'select_detail',
          xh: this.xh,
          zcdate:this.zcdate
        },
        success: function (res) {
          return typeof cb == "function" && cb(res.data);
        }
      })
    },
  },
})
// pages/order/order.js  
const app = getApp() 
Page({


  data: {
    status: {
    },
    judgeStatus: '',
    arrange:['待安排','已安排','已结束']
  },


  onLoad: function (options) {
    var that = this
    var arrange = this.data.arrange
    app.order.select(function(data){
      console.log(data)
      for(var i in data){
        data[i].status = arrange[data[i].arrange]
      }
      that.setData({
        list:data
      })
    })
  },

  onclick:function(e){
    var zcdate = e.currentTarget.dataset.zcdate
    app.order.zcdate = zcdate
    wx.navigateTo({
      url: '../order/order',
    })
  }
})
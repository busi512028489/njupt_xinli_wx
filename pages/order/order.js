// pages/order/order.js
const app = getApp() 
Page({


  data: {
    text1: ['你的预约信息已被心理中心成功记录','你的预约信息已得到心理中心成功的安排','您此次预约已完成'],
    text2: ['请耐心等待进一步的确认信息','请仔细核实以下信息','非常感谢您的到来'],
    title: ['预约信息一览','咨询安排信息','望您生活愉快'],
  },

  
  onLoad: function (options) {
    var that = this
    var text1 = this.data.text1
    var text2 = this.data.text2
    var title = this.data.title
    app.order.select_detail(function (data) {
      var order = data[0]
      console.log(order.arrange)
      order.text1 = text1[order.arrange]
      order.text2 = text2[order.arrange]
      order.title = title[order.arrange]
      order.timelist = JSON.parse(order.timelist)
      if(order.arrange != 0){
        order.time1 = JSON.parse(order.time1)
        console.log(order.time1)
      }
      that.setData({
        order: order,
        info:app.student.info
      })
    })
  },

  
})
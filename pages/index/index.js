const app = getApp()   
Page({
  data: {
    newphone:0
  },
 
  onShow: function () {
    console.log(app.student.info) 
    this.setData({
      info:app.student.info
    })
  },

  order: function () {
    wx.navigateTo({
      url: '../list/list',
    })
  },

  create:function(){
    wx.navigateTo({
      url: '../create/create',
    })
  },

  update: function () {
    wx.redirectTo({
      url: '../login/login',
    })
  },

  phone: function () {
    this.setData({
      newphone: 1
    })
  },
 
  sure: function () {
    this.setData({
      newphone: 0
    })
  },
})

var app = getApp();     
Page({ 
  data:{
    account:'',
    password:'',
  },

  login:function(){
    var account = this.data.account
    var password = this.data.password
    app.student.login(account, password,function(data){
      switch(data.length){
        case 0:
          wx.showModal({
            title: '学号密码不正确',
            content: '请重新输入',
            showCancel:false
          })
          break;

        case 1:
          console.log(data[0].xh)
          app.order.xh = app.student.xh = data[0].xh
          app.student.info = data[0]
          wx.redirectTo({
            url: '../index/index',
          })
          break;
      }
    })
  },

  inputAccount:function(e){
    this.setData({
      account:e.detail.value
    })
  },
  
  inputPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
})
// pages/create/create.js  
var app = getApp();     
Page({

  data: {
    question_list:[
      { 'name': '您目前处于什么状态?', 
        'value': ['抑郁', '焦虑', '其他'], 
        'choose': 0, 
        'choose_val': '抑郁',
        'val':'抑郁',
      },
      { 'name': '您想解决什么方面的问题?', 
        'value': ['人际困扰', '亲密关系', '学业困扰', '其他'], 
        'choose': 0, 
        'choose_val': '人际困扰',
        'val': '人际困扰',
      },
      { 'name': '安排咨询的紧急程度?', 
        'value': ['非常紧急', '有点着急', '愿意等待', '其他'], 
        'choose': 0, 
        'choose_val': '非常紧急',
        'val': '非常紧急',
      },
      { 'name': '如果个体等待时间较长，是否愿意转入团体心理咨询?', 
        'value': ['是', '否'], 
        'choose': 0,
        'val': '是',
      },
    ],
    timeArray: [
                  ['周一', '周二','周三','周四','周五'], 
                  ['上午9点-10点', '上午10点-11点', '上午11点-12点', '下午2点-3点', '下午3点-4点', '下午4点-5点'],
                ],
    chooseTime:[

    ],
    extra:''
  },


  bindstatus:function(e){
    var name = e.currentTarget.dataset.name
    var index = e.currentTarget.dataset.index
    var question_list = this.data.question_list
    for (var i in question_list){
      if (question_list[i].name == name){
        question_list[i].choose = index
        question_list[i].choose_val = (question_list[i].value)[index]
        question_list[i].val = (question_list[i].value)[index]
      }
    }
    this.setData({
      question_list: question_list
    })
  },
  
  inputOther:function(e){
    var index = e.currentTarget.dataset.index
    var question_list = this.data.question_list
    question_list[index].val = e.detail.value
    this.setData({
      question_list: question_list
    })
  },

  inputContent: function (e) {
    this.setData({
      extra: e.detail.value
    })
  },

  chooseTime:function(e){
    var day = e.detail.value[0]
    var time = e.detail.value[1]
    var timeArray = this.data.timeArray
    var chooseTime = this.data.chooseTime
    var chooseTime_str = timeArray[0][day] + ':' + timeArray[1][time]
    for (var i in chooseTime){
      if (chooseTime[i] == chooseTime_str){
        wx.showModal({
          title: '该时间段已选择',
          content: '',
          showCancel:false,
        })
        return false
      }
    }
    chooseTime.push(chooseTime_str)
    this.setData({
      chooseTime: chooseTime
    })
  },

  deleteTime:function(e){
    var index = e.currentTarget.dataset.index
    var chooseTime = this.data.chooseTime
    chooseTime = chooseTime.splice(1,1)
    this.setData({
      chooseTime: chooseTime
    })
  },

  login:function(){
    var question_list = this.data.question_list
    var chooseTime = this.data.chooseTime
    for (var i in question_list){
      console.log(question_list[i].val)
    }
    var state = question_list[0].val
    var reason = question_list[1].val
    var emergency = question_list[2].val
    var require1 = question_list[3].val
    var extra = this.data.extra
    console.log(chooseTime)
    console.log(extra)
    switch (chooseTime.length){
      case 0:{
        wx.showModal({
          title: '请输入时间',
          content: '',
          showCancel: false
        })
      }
      break;
      default:{
        app.order.insert(state, reason, emergency, require1, chooseTime, extra,function(data){
          console.log(data)
          if(data ==1){
            wx.showModal({
              title: '预约成功',
              content: '',
              showCancel: false,
              success:function(res){
                if(res.confirm){
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            })
          }
        })
      }
      break;
    }
  
  }
})
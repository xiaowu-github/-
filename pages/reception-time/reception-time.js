// pages/reception-time/reception-time.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:'',
    select: 0,
    json_data: [],
    year: '',
    month: '',
    date: '',
    day: '星期一',
    time:[
      {
        time: '09:00',
        boolean:false
      },
      {
        time: '10:00',
         boolean: false
      },
      {
        time: '11:00',
         boolean: false
      },
      {
        time: '12:00',
         boolean: false
      },
      {
        time: '13:00',
         boolean: false
      },
      {
        time: '14:00', 
        boolean: false
      },
      {
        time: '15:00', 
        boolean: false
      },
      {
        time: '16:00', 
        boolean: false
      },
      {
        time: '17:00', 
        boolean: false
      },
    ],
    week: [
      {
          day: '星期一',
        },
        {
          day: '星期二'
        },
        {
          day: '星期三'
        },
        {
          day: '星期四'
        },
        {
          day: '星期五'
        },
        {
          day: '星期六'
        },
        {
          day: '星期天'
        },
    ],
    json:{w:1},
    h:[],
    timeArr:[],
    h_index:0,
    selects: 1,
    xxx: [
      {
        w: 0,
        h: [{
          h: '09:00'
        },
        {
          h: '10:00'
        },
        {
          h: '12:00'
        }
        ]

      }, {
        w: 3,
        h: [{
          h: '15:00'
        },
        {
          h: '16:00'
        }
        ]
      }],
      are_you_ok:[
        {
          w:0,
          h:[]
        },
        {
          w: 1,
          h: []
        },
        {
          w: 2,
          h: []
        },
        {
          w: 3,
          h: []
        },
        {
          w: 4,
          h: []
        },
        {
          w: 5,
          h: []
        },
        {
          w: 6,
          h: []
        },
      ],
      my_ok: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(t) {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          clientHeight: res.windowHeight + 177
        });
      }
    })
    this.data.cid = t.id;
    this.generateDate(7);
    
  },

  generateDate: function (length) {
    var _this = this;
    var a = 0;
    var d = new Date();
    var today = new Date();
    console.log(today)
    for (var i = 0; i < length; i++) {
      d.setDate(today.getDate() + i);
      // getDate()返回某月的某一天
      this.data.json_data.push({
        h: [{
          h: '09:00',
          falg:0
        }, {
            h: '10:00',
            falg: 0
        }, {
            h: '11:00',
            falg: 0
        }, {
            h: '12:00',
            falg: 0
        }, {
            h: '13:00',
            falg: 0
        }, {
            h: '14:00',
            falg: 0
        }, {
            h: '15:00',
            falg: 0
        }, {
            h: '16:00',
            falg: 0
        }, {
            h: '17:00',
            falg: 0
        }, {
            h: '18:00',
            falg: 0
        }],
        d: d.getDate(),
        w: d.getDay(),
        m: d.getMonth() + 1,
        y: d.getFullYear()
      })
    }

    _this.setData({
      json_data: _this.data.json_data,
    })
    console.log(_this.data.json_data)
  },


  // 选择日期
  choice: function (e) {
    //console.log(e)
    var _this = this;
    this.data.index = e.currentTarget.dataset.index;
    this.data.year = e.currentTarget.dataset.year;
    this.data.month = e.currentTarget.dataset.month;
    this.data.date = e.currentTarget.dataset.date;
    this.data.day = e.currentTarget.dataset.day;
    var day = e.currentTarget.dataset.day;
    var index = e.currentTarget.dataset.index;
    this.data.h_index = e.currentTarget.dataset.index;

    this.setData({
      select: _this.data.index,
      h_index: _this.data.h_index
    })

    this.data.time.forEach(function (v, i, arr) {
      v.boolean = false;
    })

    var arr = [];
    _this.data.are_you_ok.forEach(function (v, i) {
      if(_this.data.index == i){
        arr = [];
        arr = arr.concat(v.h)
      }
    })
   
    this.data.time.forEach(function (v, i) {
      arr.forEach(function(val,index){
        if (JSON.parse(val).h == v.time){
          v.boolean = true;
        }
      })
    })
    this.setData({
      time: this.data.time
    })
  },

  recursion:function(arr,a){
    // for(var i=0;i<arr.length;i++){

    // }
  },

// 选择时间
  choiceHour: function (e) {
    var index2 = e.currentTarget.dataset.index;
    var hour = e.currentTarget.dataset.hour;
    var h = {};
    // h.h = hour;
    var hs = this.data.h
    var that=this;

    var array = [];
    // this.data.h_index 星期的索引  case 0:条件对应  执行
    console.log(this.data.h_index)
    switch(this.data.h_index){
      case 0:
        this.data.are_you_ok[this.data.h_index].w = this.data.h_index + 1
        this.data.time.forEach(function (v, i, arr) {
          if (i == index2) {
            if (!v.boolean) {
              v.boolean = true;
              //this.data.are_you_ok[this.data.h_index].h.push(v.time);
              that.data.are_you_ok[that.data.h_index].h.push(JSON.stringify({ h: v.time }));
            } else {
              v.boolean = false;
              let index = that.data.are_you_ok[that.data.h_index].h.indexOf(JSON.stringify({ h: v.time }));
              if (index > -1) {
                that.data.are_you_ok[that.data.h_index].h.splice(index, 1);
              }
            }
          }
        })
        break;
      case 1:
        this.data.are_you_ok[this.data.h_index].w = this.data.h_index + 1
        this.data.time.forEach(function (v, i, arr) {
          if (i == index2) {
            if (!v.boolean) {
              v.boolean = true;
              //this.data.are_you_ok[this.data.h_index].h.push(v.time);
              that.data.are_you_ok[that.data.h_index].h.push(JSON.stringify({ h: v.time }));
            } else {
              v.boolean = false;
              let index = that.data.are_you_ok[that.data.h_index].h.indexOf(JSON.stringify({ h: v.time }));
              if (index > -1) {
                that.data.are_you_ok[that.data.h_index].h.splice(index, 1);
              }
            }
          }
        })
        break;
      case 2:
        this.data.are_you_ok[this.data.h_index].w = this.data.h_index + 1
        this.data.time.forEach(function (v, i, arr) {
          if (i == index2) {
            if (!v.boolean) {
              v.boolean = true;
              //this.data.are_you_ok[this.data.h_index].h.push(v.time);
              that.data.are_you_ok[that.data.h_index].h.push(JSON.stringify({ h: v.time }));
            } else {
              v.boolean = false;
              let index = that.data.are_you_ok[that.data.h_index].h.indexOf(JSON.stringify({ h: v.time }));
              if (index > -1) {
                that.data.are_you_ok[that.data.h_index].h.splice(index, 1);
              }
            }
          }
        })
        break;
      case 3:
        this.data.are_you_ok[this.data.h_index].w = this.data.h_index + 1
        this.data.time.forEach(function (v, i, arr) {
          if (i == index2) {
            if (!v.boolean) {
              v.boolean = true;
              //this.data.are_you_ok[this.data.h_index].h.push(v.time);
              that.data.are_you_ok[that.data.h_index].h.push(JSON.stringify({ h: v.time }));
            } else {
              v.boolean = false;
              let index = that.data.are_you_ok[that.data.h_index].h.indexOf(JSON.stringify({ h: v.time }));
              if (index > -1) {
                that.data.are_you_ok[that.data.h_index].h.splice(index, 1);
              }
            }
          }
        })
        break;
      case 4:
        this.data.are_you_ok[this.data.h_index].w = this.data.h_index + 1
        this.data.time.forEach(function (v, i, arr) {
          if (i == index2) {
            if (!v.boolean) {
              v.boolean = true;
              //this.data.are_you_ok[this.data.h_index].h.push(v.time);
              that.data.are_you_ok[that.data.h_index].h.push(JSON.stringify({ h: v.time }));
            } else {
              v.boolean = false;
              let index = that.data.are_you_ok[that.data.h_index].h.indexOf(JSON.stringify({ h: v.time }));
              if (index > -1) {
                that.data.are_you_ok[that.data.h_index].h.splice(index, 1);
              }
            }
          }
        })
        break;
      case 5:
        this.data.are_you_ok[this.data.h_index].w = this.data.h_index + 1
        this.data.time.forEach(function (v, i, arr) {
          if (i == index2) {
            if (!v.boolean) {
              v.boolean = true;
              //this.data.are_you_ok[this.data.h_index].h.push(v.time);
              that.data.are_you_ok[that.data.h_index].h.push(JSON.stringify({ h: v.time }));
            } else {
              v.boolean = false;
              let index = that.data.are_you_ok[that.data.h_index].h.indexOf(JSON.stringify({ h: v.time }));
              if (index > -1) {
                that.data.are_you_ok[that.data.h_index].h.splice(index, 1);
              }
            }
          }
        })
        break;
      case 6:
        this.data.are_you_ok[this.data.h_index].w = this.data.h_index + 1
        this.data.time.forEach(function (v, i, arr) {
          if (i == index2) {
            if (!v.boolean) {
              v.boolean = true;
              //this.data.are_you_ok[this.data.h_index].h.push(v.time);
              that.data.are_you_ok[that.data.h_index].h.push(JSON.stringify({ h: v.time }));
            } else {
              v.boolean = false;
              let index = that.data.are_you_ok[that.data.h_index].h.indexOf(JSON.stringify({ h: v.time }));
              if (index > -1) {
                that.data.are_you_ok[that.data.h_index].h.splice(index, 1);
              }
            }
          }
        })
        break;
    }

    this.setData({
      select2: index2,
      time: this.data.time
    })


  },

  // 删除方法
  remove: function (array, val) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == val) {
        array.splice(i, 1);
      }
    }
    // return -1;
  },

  // 提交
  formSubmit: function (t) {
    var arr = [];
    var obj = '';
    var newArr = this.data.are_you_ok.filter(item => {
      if (item.h.length !== 0) {
        return true;
      }
    })

    newArr.forEach(function(val,index){
      newArr[index]._h = [];
      val.h.forEach(function(v,i){
        obj = JSON.parse(v);
        newArr[index]._h.push(obj)
      })
      delete newArr[index].h;
    })

    newArr.forEach(function(v,i,arr){
       v.h = v._h;
       delete v._h;
    })

    console.log(newArr)

    var json = JSON.stringify(newArr);
    if (newArr == ''){
      wx.showToast({
        title: '请设置工作时间',
        icon:'none'
      })
    }else{
      var cid = {
        cid: this.data.cid,
        data: json
      };

      getApp().request({
        url: getApp().api.consultantation.consultants_time,
        data: cid,
        method: 'POST',
        success: function (t) {
          if(t.code==0){
            console.log(t)
            wx.showToast({
              title: t.msg,
              icon: 'none'
            })
            wx.navigateTo({
              url: '../personalcenter/personalcenter',
            })
          }else if(t.code==2){
            wx.showModal({
              title: '提示',
              content: '您有未完成订单',
              success: function (res) {
                if (res.confirm) {//这里是点击了确定以后
                  console.log('用户点击确定')
                  wx.navigateTo({
                    url: '../book-managem/book-managem',
                  })
                } else {//这里是点击了取消以后
                  console.log('用户点击取消')

                }

              }
            })
          }
        },
        complete: function () {

        }
      });
    }
  },

  change: function(e) {
    console.log(e)
    var _this = this;
    var _dataTime = this.data.dataTime;
    var week = e.currentTarget.dataset.week;

    // _dataTime.push(week)
    // console.log(_dataTime)
    var index = e.target.dataset.index;
    if (this.data.data[0].weeks[index].timecheck == 0) {
      console.log(1111111111)
      this.data.data[0].weeks[index].timecheck = 1;
      _dataTime.push(week)
      console.log(_dataTime)
    } else {
      console.log(222222222)
      this.data.data[0].weeks[index].timecheck = 0
      this.remove(_dataTime, week)
      console.log(_dataTime)
    }
    this.setData({
      data: _this.data.data
    })
  },

  discolour: function(e) {
    console.log(e)
    var _this = this;

    var _dataTime = this.data.dataTime;
    var times = e.currentTarget.dataset.times;
    // _dataTime.push(times)
    // console.log(_dataTime)

    var index = e.target.dataset.index;
    if (this.data.data[0].times[index].timecheck == 0) {
      this.data.data[0].times[index].timecheck = 1;
      _dataTime.push(times)
      console.log(_dataTime)
    } else {
      this.data.data[0].times[index].timecheck = 0
      this.remove(_dataTime, times)
      console.log(_dataTime)
    }
    this.setData({
      data: _this.data.data
    })

    console.log(_dataTime)
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
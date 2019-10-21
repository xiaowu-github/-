// pages/reservation-consultation/reservation-consultation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: 0,
    index: 0,
    // select2: 0,
    dayArr: [],
    show: false,
    order_id: '',
    arr: [{
        week: '0',
        time: [
          '10:00',
          '12:00',
          '14:00'
        ]
      },
      {
        week: '1',
        time: [
          '10:00',
          '12:00',
          '14:00'
        ]
      },
      {
        week: '3',
        time: [
          '10:00',
          '12:00',
          '14:00'
        ]
      }
    ],
    json: [],
    timeArr: [],
    year: '',
    month: '',
    date: '',
    day: '',
    xxx: [],
    info: [],
    json_data: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.defaultTime();
    this.loadDate(options);
    this.comment(options);
  },
  generateDate: function(length) {
    var _this = this;
    var a = 0;
    var d = new Date();
    var today = new Date();
    for (var i = 0; i < length; i++) {
      d.setDate(today.getDate() + i);
      // getDate()返回某月的某一天
      this.data.json_data.push({
        h: [{
          h: '09:00'
        }, {
          h: '10:00'
        }, {
          h: '11:00'
        }, {
          h: '12:00'
        }, {
          h: '13:00'
        }, {
          h: '14:00'
        }, {
          h: '15:00'
        }, {
          h: '16:00'
        }, {
          h: '17:00'
        }, {
          h: '18:00'
        }],
        d: d.getDate(),
        w: d.getDay(),
        m: d.getMonth() + 1,
        y: d.getFullYear()
      })
    }
    // 日期
    _this.data.json_data.forEach(function(v, i) {
      // xxx是后台传输的陪伴师可预约的时间数组
      _this.data.xxx.forEach(function(val) {
        // 当用户选择的时间 和 陪伴师可预约的时间
        if (v.w == val.w) {
          // 相等为true wxml页面判断选择显示灰色样式还是可选择样式
          v.boolean = true;
        }
      })
    })
    _this.data.json_data.forEach(function(v, i) {
      // 当用户选择的时间 和 陪伴师可预约的时间  相同时进入if判断
      if (v.boolean) {
        v.h.forEach(function(val, index) {
          // console.log(v.h)
          _this.data.xxx.forEach(function(value) {
            value.h.forEach(function(item) {
              if (v.w == value.w) {
                if (val.h == item.h) {
                  val.boolean = true;
                }
              }
            })
          })
        })
      }
    })
    console.log(_this.data.xxx)
    // 时间段
    console.log(_this.data.json_data)
    _this.setData({
      json_data: _this.data.json_data
    })
    console.log(_this.data.json_data)
  },

  defaultTime: function() {
    let d = new Date();
    this.data.year = d.getFullYear();
    this.data.month = d.getMonth() + 1;
    this.data.date = d.getDate();
    this.data.day = d.getDay();
  },

  // 选择年月日周
  choice: function(e) {
    console.log(e)
    var _this = this;
    this.data.index = e.currentTarget.dataset.index;
    this.data.year = e.currentTarget.dataset.year;
    this.data.month = e.currentTarget.dataset.month;
    this.data.date = e.currentTarget.dataset.date;
    this.data.day = e.currentTarget.dataset.day;

    this.setData({
      select: _this.data.index
    })
  },

  // 选择时间段
  choiceHour: function(e) {
    var index2 = e.currentTarget.dataset.index;
    var hour = e.currentTarget.dataset.hour;
    this.setData({
      select2: index2,
    })
    this.data.json = {
      y: this.data.year,
      m: this.data.month,
      d: this.data.date,
      w: this.data.day,
      h: hour
    }
    console.log(this.data.json)
  },

  loadDate: function(t) {
    console.log(t)
    var that = this;
    var cid = {
      cid: t.id
    };
    getApp().request({
      url: getApp().api.consultantation.consultants_details,
      data: cid,
      method: 'GET',
      success: function(t) {
        console.log(t)
        let json = t.data.info.time;


        that.data.xxx = that.data.xxx.concat(json)
        that.data.info = that.data.info.concat(t.data.info)
        console.log(json)
        that.setData({
          info: t.data.info,

        })
        that.generateDate(7) //有问题看我一下啊
      },
      complete: function() {

      }
    });
  },

  comment: function(t) {
    console.log(t)
    var that = this;
    var cid = {
      cid: t.id
    };
    getApp().request({
      url: getApp().api.consultantation.consultants_comment,
      data: cid,
      method: 'GET',
      success: function(t) {
        console.log(t)
        if (t.data.list.length == 0) {
          console.log(11111111)
          that.setData({
            comment_show2: 0
          })
        } else {
          console.log(2222)

          that.setData({
            comment_list: t.data.list,
            comment_show2: 1
          })
        }

        // that.generateDate(7)//有问题看我一下啊
      },
      complete: function() {

      }
    });
  },

  // 生成订单
  formSubmit: function(e) {
    console.log(this.data.json)
    console.log(this.data.info)
    var cid = this.data.info.id
    var _json = JSON.stringify(this.data.json);
    var ids = e.detail.target.dataset.id;
    var that = this;
    if (this.data.json==''){
      wx.showToast({
        title: '请选择时间',
        icon:'none'
      })
      return false;
    }
    getApp().request({
      url: getApp().api.consultantation.consultants_submit,
      data: {
        time: _json,
        method: 0,
        cid: ids,
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          wx.navigateTo({
            url: `/pages/order/order?id=${res.data.order_id}&cid=${ids}&time=${_json}&cid=${cid}`,
          })
        }

        if (res.code == 1) {
          wx.showModal({
            title: '提示',
            content: '您有未完成订单',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: `/pages/history-orders/history-orders`,
                })
              } else if (res.cancel) {

              }
            }
          })
        }
      }
    })
  },


  barrier: function() {
    this.setData({
      show: false
    })
  },

  score: function(e) {
    console.log(e)
    var that = this;
    for (var i = 0; i < that.data.stars.length; i++) {
      var allItem = 'stars[' + i + '].flag';
      that.setData({
        [allItem]: 1
      })
    }
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i <= index; i++) {
      var item = 'stars[' + i + '].flag';
      that.setData({
        [item]: 2
      })
    }
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
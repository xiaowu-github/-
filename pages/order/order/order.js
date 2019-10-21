// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: '',
    info: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.data.info = this.data.info.concat(options.info);
    this.data.order_id = options.id;
    this.loadDate(options);
    //this.zxInfo(options.cid);
  },
  timer: function(options) {
    console.log(options)
    this.setData({
      day: options.day,
      hours: options.hours,
      month: options.month,
      week: options.week,
      year: options.year
    })
  },
  loadDate: function(t) {
    console.log(t)
    getApp().request({
      url: getApp().api.consultantation.order_details,
      data: {
        order_id:t.id
      },
      method: 'GET',
      success: function (t) {
        console.log(t)
        that.setData({
          info: t.data,
        })
      },
      complete: function () { }
    });



    this.setData({
      day: t.day,
      hours: t.hours,
      month: t.month,
      week: t.week,
      year: t.year
    })
    var that = this;
    var id = {
      cid: t.id
    };
  },

  zxInfo: function(t) {
    var that = this
    var data = {
      cid: t
    }
    getApp().request({
      url: getApp().api.consultantation.consultants_details,
      data: data,
      method: 'GET',
      success: function(t) {
        that.setData({
          info: t.data.info,
        })
      },
      complete: function() {}
    });
  },

  confirm: function() {
    wx.reLaunch({
      url: '../personalcenter/personalcenter',
    })
  },

  //订单确认，订单状态为1；
  formSubmit: function(e) {
    var that = this
    console.log(e)
    var order_id = {
      order_id: this.data.order_id
    };
    getApp().request({
      url: getApp().api.consultantation.order_confirm,
      data: order_id,
      method: 'POST',
      success: function(t) {
        console.log(t)
        that.setData({
          show: true
        })
      },
      complete: function() {}
    });
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
// pages/personalcenter/personalcenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    order_on: '',
    laber: [{
        items: 11111111,
      },
      {
        items: 222,
      },
      {
        items: 1111555511111111111,
      },
    ],
    fun: [{
        item: '历史预约',
      },
      {
        item: '天使家园',
      },
      {
        item: '我的投稿',
      },

    ],
    more: [{
        a: '消息回复'
      },
      {
        a: '成为陪伴者'
      },
      {
        a: '我的投稿'
      },

    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(t) {
    console.log(t)
    var that = this
    getApp().page.onLoad(that, t), t.page_id || (t.page_id = -1), that.setData({
      options: t
    }), that.loadMore(t);
    that.orderDetails()
  },
  appointment: function() {
    wx.navigateTo({
      url: '../reception-time/reception-time',
    })
  },

  orders: function() {
    var ids = this.data.id
    wx.navigateTo({
      url: `../history-orders/history-orders?id=${ids}`,
    })
  },

  start: function(e) {
    console.log(e)
    var ids = e.currentTarget.dataset.order_on
    wx.navigateTo({
      url: `../Trtc/webrtc-room/index/index?order=${ids}`,
    })
  },


  bookManagem: function() {
    wx.navigateTo({
      url: '../book-managem/book-managem',
    })
  },

  applyConsultant(e) {
    console.log(e)
    let user_id = getApp().core.getStorageSync(getApp().const.USER_INFO).id;
    console.log(user_id)
    if (e.currentTarget.dataset.index == 0) {
      wx.navigateTo({
        // url: '../audit-consultant/audit-consultant?id=' + user_id,
      })
    } else if (e.currentTarget.dataset.index == 1) {
      wx.navigateTo({
        url: '../audit-consultant/audit-consultant?id=' + user_id,
      })
    } else {
      wx.navigateTo({
        url: '../contribute/contribute'
        // url: '../contribute/contribute?id=' + user_id,
      })
    }
  },

  myselfSet: function(e) {
    console.log(e.currentTarget.dataset.info.id)
    var info_id = e.currentTarget.dataset.info.id
    wx.navigateTo({
      url: '../myselfset/myselfset?info_id=' + info_id,
    })
  },



  loadMore: function(t) {
    var that = this;
    getApp().request({
      // 等级
      url: getApp().api.consultantation.index,
      // data: data,
      method: 'GET',
      success: function(t) {
        console.log(t)
        if (t.code == 0) {
          that.setData({
            info: t.data,
            order_info: t.data.orders,
          })
          //console.log(t.data.status.audit_status)
          if (t.data.status == null) {
            return false;
          }
          if (t.data.status.audit_status == 1) {
            that.setData({
              audit_status: true,
            })
          }
      

        }
      },
      complete: function() {

      }
    });
  },

  orderDetails: function() {
    var that = this;
    getApp().request({
      url: getApp().api.consultantation.consultants_order,
      // data: data,
      method: 'GET',
      success: function(t) {
        console.log(t)
        if (t.code == 0) {
          t.data.forEach(function(v, i) {
            that.data.order_on = t.data[i].id
            that.setData({
              order_status: t.data[i].status,
              order_datails: t.data[i]
            })
          })
          console.log(that.data.order_on)
        } else if (t.code == 1) {
          console.log(t.data)
        }
      },
      complete: function() {

      }
    });
  },

  clickTo: function(e) {
    if (e.currentTarget.dataset.index == 0) {
      wx.navigateTo({
        url: '../history-orders/history-orders?id=' + e.currentTarget.dataset.id,
      })
    } else if (e.currentTarget.dataset.index == 1) {
      wx.navigateTo({
        // url: '../history-orders/history-orders?id=' + e.currentTarget.dataset.id,
      })
    } else {
      wx.navigateTo({
        // url: '../history-orders/history-orders?id=' + e.currentTarget.dataset.id,
      })
    }
    console.log(e)
  },

  canCel: function() {
    return;
    var that = this;
    var data = {
      order_id: that.data.order_on
    }
    getApp().request({
      url: getApp().api.consultantation.cancel,
      data: data,
      method: 'POST',
      success: function(t) {
        console.log(t)
        that.setData({})
        that.onLoad(t)
      },
      complete: function() {

      }
    });
  },
  /**{}
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
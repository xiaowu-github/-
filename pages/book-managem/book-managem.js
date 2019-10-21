// pages/history-orders/history-orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: '',
    consultant_times: [],
    id: '',
    tab_content: [{
      title: '即将开始',
    },
    {
      title: '正在进行中',
    },
    ],
    selecter: 0,
    pagenum: 1,
    pagesize: 5,
    type: 'is_use',
    list: [],
    loading: true,
    order_on: '',
    loading_title: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id;
    this.loadDate();
  },

  loadDate: function (t) {
    
    wx.showLoading({
      title: '加载中...',
    });
    var that = this;
    var t = {
      pagenum: this.data.pagenum,
      pagesize: this.data.pagesize,
      status: this.data.status ? this.data.status : '1',
    };
    getApp().request({
      url: getApp().api.consultantation.consultants_order,
      data: t,
      method: 'GET',
      success: function (t) {
        wx.hideLoading()
        if (t.code == 0) {
          // t.data.forEach(function (v, i) {
          //   v.consultant_time = JSON.parse(v.consultant_time);
          // })
          // t.data.forEach(function (v, i) {
          //   v.consultant_time = v.consultant_time.y + '-' + v.consultant_time.m + '-' + v.consultant_time.d + ' ' + v.consultant_time.h
          // })
          that.data.list = that.data.list.concat(t.data.orders);
          if (that.data.pagenum >= t.data.page_count) {
            that.data.loading = false;
          }
          that.setData({
            order_datalis: that.data.list,
          })
        } else if (t.code == 1) {
          that.data.loading_title = t.data;
          that.setData({
            loading_title: that.data.loading_title,
            order_datalis: that.data.list,
            code: t.code
          })
          wx.showLoading({
            title: '无更多内容...',
          });
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
        }
      },
      complete: function () { }
    });
  },

  tabbar: function (e) {
    var index = e.currentTarget.dataset.index
    switch (index) {
      case 0:
        this.data.pagenum = 1;
        this.data.loading = true;
        this.data.list = [];
        this.data.status = '1';
        this.loadDate();
        break;
      case 1:
        this.data.pagenum = 1;
        this.data.loading = true;
        this.data.list = [];
        this.data.status = '2';
        this.loadDate();
        break;
    }

    this.setData({
      selecter: index,
    })
  },

  comments: function () {
    wx.navigateTo({
      url: '../evaluation/evaluation',
    })
  },

  canCel: function (t) {
    var that = this;
    var data = {
      order_id: t.currentTarget.dataset.order_id
    }
    wx.showModal({
      title: '提示',
      content: '确认取消订单吗？',
      success: function (e) {
        if (e.confirm) {
          getApp().request({
            url: getApp().api.consultantation.cancel,
            data: data,
            method: 'POST',
            success: function (t) {
              wx.redirectTo({
                url: '../history-orders/history-orders'
              })
            },
            complete: function () {

            }
          });
        }
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.loading) {
      this.data.pagenum += 1;
      this.loadDate();
    } else {

    }

  },



  onShow: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
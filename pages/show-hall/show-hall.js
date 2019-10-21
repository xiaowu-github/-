// pages/show-hall/show-hall.js
var siteinfo = require('../../siteinfo.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: ['风采绽放', '精彩回放'],
    datails: ['嘻嘻', '嘻嘻', '嘻嘻', '嘻嘻', '嘻嘻', '嘻嘻', '嘻嘻', '嘻嘻', '嘻嘻', ],
    selecet: '0',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()
  },
  loadData:function(){
    var that = this
    getApp().request({
      url: getApp().api.audiovisual.category,
      // data: cid,
      method: 'GET',
      success: function (t) {
        console.log(t)
        console.log(t.data.terms[0].second)
        t.data.banners.forEach(function(v){
          v.pic_url = siteinfo.picurl + v.pic_url
        })
        that.setData({
          imgUrls:t.data.banners,
          data: t.data.terms,
          tab1: t.data.terms[0].second[0].second.third,
          tab2: t.data.terms[0].second[1].second.third,
        })
      },
      complete: function () {

      }
    });
  },

  onClick:function(e){
    var that=this
    that.data.index = e.currentTarget.dataset.index
    console.log(e)
    that.setData({
      selecet: e.currentTarget.dataset.index
    })
  },


  goShowList:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../show-hall-list/show-hall-list?id=' + e.currentTarget.dataset.id +' &name='+e.currentTarget.dataset.name,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// pages/show-hall-list/show-hall-list.js
var siteinfo = require('../../siteinfo.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagenum: 1,
    pagesize: 10,
    list: [],
    page_count: '',
    options: '',
    url1: ['../../img/collection.png', '../../img/cancelCollection.png'],
    collect: '',
    // cancel:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.loadData(options)
    this.data.options = options
  },
  loadData: function(e) {
    console.log(e)
    var that = this
    var data = {
      term_id: e.id,
      pagename: that.data.pagenum,
      pagesize: that.data.pagesize,
    }
    getApp().request({
      url: getApp().api.audiovisual.catalog,
      data: data,
      method: 'GET',
      success: function(t) {
        console.log(t)
        console.log(that.data.list)
        t.data.list.forEach(function() {

        })
        that.data.collect = t.data.list.collect
        that.data.page_count = t.data.page_count
        that.data.list = that.data.list.concat(t.data.list)
        that.setData({
          collect: that.data.list,
          name: e.name,
          url: siteinfo.picurl,
          // collect: that.data.list,
          collection: '../../img/collection.png',
          cancelCollection: '../../img/cancelCollection.png'
        })
      },
      complete: function() {

      }
    });
  },
  goShowDatails: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../show-hall-datdils/show-hall-datdils?id=' + e.currentTarget.dataset.id,
    })
  },

  collection: function(e) {
    console.log( e)
    var that = this
    if (e.currentTarget.dataset.collect) {
      console.log('增加收藏')
      var data = {
        term_id: e.currentTarget.dataset.id,
      }
      getApp().request({
        url: getApp().api.audiovisual.cancel_collection,
        data: data,
        method: 'POST',
        success: function(t) {
          console.log(t)
          if (t.code == 1) {
            that.data.list[e.currentTarget.dataset.index].collect = 0;
            that.setData({
              collect: that.data.list
            })
            console.log(that.data.list)
          }
        },
      })
    } else {
      console.log('取消收藏')
      var data = {
        term_id: e.currentTarget.dataset.id,
      }
      getApp().request({
        url: getApp().api.audiovisual.collect_collect,
        data: data,
        method: 'POST',
        success: function(t) {
          console.log(t)
          if (t.code == 1) {
            that.data.list[e.currentTarget.dataset.index].collect = 1;
            that.setData({
              collect: that.data.list
            })
            console.log(that.data.list)

          }
        },
      })
    }
    // var data = {
    //   term_id: e.currentTarget.dataset.id,
    // }
    // getApp().request({
    //   url: getApp().api.audiovisual.collect_collect,
    //   data: data,
    //   method: 'POST',
    //   success: function (t) {
    //     console.log(t)
    //     if(t.code==0){
    //       that.setData({
    //         cancelCollection:'../../img/collection.png'
    //       })
    //     }
    //   },
    // })
    // this.onShow()
  },

  // cancelCollection: function (e) {

  //   console.log('取消收藏',e)
  //   var that = this
  //   var data = {
  //     term_id: e.currentTarget.dataset.id,
  //   }
  //   getApp().request({
  //     url: getApp().api.audiovisual.cancel_collection,
  //     data: data,
  //     method: 'POST',
  //     success: function (t) {
  //       console.log(t)
  //       if (t.code == 1) {

  //         that.setData({
  //           collection:'../../img/cancelCollection.png'
  //         })
  //       }
  //     },
  //   })
  //   this.onShow()
  // },
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
    console.log('111111')
    if (this.data.pagenum < this.data.page_count) {
      console.log('222')
      this.data.pagenum += 1;
      this.loadData(this.data.options)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
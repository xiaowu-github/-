// pages/recommendation/recommendation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: [{
        book_name: '书名书名书名书',
        name: '姓名姓名姓名'
      },
      {
        book_name: '书名书名书书名',
        name: '姓名姓名姓名'
      },
      {
        book_name: '书名书名书名名',
        name: '姓名姓名姓名'
      },
      {
        book_name: '书名书名书书名',
        name: '姓名姓名姓名'
      },
      {
        book_name: '书名书名书名名',
        name: '姓名姓名姓名'
      },
      {
        book_name: '书名书名名书名',
        name: '姓名姓名姓名'
      },
    ],
    movie:[
      {
        movie_name: '电影名称',
        movie_Plot: '剧情/美国/126分钟',
        movie_time: '2019年6月',
        movie_introduction: '剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情'
      },
      {
        movie_name: '电影名称',
        movie_Plot: '剧情/美国/126分钟',
        movie_time: '2019年6月',
        movie_introduction: '剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情'
      },
      {
        movie_name: '电影名称',
        movie_Plot: '剧情/美国/126分钟',
        movie_time: '2019年6月',
        movie_introduction: '剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情'
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getApp().page.onLoad(this, options)
    this.loadData()
  },

  loadData:function(){
    
    var that = this
    getApp().request({
      url: getApp().api.audiovisual.cinema_category,
      // data: cid,
      method: 'GET',
      success: function (t) {
        console.log(t)
        that.setData({
          // datails: t.data,
          // second: t.data.second
        })
      },
      complete: function () {

      }
    });
  },

  more:function(){
    wx.navigateTo({
      url: '../list-books/list-books',
    })
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
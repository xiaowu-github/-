// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    navigation_icon: [
      {
        iconsrc: '../../img/dianying.png',
        icontext: '电影铺子'
      },
      {
        iconsrc: '../../img/youyue.png',
        icontext: '点评推荐'
      },
      {
        iconsrc: '../../img/dianping.png',
        icontext: '佳片有约   '
      },
    ],

    gooodsp: [
      {
        iconsrc: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        icontext: '电影铺子'
      },
      {
        iconsrc: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        icontext: '点评推荐'
      },
      {
        iconsrc: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        icontext: '佳片有约   '
      },
    ],
    movie_store:[
      {
        iconsrc: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        icontext: '电影铺子',
        plot:'剧情/美国/126分钟',
        time:'2019-5-11',
        introduce:"简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介"
      },
      {
        iconsrc: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        icontext: '电影铺子',
        plot: '剧情/美国/126分钟',
        time: '2019-5-11',
        introduce: "简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介"
      },
      {
        iconsrc: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        icontext: '电影铺子',
        plot: '剧情/美国/126分钟',
        time: '2019-5-11',
        introduce: "简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  click:function(){
    wx.navigateTo({
      url: '../movie-datails/movie-datails',
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
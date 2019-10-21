// pages/list-Books/list-books.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    contentlist: [],
    max_count: '20',  //根据后台每页的数据设定
    hasMoreData: '' ,  //是否有更多数据文字

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
    ],
    sort: [{
        sort: '标签',
      },
      {
        sort: '分类',
      },
      {
        sort: '标签',
      },
      {
        sort: '分类',
      },
    ],
    movie: [{
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
      },
      {
        movie_name: '电影名称',
        movie_Plot: '剧情/美国/126分钟',
        movie_time: '2019年6月',
        movie_introduction: '剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情剧情'
      }
    ]

  },

  more: function (page,max_count) {
    var that=this;
    wx.request({
      url: that.data.movie,
      data:{
        page: that.data.page,
        max_count: that.data.max_count,
      },
      success:function(res){
        console.log("hahahahhahahahhaah")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    // console.log('11111111111')

  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('11111111111')
    this.more();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
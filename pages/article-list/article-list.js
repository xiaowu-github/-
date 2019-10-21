// pages/article-list/article-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    title:'',
    index: '',
    options:'',
    pagenum: 1,
    pagesize: 20,
    alllist:[],
    page_count:'',
    term_id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    console.log(options)
    that.loadData(options)
    that.data.id = options.id;
    that.data.options = options;
    that.data.title = options.title;
  },
  loadData: function (e) {
    var that = this
    console.log(e)
    var data = {
      term_id: e.id,
      pagenum: that.data.pagenum,
      pagesize: that.data.pagesize
    }
    this.data.term_id=e.id;
    getApp().request({
      url: getApp().api.audiovisual.audio_catalog,
      data: data,
      method: 'GET',
      success: function (t) {
        that.data.page_count= t.data.page_count
        console.log(t)
        that.data.alllist = that.data.alllist.concat(t.data.list)
        console.log(that.data.alllist)
        that.setData({
          datails: that.data.alllist,
          index: that.data.index,
          title:e.title
        })
      },
      complete: function () {

      }
    });
  },

  goArticle: function (e) {
    let that=this
    wx.navigateTo({
      url: '../bookdetails/bookdetails?id=' + e.currentTarget.dataset.id + '&term_id=' + that.data.term_id
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
    if (this.data.pagenum < this.data.page_count ){
      this.data.pagenum += 1
      this.loadData(this.data.options)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
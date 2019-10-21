// pages/auditions-list/auditions-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    index:'',
    pagenum: 1,
    pagesize: 120,
    titList:['同命人生','哀伤与疗愈','生命的启迪','生命的奥秘','相关政策与资料'],
    firstName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.id = options.id
    this.data.index = options.index
  //  this.loadData(options)
    this.loadCategory(options);
  },

  loadCategory: function (e){
    var that = this
    var data = {
      term_id: e.id,   
    }
    getApp().request({
      url: getApp().api.audiovisual.audio_subcategory,
      data: data,
      method: 'GET',
      success: function (t) {
        console.log(t.data.second)
        that.setData({
          list: t.data.second,
          index: that.data.index,
          firstName: t.data.name
        })
      },
      complete: function () {

      }
    });
  },



  goTo:function(e){
    console.log(e)
    wx.navigateTo({
      // url: '../bookdetails/bookdetails?id=' + this.data.id 
      url: '../article-list/article-list?id=' + e.currentTarget.dataset.id + '&title=' + e.currentTarget.dataset.title
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
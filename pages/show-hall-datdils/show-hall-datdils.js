// pages/show-hall-datdils/show-hall-datdils.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagenum: 1,
    pagesize: 10,
    page_count:'',
    list:[],
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.id = options.id
    this.loadData(options)
    this.commentList(options)
  },
  loadData: function (e) {
    // console.log(e.id)
    var aid={
      aid: e.id
    }
    var that = this
    getApp().request({
      url: getApp().api.audiovisual.article_details,
      data: aid,
      method: 'GET',
      success: function (t) {
        if (t.data.video==null){
          // console.log(t.data.video == null)
          that.setData({
            show:false
          })
        }else{
          that.setData({
            show: true
          })
        }
        // console.log(t)
        that.setData({
          data: t.data
        })
        let data = t.data.post_content
        that.setData({ nodes: data.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ') })
      },
      complete: function () {

      }
    });
  },

  commentList: function () {
    var data = {
      term_id: this.data.id,
      pagenum: this.data.pagenum,
      pagesize: this.data.pagesize
    }
    if (this.data.cursor !== 0) {
      var that = this
      getApp().request({
        url: getApp().api.audiovisual.comment_list,
        data: data,
        method: 'GET',
        success: function (t) {
          console.log(t)
          that.setData({
            code: t.code,
          })
          that.data.list = that.data.list.concat(t.data.comment)
          console.log(t)
          console.log(that.data.list)
          that.setData({
            datails: t.data,
            datails: that.data.list,
          })
          that.data.page_count = t.data.page_count;
        },
        complete: function () {

        }
      });
    }
  },

  writeComment: function (e){
    wx.navigateTo({
      url: '../comments/comments?id=' + e.currentTarget.dataset.id + '&title=' + e.currentTarget.dataset.title,
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
    console.log('222')
    if (this.data.pagenum < this.data.page_count){
      console.log('111')
      this.data.pagenum += 1
      this.commentList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
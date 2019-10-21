// pages/writepl/writepl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select:"btn",
    value:'',
    cursor:'',
    id:'',
    cid:'',
    type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.id = options.id
    this.data.cid = options.cid
    this.data.type = options.type
    this.setData({ title: options.title})
    // this.loadData()
  },

  Submit: function () {
    // comment_list

    if (this.data.type == 0) {
      var data = {
        order_id: this.data.id,
        cid: this.data.cid,
        content: this.data.value
      }
      var that = this
      getApp().request({
        url: getApp().api.consultantation.comment,
        data: data,
        method: 'POST',
        success: function (t) {
          console.log(t)
          wx.showToast({
            title: t.msg,
            icon:'none'
          })
        },
        complete: function () {

        }
      });
    } else if (this.data.cursor !== 0) {
      var data = {
        term_id: this.data.id,
        content: this.data.value
      }
      var that = this
      getApp().request({
        url: getApp().api.audiovisual.collect_comments,
        data: data,
        method: 'POST',
        success: function (t) {
          console.log(t)
          wx.showToast({
            title: t.msg,
            icon: 'none'
          })
        },
        complete: function () {

        }
      });
    }
  },

  write:function(e){
    console.log(e)
    this.data.value = e.detail.value
    this.data.cursor = e.detail.cursor
    var lenghts = e.detail.cursor
    if (lenghts!==0){
      this.setData({
        select: "btns"
      })
    }else{
      this.setData({
        select: "btn"
      })
    }
  },
  formSubmit:function(){

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
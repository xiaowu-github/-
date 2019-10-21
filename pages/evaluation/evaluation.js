// pages/evaluation/evaluation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    stars: [
      {
        flag: 1,
        bgImg: "../../img/reservation-consultation/stars.png",
        bgfImg: "../../img/reservation-consultation/star.png"
      },
      {
        flag: 1,
        bgImg: "../../img/reservation-consultation/stars.png",
        bgfImg: "../../img/reservation-consultation/star.png"
      },
      {
        flag: 1,
        bgImg: "../../img/reservation-consultation/stars.png",
        bgfImg: "../../img/reservation-consultation/star.png"
      },
      {
        flag: 1,
        bgImg: "../../img/reservation-consultation/stars.png",
        bgfImg: "../../img/reservation-consultation/star.png"
      },
      {
        flag: 1,
        bgImg: "../../img/reservation-consultation/stars.png",
        bgfImg: "../../img/reservation-consultation/star.png"
      }
    ],
    biaoqian:[
      {
        shuxing: '美丽动人'
      },
      {
        shuxing: '美丽动人'
      },
      {
        shuxing: '美丽动人'
      },
      {
        shuxing: '美丽动人'
      },
      {
        shuxing: '美丽动人'
      },
      {
        shuxing: '美丽动人'
      },
    ]
  },
      score: function (e) {
      console.log(e)
      var that = this;
      for (var i = 0; i < that.data.stars.length; i++) {
        var allItem = 'stars[' + i + '].flag';
        console.log(allItem)

        that.setData({
          [allItem]: 1
        })
      }
      var index = e.currentTarget.dataset.index;

      for (var i = 0; i <= index; i++) {
        console.log(i)
        var item = 'stars[' + i + '].flag';
        console.log(item)

        that.setData({
          [item]: 2
        })
      }
    },

  close:function(){
    var show=this.data.show
    this.setData({
      show:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
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
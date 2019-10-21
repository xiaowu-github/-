// pages/companys/companys.js
var siteinfo = require('../../siteinfo.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconSize: [20],
    iconColor: ['#CCC'],
    iconType: [
      'success',
    ],
    indexs: 0,
    show: '',
    show1: 'true',
    rules: '',
    according:0,
    hidden:'',
    consent_iconColor: '#CCC',
    staus: 0,
    inx:1,
    hidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(this.data.show)
    getApp().page.onLoad(this, options)
    this.loadData()
    this.onShow()
   
  },


  loadData: function() {
    console.log('---------------------')
    var that = this
    var term_id = {
      aid: that.data.id
    }
    getApp().request({
      url: getApp().api.audiovisual.heart_index,
      data: term_id,
      method: 'GET',
      success: function(t) {
        console.log(t)
        if(t.code==0){
          var article = t.data.post_content;
          that.setData({
            nodes: article
          })
          that.setData({
            datails: t.data,
            url: siteinfo.imgUrl
          });
          console.log(siteinfo.imgUrl)
        } 
      },
      complete: function() {
        // http://reignition.shangshan.org.cn/wp-content/uploads/2019/10/443ee38b17a288aec299ea17dbb0130.jpg
      }
    }); 
  },

  getStore: function() {
    console.log('hhhhhhhhhhh')
    let t = this;
    // getStorageSync本地存储 1:true 0:false
    let rules = getApp().core.getStorageSync("rules");
    if (rules){
      t.setData({
        show: true,
        show1: false
      })
    }
  },


  goStroyList: function(e) {
    wx.navigateTo({
      url: '../companys-list/companys-list?id=' + e.currentTarget.dataset.id,
    })

  },

  agreed: function(e) {
    var index = e.currentTarget.dataset.index
    if (index = this.data.indexs) {
      this.setData({
        indexs: 0,
        according: 0
      })
    } else {
      this.setData({
        indexs: 1,
        according: 1
      })
    }
  },

  consentForm:function(e){
    var that=this
    console.log(this.data.indexs)
    var index = e.currentTarget.dataset.index
    if ( !this.data.indexs ) {
      this.setData({
        consent_iconColor: '#d3bfdc',
        indexs: 1,
        consent_btn_color: '#d3bfdc',
        color: '#393939',
        staus: 1
      })
    } else {
      this.setData({
        consent_iconColor: '#CCC',
        indexs: 0,
        consent_btn_color: '#CCC',
        color: '#fff',
        staus: 0
      })
    }
    that.data.staus = that.data.staus
    
  },
  confirm: function () {
    if (this.data.staus){
      this.setData({
        according: 0,
        consent_iconColor: '#CCC',
        indexs: 0,
        consent_btn_color: '#CCC',
        color: '#fff',
        staus: 1
      },2000)
      wx.navigateTo({
        url: '../consultant/consultant',
      })
    }    
    getApp().core.setStorageSync("rules", 1);
  },

  cancel:function(){
    this.setData({
      according: 0,
      consent_iconColor: '#CCC',
      indexs: 0,
      consent_btn_color: '#CCC',
      color: '#fff',
      staus: 0
    })
  },


  appoint1: function () {
    let rules = getApp().core.getStorageSync("rules");

    if (!rules) {
      console.log(1111111)
      this.setData({
        according: 1,
        hidden:false,
      })
    }else{
      console.log(22222)
    wx.navigateTo({
      url: '../consultant/consultant',
    })
    }


    // getApp().core.setStorageSync("rules", 1);

    // if (app.globalData.inx < this.data.inx){
    //   console.log(111111111111)
    //   this.setData({
    //     according: 1,
    //   }) 
    // }else{
      // wx.navigateTo({
      //   url: '../consultant/consultant',
      // })
    // }
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
    console.log(111111111111)
    this.getStore()
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

  },
  
})
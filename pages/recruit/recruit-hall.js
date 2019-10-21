// pages/show-hall/show-hall.js
var siteinfo = require('../../siteinfo.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: ['模块征稿', '志愿者招募'],
    datails: ['嘻嘻', '嘻嘻', '嘻嘻', '嘻嘻', '嘻嘻', '嘻嘻', '嘻嘻', '嘻嘻', '嘻嘻', ],
    selecet: '0',
    tabTit:[{
      termId:"79",
      name: '板块征稿'
    },{
      termId:"80",
        name:'志愿者招募'
    }],
    tabList1:[],
    tabList2:[],
    termId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()
    getApp().page.onLoad(this, options)
  },
  loadData:function(){
    var that = this
    getApp().request({
      url: getApp().api.audiovisual.category,
      // data: cid,
      method: 'GET',
      success: function (t) {
        console.log(t)
        console.log(t.data.terms[0].second)
        t.data.banners.forEach(function(v){
          v.pic_url = siteinfo.picurl + v.pic_url
        })
        that.setData({
          imgUrls:t.data.banners,
          data: t.data.terms,
          // tab1: t.data.terms[0].second[0].second.third,
          // tab2: t.data.terms[0].second[1].second.third,
        })
      },
      complete: function () {

      }
    });
    this.loadZhenggao('79')
  },
  // 获取板块征稿数据
  loadZhenggao(termId){
    let _this=this
    getApp().request({
      url: getApp().api.audiovisual.catalog,
      method: 'GET',
      data: {
        term_id:termId,
        pagename:1,
        pagesize:10,
      },
      success:function(res){
        console.log(res);
        _this.setData({
          tabList1: res.data.list
        })
        // _this.data.tabList1=
      }
    })
  },
  // 获取志愿者招募数据
  loadZhiyuanzhe(termId){
    let _this = this
    getApp().request({
      url: getApp().api.audiovisual.catalog,
      method: 'GET',
      data: {
        term_id: termId,
        pagename: 1,
        pagesize: 10,
      },
      success: function (res) {
        _this.setData({
          tabList2: res.data.list
        })
      }
    })
  },
  onClick:function(e){
    var that=this
    that.data.index = e.currentTarget.dataset.index
    this.data.termId=e.currentTarget.dataset.termid
    that.setData({
      selecet: e.currentTarget.dataset.index
    })
    if(this.data.index===1){
      this.loadZhiyuanzhe(this.data.termId)
    }else{
      this.loadZhenggao(this.data.termId);
    }
  },

  goToDetail:function(e){
    wx.navigateTo({
      url: '../recruit-detail/recruit-detail?id=' + e.currentTarget.dataset.id
    })
  },
  goShowList:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../show-hall-list/show-hall-list?id=' + e.currentTarget.dataset.id +' &name='+e.currentTarget.dataset.name,
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
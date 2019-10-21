// pages/consultant/consultant.js
var app = getApp()
var setinfo = require('../../siteinfo.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    loading: true,
    index: 0,
    selecter: 0,
    pagenum: 1,
    pagesize: 5,
    type: 'default',
    page_count: '',
    title: '加载中...',
    addtabbar: 0,
    scrollY: '',
    show: false,
    // types: [hot, recommend, score],
    tab_content: [{
        title: '综合',
      },
      {
        title: '最热',
      },
      {
        title: '推荐',
      },
      {
        title: '评分',
      },
    ],
    stars: [{
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
  },
  tabbar: function(e) {
    var index = e.currentTarget.dataset.index
    switch (index) {
      case 0:
        this.data.pagenum = 1;
        this.data.loading = true;
        this.data.list = [];
        this.data.type = 'default';
        this.loadDate();
        this.goTop();
        break;
      case 1:
        this.data.pagenum = 1;
        this.data.loading = true;
        this.data.list = [];
        this.data.type = 'hot';
        this.loadDate();
        this.goTop();
        break;
      case 2:
        this.data.pagenum = 1;
        this.data.loading = true;
        this.data.list = [];
        this.data.type = 'recommend';
        this.loadDate();
        this.goTop();
        break;
      case 3:
        this.data.pagenum = 1;
        this.data.loading = true;
        this.data.list = [];
        this.data.type = 'score';
        this.loadDate();
        this.goTop();
        break;
    }
    this.setData({
      selecter: index,
    })
  },

  order: function(e) {
    console.log(e)
    var ids = e.currentTarget.dataset.id
    wx.navigateTo({
      // url: `/pages/reservation-consultation/reservation-consultation?id=${ids}`,
      url: '../reservation-consultation/reservation-consultation?id=' + ids
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //getApp().page.onLoad(this, t)
    this.loadDate();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  loadDate: function(t) {
    wx.showLoading({
      title: '加载中...',
    });
    var that = this;
    var t = {
      pagenum: this.data.pagenum,
      pagesize: this.data.pagesize,
      type: this.data.type,
    };
    getApp().request({
      url: getApp().api.consultantation.consultantation_list,
      data: t,
      method: 'GET',
      success: function(t) {
        console.log(t)

        if (0 == t.code) {
          if (t.data.list == '') {
            that.setData({
              show: true,
            })
          }
          that.data.list = that.data.list.concat(t.data.consultants.list);
          that.data.page_count = t.data.consultants.page_count
          // if (that.data.pagenum >= t.data.consultants.page_count) {
          //   that.data.loading = false;
          // }
          that.setData({
            con_datas: that.data.list,
          })
        } else if (t.code == -3) {
          wx.showToast({
            title: '请先完善个人信息',
            icon: 'none'
          }, 2000)
          setTimeout(function() {
            wx.navigateTo({
              url: '../myselfset/myselfset',
            })
          }, 2000)
        }
        wx.hideLoading();
      },
      complete: function() {

      }

    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.page_count > this.data.pagenum) {
      this.data.pagenum += 1;
      this.loadDate();
    } else {
      wx.showLoading({
        title: '无更多内容...',
      });
      setTimeout(function() {
        wx.hideLoading()
      }, 2000)
    }
  },
  onPageScroll: function(e) {
    console.log(e)
    let scrollTop = e.scrollTop;
    this.data.scrollY = e.scrollTop;
    if (scrollTop >= 150) {
      // this.data.xx = false;
      this.setData({
        addtabbar: 1,
        color: '#000'
      })
    } else {
      this.setData({
        addtabbar: 0
      })
      // this.data.xx = true;
    }
  },
  goTop: function(e) { // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
})
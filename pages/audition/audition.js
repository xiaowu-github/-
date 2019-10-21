// pages/auditions/audition.js
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
    colors: ['#ae9cb2', '#9fc9c8', '#89c299', '#e4b6c0', '#f3c07e'],
    img: ['../../img/images/renewed1.jpg', '../../img/images/renewed2.jpg', '../../img/images/renewed3.jpg', '../../img/images/renewed4.jpg', '../../img/images/renewed5.jpg'],
    seconds: '',
    all: [
      {
        titles1: '同命人的故事，鼓舞我们砥砺前行',
        titles2: '我们的故事',
        titles3: '我们用诗与歌，微笑面对命运的考验',
        titles4: '我们的诗歌与朗诵',
      },
      {
        titles1: '专家学者谈哀伤',
        titles2: '哀伤应对',
        titles3: '缓解哀伤的具体方法',
        titles4: '疗愈方法',
      },
      {
        titles1: '只有思考，我们才明白苦难带给我们的是什么',
        titles2: '苦难与觉醒',
        titles3: '信仰及信念，有了信念才有重生的力量',
        titles4: '信仰与力量',
        titles5: '当明白了无常，就要学会释然，余生从容走',
        titles6: '释怀与前行'
      },
      {
        titles1: '摘选科学从不同角度对生命奥秘的发现',
        titles2: '现代科学对生命的研究与发现',
        titles3: '对生死灵魂的探索与猜想',
        titles4: '关于生命的探索与论证',
      },
      {
        titles1: '国家卫建委、计生委等5部门的相关政策',
        titles2: '政策选录',
        titles3: '历年全人大及政协代表的相关提案与建议',
        titles4: '相关资料',
      },
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (t) {
    var that = this
    getApp().page.onLoad(that, t), t.page_id || (t.page_id = -1),                that.setData({
      options: t
    }), that.loadData(t);

  },

  loadData: function() {
    var that = this
    getApp().request({
      url: getApp().api.audiovisual.audio_category,
      // data: cid,
      method: 'GET',
      success: function(t) {
        console.log(t)

        that.setData({
          datails: t.data,
          second: t.data.second
        })
      },
      complete: function() {

      }
    });
  },

  goRead: function(e) {
    var index = e.currentTarget.dataset.index + 1
    console.log(e)
    wx.navigateTo({
      // url: '../auditions-list/auditions-list?id=' + e.currentTarget.dataset.id
      url: '../auditions-list/auditions-list?id=' + e.currentTarget.dataset.id + '&index=' + index
    })
  },

  goToArticleList: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../auditions-list/auditions-list?id=' + e.currentTarget.dataset.id
      // url: '../auditions-list/auditions-list?id=' + e.currentTarget.dataset.id + '&index=' + index
    })
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

  }
})
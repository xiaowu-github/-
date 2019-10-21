Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    display: false,
    transition: "",
    select: 0,
    isShow: false,
    font:15,
    pagenum: 1,
    pagesize: 20,
    allList:[],
    page_count:"",
    options:"",
    term_id:"",
    canPlay:false,
    pgcolor:"",
    nodes:"",
    innerAudioContext:"",
    content:[
      {
        langa:'前言：',
        zongjie:'有了认知，才有预防',
        contents: '你一定听说过抑郁症，但是，你未必真正了解抑郁症一种相当广泛的认识是：抑郁症是“情绪病”；得了抑郁症的人，是“小心眼”“想不开”“爱钻牛角尖”“意志脆弱”，等等。其实不是。抑郁症就是一种病，有着和其他疾病一样完整的生化过程，其最大特点是自杀率高。世界卫生组织（WHO）报告指出，抑郁症是最能摧残和消磨人类意志的疾病，它对人类生命和财富造成的损失是灾难性的。你一定听说过抑郁症，但是，你未必真正了解抑郁症一种相当广泛的认识是：抑郁症是“情绪病”；得了抑郁症的人，是“小心眼”“想不开”“爱钻牛角尖”“意志脆弱”，等等。其实不是。抑郁症就是一种病，有着和其他疾病一样完整的生化过程，其最大特点是自杀率高。世界卫生组织（WHO）报告指出，抑郁症是最能摧残和消磨人类意志的疾病，它对人类生命和财富造成的损失是灾难性的。你一定听说过抑郁症，但是，你未必真正了解抑郁症一种相当广泛的认识是：抑郁症是“情绪病”；得了抑郁症的人，是“小心眼”“想不开”“爱钻牛角尖”“意志脆弱”，等等。其实不是。抑郁症就是一种病，有着和其他疾病一样完整的生化过程，其最大特点是自杀率高。世界卫生组织（WHO）报告指出，抑郁症是最能摧残和消磨人类意志的疾病，它对人类生命和财富造成的损失是灾难性的。'
      }
    ],

    shuxian:[
      {
        shunx: "q",
      },
      {
        shunx: "q",
      },
      {
        shunx: "q",
      },
      {
        shunx: "q",
      },
      {
        shunx: "q",
      },
      {
        shunx: "q",
      },
      {
        shunx: "q",
      },
      {
        shunx: "q",
      },
    
    ],

    state:'0'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.id = options.id
    this.data.options=options
    this.data.term_id=options.term_id
    this.loadData()
    this.loadMenuData(options.term_id)
  },

  loadData: function () {
    console.log('---------------------')
    var that = this
    var term_id = {
      aid : that.data.id
      }
    getApp().request({
      url: getApp().api.audiovisual.audio_details,
      data: term_id,
      method: 'GET',
      success: function (t) {
        console.log(t)
        var article = t.data.post_content;
        that.setData({ nodes: article.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" ').replace(new RegExp('\r\n','g'),'<br/>') })
        that.setData({
          datails: t.data
        });
      },
      complete: function () {

      }
    });
    
  },
  // 加载目录数据
  loadMenuData(termId){
    let that=this
    getApp().request({
      url: getApp().api.audiovisual.audio_catalog,
      data: {
        term_id: termId,
        pagenum: that.data.pagenum,
        pagesize: that.data.pagesize
      },
      method: 'GET',
      success: function (t) {
        that.data.page_count = t.data.page_count
        that.data.allList = that.data.allList.concat(t.data.list)
        that.setData({
          menuLists: that.data.allList,
        })
      }
    })
  },
  // 上一章
  preArticle(){
    let _this=this
    getApp().request({
      url: getApp().api.audiovisual.previous_article,
      data:{
        aid:_this.data.id,
        term_id:_this.data.term_id
      },
      method: 'GET',
      success:function(t){
        if(t.code==0){
          _this.goToArticle(t.data.ID,_this.data.term_id)
        }else{
          return false;
        }
      }
    })
  },
  // 下一章
  nextArticle(){
    let _this = this
    getApp().request({
      url: getApp().api.audiovisual.next_article,
      data: {
        aid: _this.data.id,
        term_id: _this.data.term_id
      },
      method: 'GET',
      success: function (t) {
        if (t.code == 0) {
          _this.goToArticle(t.data.ID, _this.data.term_id)
        } else {
          return false;
        }
      }
    })
  },
  goToArticle(aid,term_id){
    wx.navigateTo({
      url: '../bookdetails/bookdetails?id=' + aid + '&term_id=' + term_id
    })
  },
  menu: function (e) {
    this.setData({
      select: 0,
    })
    console.log(this.data.display)
    if (this.data.display === true) {
      this.setData({
        display: false,
        transition: "",
        position: ""
      })
    } else {
      this.setData({
        display: true,
        transition: "chapters",
        position: "position: fixed",
        transition2: "",
        position2: "",
      })
    }
  },
  setFont: function (e) {
    // console.log(e)
    this.setData({
      select: 1,
      display: false,
      transition2: "change",
      position2: "position: fixed",
      transition: "",
      position: ""
    })
  },

  layer: function () {
    this.setData({
      transition: "",
      position: "",
      transition2: "",
      position2: "",
    })
  },

  slider2change: function (e) {
    console.log(e)
    console.log(e.detail.value)
    var _this = this;
    _this.data.font = e.detail.value/2
    console.log(_this.data.font)
    var pageData = {}
    for (var i = 1; i < 5; i++) {
      (function (index) {
        pageData['slider' + index + 'change'] = function (e) {
          console.log('slider' + 'index' + '发生 change 事件，携带值为', e.detail.value)
        }
      })(i)
    }
    this.setData({
      font: _this.data.font
    })
  },

  black: function () {
    this.setData({
      pgcolor: "pgcolor"
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
    })
  },
  white: function () {
    this.setData({
      pgcolor: ""
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#d3bfdc',
    })
  },

  // 播放
  lisetIng:function(e){
    console.log(e)
    var that=this
    var mpSrc = e.currentTarget.dataset.mpsrc

    that.registerAudioContext(mpSrc)
    // this.playAudio()
    this.playAudio
      that.setData({
        state: 1,
      })

  },
  // 暂停
  stopIng:function(e){
    var that = this
    // var mpSrc = e.currentTarget.dataset.mpsrc
    this.pauseAudio()
    that.setData({
      state: 0,
    })
  },
  goArticle: function (e) {
    this.destroyAudio()
    let that = this
    wx.navigateTo({
      url: '../bookdetails/bookdetails?id=' + e.currentTarget.dataset.id + '&term_id=' + that.data.term_id
    })
  },
  destroyAudio(){
    this.data.innerAudioContext && this.data.innerAudioContext.destroy();
    this.data.innerAudioContext=""
  },
  registerAudioContext: function (mpSrc) {
    
    var that = this
    if(this.data.innerAudioContext){
      this.playAudio()
      return false;
    }
    wx.showLoading({
      title: '加载中',
    })
    this.destroyAudio()
    this.data.innerAudioContext = wx.createInnerAudioContext()
    // autoplay是否为自动播放
    this.data.innerAudioContext.autoplay = false
    // src 音频地址
    this.data.innerAudioContext.src = mpSrc
    // onPlay监听音频播放事件
    this.data.innerAudioContext.onPlay(() => {
      wx.hideLoading({})
    })
    this.data.innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    this.playAudio()
  },
  playAudio(){
    this.data.innerAudioContext.play();
  },

  stopRegisterAudioContext: function (mpSrc) {
    var that = this
    // const innerAudioContext = wx.createInnerAudioContext()
    // innerAudioContext.autoplay = true
    // innerAudioContext.src = mpSrc
    this.data.innerAudioContext.pause()
    this.data.innerAudioContext.pause(() => {
      console.log('暂持播放')
    })
    this.data.innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  pauseAudio(){
    this.data.innerAudioContext.pause()
  },
  // 滚动到底部加载
  scrollData: function () {
    if (this.data.pagenum < this.data.page_count) {
      this.data.pagenum += 1
      this.loadMenuData(this.data.term_id)
    }
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
    this.destroyAudio()
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
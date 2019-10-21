const app = getApp();

const ROLE_TYPE = {
  AUDIENCE: 'audience',
  PRESENTER: 'presenter'
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    template: 'bigsmall',
    webrtcroomComponent: null,
    roomID: '', // 房间id
    beauty: 0,
    muted: false,
    debug: false,
    frontCamera: true,
    role: ROLE_TYPE.PRESENTER, // presenter 代表主播，audience 代表观众
    userId: '',
    userSig: '',
    sdkAppID: 0,
    isErrorModalShow: false,
    autoplay: true,
    enableCamera: false,
    smallViewLeft: 'calc(100vw - 30vw - 2vw)',
    smallViewTop: '20vw',
    smallViewWidth: '30vw',
    smallViewHeight: '40vw',
    time: {},
    remind_time: '',
    modalCount:1,
    orderNo:"",
    timer:0,
    hdImgList:{}
  },


  /**
   * 监听webrtc事件
   */
  onRoomEvent(e) {
    var self = this;
    switch (e.detail.tag) {
      case 'error':
        if (this.data.isErrorModalShow) { // 错误提示窗口是否已经显示
          return;
        }
        this.data.isErrorModalShow = true;
        wx.showModal({
          title: '提示',
          content: e.detail.detail,
          showCancel: false,
          complete: function() {
            self.data.isErrorModalShow = false;
            self.goBack();
          }
        });
        break;
    }
  },

  /**
   * 切换摄像头
   */
  changeCamera: function() {
    this.data.webrtcroomComponent.switchCamera();
    this.setData({
      frontCamera: !this.data.frontCamera
    })
  },

  /**
   * 开启/关闭摄像头
   */
  onEnableCameraClick: function() {
    let _this=this
    if(this.data.modalCount>1){
      _this.data.enableCamera = !_this.data.enableCamera;
      _this.setData({
        enableCamera: _this.data.enableCamera
      });
      return false;
    }
    wx.showModal({
      title: '提示',
      content: '是否打开摄像头',
      success(res) {
        if (res.confirm) {
          // _this.onEnableCameraClick()
          _this.data.enableCamera = !_this.data.enableCamera;
          _this.setData({
            enableCamera: _this.data.enableCamera
          });
        } else if (res.cancel) {
          // _this.setData({
          //   enableCamera: _this.data.enableCamera
          // });
        }
      }
    })
    this.data.modalCount = this.data.modalCount+1
  },


  /**
   * 设置美颜
   */
  setBeauty: function() {
    this.data.beauty = (this.data.beauty == 0 ? 9 : 0);
    this.setData({
      beauty: this.data.beauty
    });
  },

  /**
   * 切换是否静音
   */
  changeMute: function() {
    this.data.muted = !this.data.muted;
    this.setData({
      muted: this.data.muted
    });
  },
  onIMEvent:function(e){
    switch (e.detail.tag) {
      case 'big_group_msg_notify':
        //收到群组消息
        console.debug(e.detail.detail)
        break;
      case 'login_event':
        //登录事件通知
        console.debug(e.detail.detail)
        break;
      case 'connection_event':
        //连接状态事件
        console.debug(e.detail.detail)
        break;
      case 'join_group_event':
        //进群事件通知
        console.debug(e.detail.detail)
        break;
    }
  },
  /**
   * 是否显示日志
   */
  showLog: function() {
    this.data.debug = !this.data.debug;
    this.setData({
      debug: this.data.debug
    });
  },

  /**
   * 进入房间
   */
  joinRoom: function() {
    // 设置webrtc-room标签中所需参数，并启动webrtc-room标签
    this.setData({
      userID: this.data.userId,
      userSig: this.data.userSig,
      sdkAppID: this.data.sdkAppID,
      roomID: this.data.roomID
    }, () => {
      this.data.webrtcroomComponent.start();
    })
  },

  /**
   * 返回上一页
   */
  goBack() {
    var pages = getCurrentPages();
    if (pages.length > 1 && (pages[pages.length - 1].__route__ == 'pages/Trtc/webrtc-room/room/room')) {
      wx.navigateBack({
        delta: 1
      });
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.data.roomID = options.roomID || '';
    this.data.userId = options.userId;
    this.data.userSig = options.userSig;
    this.data.template = options.template;
    this.data.sdkAppID = options.sdkAppID;
    this.data.orderNo = options.order_no
    this.data.webrtcroomComponent = this.selectComponent('#webrtcroom');

    this.setData({
      // template: options.template
    });
    // 进入轮询
    this.updateStatus(1);
    this.joinRoom();
    //设置提醒时间
    let d = new Date(options.order_time);
    let m = d.getMinutes();
    d.setMinutes(m + 90);
    this.timeDown(d);
    // 动态设置当前页面的标题 房间号+userid
    wx.setNavigationBarTitle({
      title: this.data.roomID + '-' + this.data.userId
    })
    // modal提示是否打开摄像头
    // let _this=this;
  },
// 轮询当前进入用户状态
  updateStatus(type){
    let _this=this
    this.clearTimer()
    this.data.timer=setInterval(()=>{
      _this.commitUserStatus(type)
    },1000);
  },
  clearTimer(){
    this.data.timer && clearInterval(this.data.timer)
  },
  // 提交当前用户在线状态
  commitUserStatus(type){
    let _this=this
    getApp().request({
      url: getApp().api.room.getUserInfo,
      data: {
        order_on: _this.data.orderNo,
        type: type
      },
      method: 'POST',
      success: function (res) {
       _this.setData({
         hdImgList: res.data
       })
      }
    })
  },
  timeDown: function(endDateStr) {
    var that = this
    //结束时间
    var endDate = new Date(endDateStr);
    //当前时间
    var nowDate = new Date();
    //相差的总秒数
    var totalSeconds = parseInt((endDate - nowDate) / 1000);
    //天数
    var days = Math.floor(totalSeconds / (60 * 60 * 24));
    //取模（余数）
    var modulo = totalSeconds % (60 * 60 * 24);
    //小时数
    var hours = Math.floor(modulo / (60 * 60));
    modulo = modulo % (60 * 60);
    //分钟
    var minutes = Math.floor(modulo / 60);
    //秒
    var seconds = modulo % 60;
    //输出到页面
    //document.getElementById(id).innerHTML = "还剩:" + days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
    that.data.time = {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
    that.setData({
      times: that.data.time
    });

    if (days == 0 && hours == 0 && minutes == 30) {
      if (seconds >= 50) {
        wx.showToast({
          title: '您的陪伴时间还剩下' + minutes + '分钟',
          icon: 'none',
        })
      }
    }

    if (days == 0 && hours == 0 && minutes == 0) {
      if (seconds > 0) {
        wx.showToast({
          title: '您的陪伴时间还剩下' + seconds + '秒',
          icon: 'none',
        })
      }else{
        wx.reLaunch({
          url: '/pages/personalcenter/personalcenter',
        })
      }
    }
    //延迟一秒执行自己
    // if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
    //   return false;
    // }
    setTimeout(function() {
      that.timeDown(endDateStr);
    }, 1000)
  },


  handleTime: function(time) {
    var t = this;
    var nt = new Date();
    var d = new Date(time).getTime();
    var n = new Date().getTime();

    //var newtime = nt('Y-m-d H:i:s', d-n);

    var total = (d - n) / 1000;

    var day = parseInt(total / (24 * 60 * 60)); //计算整数天数

    var afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数

    var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数

    var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数

    var min = parseInt(afterHour / 60); //计算整数分

    var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒

    console.log(min);

    t.setData({
      order_time: t
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
    var self = this;
    console.log('room.js onShow');
    // 保持屏幕常亮
    wx.setKeepScreenOn({
      keepScreenOn: true
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log('room.js onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.clearTimer()
    this.commitUserStatus('0')
    console.log('room.js onUnload');
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
    return {
      // title: '',
      path: '/pages/Trtc/webrtc-room/index/index',
      imageUrl: 'https://mc.qcloudimg.com/static/img/dacf9205fe088ec2fef6f0b781c92510/share.png'
    }
  },


  onBack: function() {
    wx.navigateBack({
      delta: 1
    });
  },
})
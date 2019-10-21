var siteinfo = require('../../../../siteinfo.js')
const app = getApp()
const GenerateTestUserSig = require("../debug/GenerateTestUserSig.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomNo: '',
    userID: '',
    tapTime: '',
    template: 'bigsmall',
    userSig: '',
    sdkappid: '',
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的主页', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20,
    imgUrls: [
      '../../../../img/in_room.jpg',
    ],
    time: {},
    order_time: '',
    show_text: '距离开始',
    order_status: 0,
    show_text2: '',
    orderNo:""
  },

  onLoad: function(t) {
    console.log(t);
    this.data.orderNo=t.order
    getApp().page.onLoad(this, t), t.page_id || (t.page_id = -1), this.setData({
      options: t
    });
    this.getServerSige(t.order);
  },

  stars: function() {
    this.registerAudioContext();
  },

  radioChange: function(e) {
    this.setData({
      template: e.detail.value
    })
    console.log('this.data.template', this.data.template)
  },
  // 进入rtcroom页面
  joinRoom: function() {
    var self = this;
    // 防止两次点击操作间隔太快
    var nowTime = new Date();
    if (nowTime - this.data.tapTime < 1000) {
      return;
    }

    self.data.userID = String(self.data.userID);
    var url = `../room/room?roomID=${self.data.roomNo}&template=${self.data.template}&sdkAppID=${self.data.sdkappid}&userId=${self.data.userID}&userSig=${self.data.userSig}&order_time=${self.data.order_time}&order_no=${self.data.orderNo}`;

    wx.navigateTo({
      url: url
    });

    self.setData({
      'tapTime': nowTime
    });
  },
  //Author：大毛
  getServerSige: function(t) {
    let json_data;
    let _this = this;
    getApp().request({
      url: getApp().api.consultantation.start_consulting,
      data: {
        order_on: t
      },
      method: 'POST',
      success: function(res) {
        if (res.code == 0) {
          _this.data.userID = res.data.uid;
          _this.data.roomNo = res.data.room;
          _this.data.userSig = res.data.gensig;
          _this.data.sdkappid = res.data.sdkappid;

          _this.setData({
            roomNo: _this.data.roomNo,
            info: res.data.consultants,
            stime: res.data.stime

          });
          //订单开始时间
          _this.data.order_time = res.data.stime;
          //订单结束时间
          let d = new Date(_this.data.order_time);
          let m = d.getMinutes();
          d.setMinutes(m + 90);
          _this.data.end_time = d;
          //计算当前订单时间的状态
          _this.handleTime(_this.data.order_time, d);

          //订单还未开始的倒计时
          // _this.timeDown(_this.data.order_time)
        } else {
          console.log(res.msg)
        }

      },
      complete: function() {}
    });
    return json_data
  },

  handleTime: function(s, e) {
    let _this = this;
    //当前时间
    let n = new Date().getTime();
    //订单开始时间
    let stats = new Date(s).getTime();
    //订单结束时间
    let end = new Date(e).getTime();

    console.log(n)
    console.log(stats)
    console.log(end)

    if (n < stats) {
      console.log('咨询还未开始');
      this.timeDown(s)
      this.data.order_status = 0
      this.setData({
        order_status: _this.data.order_status
      })
    } else if (n >= stats && n <= end) {
      console.log('咨询正在进行中');
      this.timeDown(e)
      this.setData({
        show_text: '距离结束'
      })
      this.data.order_status = 1
      this.setData({
        order_status: _this.data.order_status
      })
    } else if (n > end) {
      console.log('咨询已经结束');
      this.data.order_status = 2
      this.setData({
        order_status: _this.data.order_status,
        show_text: '陪伴已结束',
        show_text2: '如需预约，请继续下单'
      })
    }
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
    // if (this.data.order_status==0){

    // }
    //延迟一秒执行自己
    if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
      // that.timeDown(that.data.end_time);
      if (this.data.order_status == 0) {
        that.setData({
          order_status: this.data.order_status = 1
        });
      } else {
        return false;
      }
      return false;
    }

    setTimeout(function() {
      that.timeDown(endDateStr);
    }, 1000)
  },

  // onShow: function() {
  //   const innerAudioContext = wx.createInnerAudioContext();
  //   innerAudioContext.autoplay = true;
  //   innerAudioContext.src = "https://ss-c.oss-cn-beijing.aliyuncs.com/background_music/Medwyn%20Goodall%20-%20Ocean%20Meditation.mp3" //音频路径
  //   innerAudioContext.onPlay(() => {
  //     console.log('开始播放')
  //   });
  //   innerAudioContext.onError(res => {
  //     console.log(rees.errCode)
  //     console.log(res.errMsg)
  //   });
  // }
});
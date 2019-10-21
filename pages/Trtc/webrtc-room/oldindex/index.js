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
    userSig:'',
    sdkappid:'',
      // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的主页', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20, 
	},

  //Author：大毛
  getServerSige: function (t){
    let json_data;
    let _this = this;
    getApp().request({
      url: getApp().api.consultantation.start_consulting,
      data: {
        order_on: t
      },
      method:'POST',
      success: function (res) {
        _this.data.userID = res.data.uid;
        _this.data.roomNo = res.data.room;
        _this.data.userSig = res.data.gensig;
        _this.data.sdkappid = res.data.sdkappid;
        _this.setData({
          roomNo: _this.data.roomNo
        });

        console.log(res)



      },
      complete: function () {
      }
    });

    return json_data
  },


	// 绑定输房间号入框
	bindRoomNo: function (e) {
		// var self = this;
		// self.setData({
    //   roomNo: _this.data.roomNo
		// });
	},
	radioChange: function (e) {
		this.setData({
			template: e.detail.value
		})
		console.log('this.data.template', this.data.template)
	},


	// 进入rtcroom页面
	joinRoom: function () {
		var self = this;
		// 防止两次点击操作间隔太快
		var nowTime = new Date();
		if (nowTime - this.data.tapTime < 1000) {
			return;
		}
    self.data.userID = String(self.data.userID);
    var url = `../room/room?roomID=${self.data.roomNo}&template=${self.data.template}&sdkAppID=${self.data.sdkappid}&userId=${self.data.userID}&userSig=${self.data.userSig}`;

		wx.navigateTo({
			url: url
		});

		wx.showToast({
			title: '进入房间',
			icon: 'success',
			duration: 1000
		})

		self.setData({
			'tapTime': nowTime
		});
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (t) {
    console.log(this.data.height)
    console.log(getApp().getUser())
    getApp().page.onLoad(this, t), t.page_id || (t.page_id = -1), this.setData({
      options: t
    });
    
    console.log(this.data.userID)
    this.getServerSige(t.order);
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
		return {
			path: '/pages/Trtc/webrtc-room/index/index',
			imageUrl: 'https://mc.qcloudimg.com/static/img/dacf9205fe088ec2fef6f0b781c92510/share.png'
		}
	}
})
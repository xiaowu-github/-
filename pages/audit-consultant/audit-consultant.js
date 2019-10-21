// pages/audit-consultant/audit-consultant.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str: '',
    sex: '0',
    json_data: {},
    uid: '',
    select: '',
    laber: [],
    laberall: [],
    items: [
      { name: '0', value: '女', checked: true },
      { name: '1', value: '男', },
    ],
    seleteds: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.loadMore(options)
  },

  loadMore(options) {

    var that = this
    that.data.uid = options.id
    var data = {
      uid: options.id
    }
    getApp().request({
      url: getApp().api.consultantation.user_upgrade,
      data: data,
      method: 'GET',
      success: function (t) {
        if (t.code == 0) {
          
          that.setData({
            data: t.data.audit_status,
            cid: t.data.cid
          })
        } else if (t.code == 1) {
          console.log(t)
          that.data.laber = that.data.laber.concat(t.data);
          that.data.laber.forEach(function (v) {
            v.selected = false;
          })
          console.log(that.data.laber)
          that.setData({
            select: t.code,
            laber: that.data.laber
          })
          console.log(that.data.data)
        } else if (t.code == 4) {
          wx.showModal({
            title: '提示',
            content: '请先完善个人信息',
            success: function (res) {
              if (res.confirm) {//这里是点击了确定以后
                wx.navigateTo({
                  url: '../myselfset/myselfset?id=' + options.id,
                })
              } else {//这里是点击了取消以后
                wx.navigateTo({
                  url: '../personalcenter/personalcenter' ,
                })
              }
            }
          })
        }
      },
      complete: function () {

      }
    });
  },

  setWrok: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../reception-time/reception-time?id=' + e.currentTarget.dataset.id,
    })


  },

  index: function () {
    wx.navigateTo({
      url: '../personalcenter/personalcenter'
    })
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.sex = e.detail.value
    this.setData({
      seleted: "选中的value：" + this.data.sex
    })
  },

  checkboxChange(e) {
    let string = "laber[" + e.target.dataset.index + "].selected"

    this.setData({
      [string]: !this.data.laber[e.target.dataset.index].selected
    })
    // it代表的是laber数组中 其中的某一项json数据
    this.data.str = String(this.data.laber.filter(it => it.selected).map(it => it.id))
  },

  btnSubimt: function (e) {
    var that = this
    console.log(e)
    var data = {
      uid: that.data.uid,
      // name: e.detail.value.nikname,
      // age: e.detail.value.age,
      // sex: that.data.sex,
      // telephone: e.detail.value.phonenumber,
      // tag_id: that.data.str,
    }
    wx.showModal({
      title: '提示',
      content: '申请成为陪伴者需要您有相同的同命经历和丰富的咨询经验',
      success: function (res) {
        if (res.confirm) {
          getApp().request({
            url: getApp().api.consultantation.apply_consultancy,
            data: data,
            method: 'POST',
            success: function (t) {
              if (t.code == 0) {
                wx.navigateTo({
                  url: '/pages/audit-consultant/audit-consultant',
                })
              }
            },
            complete: function () {
            }
          });
        } else if (res.cancel) {
        }
      }
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
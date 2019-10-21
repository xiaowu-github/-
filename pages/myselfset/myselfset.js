// pages/myselfset/myselfset.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    more: [
      {
        a: '昵称'
      },
      {
        a: '天使家园'
      },
      {
        a: '我的投稿'
      },

    ],
    items: [
      { name: '0', value: '女', checked: true },
      { name: '1', value: '男', },
    ],
    introduction: "",
    safe_phone: '',
    laber: [],
    region: [],
    customItem: '全部',
    sex: '0',
    address: '',
    str: '',
    tag_lists: [],
    // choose1: '请选择',
    choose: '请选择',
    value: '',
    text: '获取验证码',
    date: '1968-01-01',
    timer: '',//定时器名字
    // countDownNum: '60'//倒计时初始值
    boolean: true,
    phonenumbe: "",
    nikname: '',
    obtain: '',
    datas:'1968-01-01',
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadmore(options)
    console.log(this.data.sex)
    console.log(options)
  },

  bindRegionChange: function (e) {
    var that = this
    that.data.address = String(e.detail.value)
    console.log('picker发送选择改变，携带值为', String(e.detail.value));
    this.setData({
      region: e.detail.value,
      choose: ' '
    })
  },
  // 选择年龄
  bindDateChange: function (e) {
    this.data.datas = e.detail.value
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      choose1: ' '
    })
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.sex = e.detail.value
    let value = e.detail.value;
    this.setData({
      seleted: "选中的value：" + value
    })
  },

  postinfo: function (e) {

    var that = this;
    that.data.phonenumbe = e.detail.value.phonenumbe
    that.data.nikname = e.detail.value.nikname
    that.data.obtain = e.detail.value.obtain

    console.log(e.detail.value.phonenumber)
    if (!e.detail.value.nikname) {
      wx.showToast({
        title: '昵称不能为空',
        icon: 'none'
      })
      return false;
    }


    if (that.data.datas == '') {
      wx.showToast({
        title: '生日不能为空',
        icon: 'none'
      })
      return false;
    }

    if (!that.data.address) {
      wx.showToast({
        title: '地区不能为空',
        icon: 'none'
      })
      return false;
    }
    if (e.detail.value.phonenumber == '') {
      wx.showToast({
        title: '电话号码不能为空',
        icon: 'none'
      })
      return false;
    }

    if (!e.detail.value.obtain) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none'
      })
      return false;
    }


    if (!that.data.safe_phone) {
      wx.showToast({
        title: '紧急联系人不能为空',
        icon: 'none'
      })
      return false;
    }

    if (that.data.safe_phone == e.detail.value.phonenumber) {
      wx.showToast({
        title: '紧急联系人号码不能与自己的联系方式相同',
        icon: 'none'
      })
      return false;
    }


    if (!that.data.introduction) {
      wx.showToast({
        title: '简介不能为空',
        icon: 'none'
      })
      return false;
    }


    if (!that.data.str) {
      wx.showToast({
        title: '标签不能为空',
        icon: 'none'
      })
      return false;
    }

    console.log(that.data.introduction)

    var data = {
      nickname: e.detail.value.nikname,
      sex: that.data.sex,
      telephone: e.detail.value.phonenumber,
      address: that.data.address,
      tag_id: that.data.str,
      code: e.detail.value.obtain,
      introduction: that.data.introduction,
      age: that.data.datas,
      safe_phone: e.detail.value.safe_phone
    }
    console.log(that.data.address)
    console.log(that.data.sex)
    getApp().request({
      url: getApp().api.consultantation.user_edit,
      data: data,
      method: 'POST',
      success: function (t) {
        console.log(t)
        if (t.code == 0) {
          wx.showToast({
            title: t.msg,
            icon: 'none'
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../personalcenter/personalcenter',
            })
          }, 2000)

        } else {
          wx.showToast({
            title: t.msg,
            icon: 'none'
          })
        }
      },
      complete: function () {

      }
    });



  },

  loadUserTag: function (arr) {
    console.log(arr)
    var that = this;
    // 获取个人资料
    getApp().request({
      url: getApp().api.consultantation.index,
      // data: data,
      method: 'GET',
      async: true,
      success: function (t) {
        console.log(t)
        arr.forEach(function (val) {
          t.data.tag_id.forEach(function (v) {
            if (v.name == val.name) {
              val.selected = true;
            }
          })
        })
        arr.forEach(function (v) {
          if (!v.selected) {
            v.selected = false;
          }
        })
        console.log(arr)
        that.data.laber = arr;
        that.setData({
          info: t.data,
          laber: that.data.laber
        })
        console.log(that.data.laber.selected)

      },

      complete: function () {
      }

    });
  },

  loadmore: function (e) {
    var that = this;
    // 获取标签列表
    getApp().request({
      url: getApp().api.consultantation.tag_list,
      // data: data,
      method: 'GET',
      success: function (t) {
        console.log(t)
        that.loadUserTag(t.data)
      },
      complete: function () {
      }

    });

  },



  checkboxChange(e) {
    console.log(e)
    let string = "laber[" + e.target.dataset.index + "].selected"
    this.setData({
      [string]: !this.data.laber[e.target.dataset.index].selected
    })
    // it代表的是laber数组中 其中的某一项json数据
    this.data.str = String(this.data.laber.filter(it => it.selected).map(it => it.id))
    console.log(this.data.str)

  },

  safePhone: function (e) {
    console.log(e)
    var that = this
    that.data.safe_phone = e.detail.value
  },

  introduction: function (e) {
    console.log(e)
    var that = this
    that.data.introduction = e.detail.value
  },

  expInput: function (e) {
    console.log(e)
    var that = this
    that.data.value = e.detail.value
  },

  obtain: function (t) {
    if (this.data.boolean) {
      var that = this
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (myreg.test(that.data.value)) {
        console.log('1111')
        if (that.data.value.length !== 11) {
          console.log('2222')
          wx.showToast({
            title: '手机号有误',
            icon: 'success',
            duration: 2000
          })
          return false;
        }

        this.setData({
          boolean: false,
          text: '',
        })
        var data = {
          telephone: that.data.value
        }

        that.countDown(),
          getApp().request({
            url: getApp().api.consultantation.sms_code,
            data: data,
            method: 'POST',
            success: function (t) {
              console.log(t)
              if (t.code == 0) {
                wx.showToast({
                  title: t.msg,
                  icon: 'none'
                })
              }
              if (t.code == 1) {
                wx.showToast({
                  title: t.msg,
                  icon: 'none'
                })
              }
            },
            complete: function () {
            }
          });
      }
    }

  },

  countDown: function () {
    console.log('iiii')
    let that = this;
    let countDownNum = 60;//获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.setData({
      timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum,
        })
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 0) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理codes go here
          that.setData({
            boolean: true,
            countDownNum: '',
            text: '获取验证码'
          })
        }
      }, 1000)
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
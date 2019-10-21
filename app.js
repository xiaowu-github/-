var platform = null;
// var siteinfo = require('../../siteinfo.js')
"undefined" != typeof wx && (platform = "wx"), "undefined" != typeof my && (platform = "my");

App({
  globalData: {
    inx:'1'
  },
})

var modules = [ {
    name: "helper",
    file: "./utils/helper.js"
}, {
    name: "const",
    file: "./core/const.js"
}, {
    name: "getConfig",
    file: "./core/config.js"
}, {
    name: "page",
    file: "./core/page.js"
}, {
    name: "request",
    file: "./core/request.js"
}, {
    name: "core",
    file: "./core/core.js"
}, {
    name: "api",
    file: "./core/api.js"
}, {
    name: "getUser",
    file: "./core/getUser.js"
}, {
    name: "setUser",
    file: "./core/setUser.js"
}, {
    name: "login",
    file: "./core/login.js"
}, {
    name: "trigger",
    file: "./core/trigger.js"
}, {
    name: "uploader",
    file: "./utils/uploader.js"
}, {
    name: "orderPay",
    file: "./core/order-pay.js"
} ], args = {
    _version: "2.8.9",
    platform: platform,
    query: null,
  onLaunch: function (options) {
        this.getStoreData();
      if (options.scene == 1007 || options.scene == 1008) {
        this.globalData.share = true
      } else {
        this.globalData.share = false
      };
      //获取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度）
      //这个最初我是在组件中获取，但是出现了一个问题，当第一次进入小程序时导航栏会把
      //页面内容盖住一部分,当打开调试重新进入时就没有问题，这个问题弄得我是莫名其妙
      //虽然最后解决了，但是花费了不少时间
      wx.getSystemInfo({
        success: (res) => {
          this.globalData.height = res.statusBarHeight
        }
      })
    },
  globalData: {
    share: false,  // 分享默认为false
    height: 0,
  },
    onShow: function(e) {
        e.scene && (this.onShowData = e), e && e.query && (this.query = e.query), this.getUser() && this.trigger.run(this.trigger.events.login);
    },
    is_login: !1,
    login_complete: !1,
    is_form_id_request: !0
};

for (var i in modules) args[modules[i].name] = require("" + modules[i].file);

var _web_root = args.api.index.substr(0, args.api.index.indexOf("/index.php"));

args.webRoot = _web_root, args.getauth = function(t) {
    var s = this;
    if ("my" == s.platform) {
        if (t.success) {
            var e = {
                authSetting: {}
            };
            e.authSetting[t.author] = !0, t.success(e);
        }
    } else s.core.getSetting({
        success: function(e) {
            console.log(e), void 0 === e.authSetting[t.author] ? s.core.authorize({
                scope: t.author,
                success: function(e) {
                    t.success && (e.authSetting = {}, e.authSetting[t.author] = !0, t.success(e));
                }
            }) : 0 == e.authSetting[t.author] ? s.core.showModal({
                title: "是否打开设置页面重新授权",
                content: t.content,
                confirmText: "去设置",
                success: function(e) {
                    e.confirm ? s.core.openSetting({
                        success: function(e) {
                            t.success && t.success(e);
                        },
                        fail: function(e) {
                            t.fail && t.fail(e);
                        },
                        complete: function(e) {
                            t.complete && t.complete(e);
                        }
                    }) : t.cancel && s.getauth(t);
                }
            }) : t.success && t.success(e);
        }
    });
}, args.getStoreData = function() {
    var s = this, e = this.api, o = this.core;
    s.request({
        url: e.default.store,
        success: function(t) {
            0 == t.code && (o.setStorageSync(s.const.STORE, t.data.store), o.setStorageSync(s.const.STORE_NAME, t.data.store_name), 
            o.setStorageSync(s.const.SHOW_CUSTOMER_SERVICE, t.data.show_customer_service), o.setStorageSync(s.const.CONTACT_TEL, t.data.contact_tel), 
            o.setStorageSync(s.const.SHARE_SETTING, t.data.share_setting), s.permission_list = t.data.permission_list, 
            o.setStorageSync(s.const.WXAPP_IMG, t.data.wxapp_img), o.setStorageSync(s.const.WX_BAR_TITLE, t.data.wx_bar_title), 
            o.setStorageSync(s.const.ALIPAY_MP_CONFIG, t.data.alipay_mp_config), o.setStorageSync(s.const.STORE_CONFIG, t.data), 
            setTimeout(function(e) {
                s.config = t.data, s.configReadyCall && s.configReadyCall(t.data);
            }, 1e3));
        },
        complete: function() {}
    });
};

var app = App(args);
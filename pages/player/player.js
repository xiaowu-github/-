//index.js
//获取应用实例
const bgMusic = wx.createInnerAudioContext()
const app = getApp()
//动画
var audioAnimation;
Page({
  data: {
    id:'',
    display:false,
    transition:"",
    select:0,
    isShow:false,
    position: '',
    index: '2',
    title_list: [
      {
      name: 'Anmber',
      time: '2019-1-1',
      title: '元宝妈妈：拇指姑娘',
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
      id: 0,
      img: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    }, {
      name: 'Anmber',
      time: '2019-1-1',
      src: 'http://www.ytmp3.cn/down/56773.mp3',
      title: '元宝妈妈：《格林童话》拇指姑娘',
      img: '../../img/Rotation_chart.jpg',
      id: 1
    }, {
      name: 'Anmber',
      time: '2019-1-1',
      src: 'http://www.ytmp3.cn/down/56778.mp3',
      title: '《格林童话》 元宝妈妈：《格林童话》拇指姑娘元宝妈妈：《格林童话》拇指姑娘',
      img: '../../img/x.jpg',
      id: 2
    }, {
      name: 'Anmber',
      time: '2019-1-1',
      src: 'http://www.ytmp3.cn/down/32476.mp3',
      title: '拇指姑娘',
      img: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      id: 3
    }, {
      name: 'Anmber',
      time: '2019-1-1',
      src: 'http://www.ytmp3.cn/down/56778.mp3',
      title: '元宝妈妈',
      img: '../../img/Rotation_chart.jpg',
      id: 4
    }, {
      name: 'Anmber',
      time: '2019-1-1',
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
      title: '元宝妈妈拇指姑娘',
      img: '../../img/x.jpg',
      id: 5
    }, {
      name: 'Anmber',
      time: '2019-1-1',
      src: 'http://www.ytmp3.cn/down/56778.mp3',
      title: '《格林童话》拇指姑娘',
      img: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      id: 6
    }, {
      name: 'Anmber',
      time: '2019-1-1',
      src: 'http://www.ytmp3.cn/down/32476.mp3',
      title: '元宝妈妈：《格林童话》拇指姑娘',
      img: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      id: 7
    },],
    video: [{
      title: "标题标题标题标题标题"
    },
    {
      title: "标题标题标题标题标题"
    }
    ],
    article: [{
      articles: "标题标题标题标题标题标题"
    }, {
      articles: "标题标题标题标题标题标题"
    },
    ],
    voice_data:[
      {
        voice_nama: "书名书名书名书",
        voice_zz: "作者",
      },
      {
        voice_nama: "书名书名名书名",
        voice_zz: "作者",
      },
      {
        voice_nama: "书名书名书v名",
        voice_zz: "作者",
      }
    ],

    chapter:[
      {
        big_chapter: '第一大章节',
        samll_chapter: [{
          chapter: '第一小章节',
          chapter1: '第一小章节',
          chapter2: '第一小章节',
          chapter3: '第一小章节',
          chapter4: '第一小章节',
        }]
      },
      {
        big_chapter: '第二大章节',
        samll_chapter: [{
          chapter: '第二小章节',
          chapter1: '第二小章节',
          chapter2: '第二小章节',
          chapter3: '第二小章节',
          chapter4: '第二小章节',
        }]
      }, {
        big_chapter: '第三大章节',
        samll_chapter: [{
          chapter: '第三小章节',
          chapter1: '第三小章节',
          chapter2: '第三小章节',
          chapter3: '第三小章节',
          chapter4: '第三小章节',
        }]
      },
      {
        big_chapter: '第三大章节',
        samll_chapter: [{
          chapter: '第三小章节',
          chapter1: '第三小章节',
          chapter2: '第三小章节',
          chapter3: '第三小章节',
          chapter4: '第三小章节',
        }]
      },
    ],

    // 默认动态高度
    heighTrue: true,
    // 底部弹窗动画
    showModalStatus: false,
    //列表弹窗显隐
    show: 'none',
    //播放开关
    isOpen: false,
    //正在播放时长
    starttime: '00:00',
    //总时长
    duration: '00:00',
    //音乐是不是在播放 
    music_on: true,
    //显示的时间  
    music_playing: false,
  },
  onLoad: function (options) {
    console.log(options)
    var that = this
    // 获取应的音频
    that.s_p()
    this.data.id = options.id
    this.loadData()
  },

  loadData: function () {
    console.log('---------------------')
    var that = this
    var term_id = {
      aid: that.data.id
    }
    getApp().request({
      url: getApp().api.audiovisual.audio_details,
      data: term_id,
      method: 'GET',
      success: function (t) {
        console.log(t)
        that.setData({
          datails: t.data,
        })
      },
      complete: function () {

      }
    });
  },


  writeComment:function(){
    wx.navigateTo({
      url: '../writepl/writepl',
    })
  },

  player: function () {
    wx.navigateTo({
      url: '../player/player',
    })
  },

  //上
  play_shang: function () {
    var that = this
    var id = parseInt(this.data.index)
    var num = id - 1
    if (id - 1 < 0) {
      wx.showToast({
        title: '已是第一个',
      })
    } else {
      this.setData({
        music_on: false,
        index: num,
        'color': '#0b68f3',
        'clickId': num,
        src: '',
        duration: '',
      })
      that.s_p()
    }
  },
  // 下
  play_xia: function () {
    // console.log(this.data.title_list)
    var that = this
    var id = parseInt(this.data.index)
    var num = id + 1

    if (id + 1 > this.data.title_list.length - 1) {
      wx.showToast({
        title: '已是最后一个',
      })
    } else {
      this.setData({
        music_on: false,
        index: num,
        'color': '#0b68f3',
        'clickId': num,
        src: '',
        duration: '',
      })
      that.s_p()
    }
  },
  // 视频获取
  s_p: function () {
    var that = this
    //(src音频名字)
    var src = this.data.title_list[this.data.index].src
    //(图片音频名字)
    var img = this.data.title_list[this.data.index].img
    //(标题音频名字)
    var title = this.data.title_list[this.data.index].title

    var name = this.data.title_list[this.data.index].name
    this.setData({
      'color': '#0b68f3',
      'clickId': this.data.index,
      src: src,
      img: img,
      title: title,
      name: name
    })
    that.listenerButtonPlay()
  },
  // 点击列表切换
  play_list: function (e) {
    // console.log(e)
    var that = this
    var id = e.target.id
    that.setData({
      'color': '#0b68f3',
      'clickId': id,
      index: id,
      display_rue: 'block',
    });
    if (this.data.src == '') {
      that.s_p()
      that.setData({
        'color': '#0b68f3',
        'clickId': id,
        index: id,
        display_rue: 'block',
      });
    } else {
      that.listenerButtonPlay()
      that.setData({
        'color': '#0b68f3',
        'clickId': id,
        index: id,
        display_rue: 'block',
        src: ''
      });
    }
  },
  //弹窗显示
  showModal: function () {
    var that = this
    this.setData({
      show: 'block'
    })
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true,
      heighTrue: false,
      ball_height: 1,
      show: 'block'
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏
  hide: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false,
        heighTrue: true,
        ball_height: 2,
        show: 'none',
      })
    }.bind(this), 200)
  },
  // 播放
  listenerButtonPlay: function (e) {
    var that = this
    //bug ios 播放时必须加title 不然会报错导致音乐不播放 
    // console.log(this.data.index)
    var sec = this.data.src
    bgMusic.title = '此时此刻'
    bgMusic.epname = '此时此刻'
    bgMusic.src = that.data.src;
    this.data.music_on = true;
    this.data.music_playing = true;
    bgMusic.play(); //图片添加css样式，旋转样式   
    this.setData({
      music_on: true,
      music_playing: this.data.music_playing,
    })
    bgMusic.onTimeUpdate(() => {
      //bgMusic.duration总时长  bgMusic.currentTime当前进度
      // console.log(bgMusic.currentTime)
      var duration = bgMusic.duration;
      var offset = bgMusic.currentTime;
      var currentTime = parseInt(bgMusic.currentTime);
      var min = "0" + parseInt(currentTime / 60);
      var max = parseInt(bgMusic.duration);
      var sec = currentTime % 60;
      var maxtime = max / 60
      var max_time = parseInt(maxtime);
      var x_maxtime = maxtime - max_time;
      var yu_time = parseInt(x_maxtime * 60)
      if (sec < 10) {
        sec = "0" + sec;
      };
      var starttime = min + ':' + sec; /*  00:00  */
      var time_time = max_time + ':' + yu_time
      that.setData({
        isOpen: true,
        duration: time_time,
        offset: currentTime,
        starttime: starttime,
        max: max,
        changePlay: true,
      })
    })
    // 播放出错
    bgMusic.onError((res) => {
      that.prompt.message('网络出错，稍后再试')
    })
    // 播放结束
    bgMusic.onEnded((res) => {
      // console.log('录音播放结束');
      var that = this
      var id = parseInt(this.data.index)
      var num = id + 1

      if (id + 1 > this.data.title_list.length - 1) {
        wx.showToast({
          title: '已是最后一个',
        })
      } else {
        this.setData({
          music_on: false,
          index: num,
          'color': '#0b68f3',
          'clickId': num,
          src: '',
          duration: '',
        })
        that.s_p()
      }
    })
  },

  
  //暂停播放
  listenerButtonPause() {
    this.data.music_on = true;
    this.data.music_playing = false;
    var that = this
    bgMusic.pause()
    that.setData({
      isOpen: false,
      music_on: this.data.music_on,
      music_playing: this.data.music_playing,
    })
  },
  // 进度条拖拽
  sliderChange(e) {
    var that = this
    var offset = parseInt(e.detail.value);
    bgMusic.play();
    bgMusic.seek(offset);
    that.setData({
      isOpen: true,
    })
  },
  // 页面卸载时停止播放
  // onUnload() {
  //   var that = this
  //   that.listenerButtonStop() //停止播放
  //   console.log("离开")
  // },

  toggle: function () {
    if (this.data.isShow===true){
      this.setData({
        isShow: false,
      })
    }else{
      this.setData({
        isShow: true,
      })
    }
    console.log(this.data.isShow)

  },

  menu:function(e){
    this.setData({
      select:0,
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
        position: "position: fixed"

      })
    }
  },
  forWard: function (e) {
    // console.log(e)
    this.setData({
      select: 1
    })
  },

  layer:function(){
    this.setData({
      display: false,
      transition: "",
      position: ""
    })
  },

  // onLoad:function(){
  //   console.log(this.data.display)
  // }
})
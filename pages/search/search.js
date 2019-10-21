Page({
    data: {
    },
    onLoad: function(t) {
      getApp().page.onLoad(this, t), this.expInput(t);
    },
  expInput:function(t){
    console.log(t)
    this.setData({
      value:t.value,
      boolean:true
    })

  },
  query:function(){

  }
});
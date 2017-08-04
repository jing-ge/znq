const App = getApp()

Page({
	data: {
		userInfo: {},
	},
	onLoad() {
		this.getUserInfo()
	},
	onShow() {
	},
  clickinfo1:function(){
    var url= "../shoucang/shoucang?uid="+this.data.userInfo.id
    wx.navigateTo({
      url: url,
    })
    console.log(url)
  },
  clickinfo2: function () {
    var url = "../zan/zan?uid=" + this.data.userInfo.id
    wx.navigateTo({
      url: url,
    })
    console.log(url)
  },
  clickinfo3: function () {
    var url = "../wodetiezi/wodetiezi?uid=" + this.data.userInfo.id
    wx.navigateTo({
      url: url,
    })
    console.log(url)
  },
  clickinfo4: function () {
    var url = "../xitong/xitong" 
    wx.navigateTo({
      url: url,
    })
  },
  getUserInfo() {
    var that=this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res)
        that.setData({
          "userInfo": res.data
        })
      },
    })
  }
})
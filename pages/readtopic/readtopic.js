// readtopic.js
var Api = require('../../utils/api.js');
var ZnqApi = require('../../utils/znqapi.js');
var app = getApp()

Page({
  data: {
    title: '最新话题',
    latest: [],
    hidden: false,
    userInfo: null
  },
  onPullDownRefresh: function () {
    this.onLoad();
  },
  // 事件处理函数
  redictDetail: function (e) {
    var id = e.currentTarget.id,
      url = '../detail/detail?id=' + id;

    wx.navigateTo({
      url: url
    })
  },
  onLoad: function (options) {
    var that = this;
    console.log(options.id)
    wx.request({
      url: ZnqApi.getContentByTopicId(options.id),
      success: function (res) {
        console.log(res);
        that.setData({
          latest: res.data,
          hidden: true
        })
      }
    })
  }
})
// topic.js
var ZnqApi = require('../../utils/znqapi.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    topicinfo:{},
    hidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTopic();
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
    this.onLoad();
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
  
  },
  getTopic:function (){
    var that = this;
    wx.request({
      url: ZnqApi.getTopic({
      }),
      success: function (res) {
        console.log(res);
        that.setData({
          topicinfo: res.data,
          hidden: true
        })
      }
    })
  },
  readtopic: function (e) {
    var id = e.currentTarget.id,
    url = '../readtopic/readtopic?id=' + id;
    console.log(url);

    wx.navigateTo({
      url: url
    })
  },
})
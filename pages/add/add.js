// add.js
var ZnqApi = require('../../utils/znqapi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: {},
    index:0,
    userInfo:{},
    title:'',
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    this.getTopicName();
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        console.log(res)
        that.setData({
          "userInfo":res.data
        })
      },
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
  
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  clear:function(e){
    console.log(e.detail)
  },
  formSubmit: function (e) {
    var that=this;
    e.detail.value.topicid++;
    var  postdata={
      "uid":this.data.userInfo.id,
      "title": e.detail.value.title,
      "content": e.detail.value.content,
      "topicid": e.detail.value.topicid
    }
    e.detail.value=''
    console.log(postdata)
    wx.request({
      url: ZnqApi.insertContent(),
      method:"post",
      data:postdata,
      success:function(res){
        var id =res.data.id;
        if (id){
          wx.showToast({
            title: '上墙成功',
            icon: 'success',
            duration: 2000,
            success:function(){
              that.setData({
                title:'',
                content:'',
                index:0
              })
              var url = '../detail/detail?id=' + id;

              wx.navigateTo({
                url: url
              })
            }
          })
          

        }
      }
    })
  },
  getTopicName: function () {
    var that = this;
    wx.request({
      url: ZnqApi.getTopicName({
      }),
      success: function (res) {
        that.setData({
          array: res.data,
        })
      }
    })
  },
})
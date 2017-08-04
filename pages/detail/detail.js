// detail.js
var ZnqApi = require('../../utils/znqapi.js');

Page({
  data: {
    title: '话题详情',
    mcontent:{},
    comments:{},
    userInfo:{},
    hidden: false
  },
  getContentById: function(id){
    var that = this;
    wx.request({
      url: ZnqApi.getContentById(id),
      success:function (res){
        that.setData({
          mcontent:res.data,
          hidden: true
        })
      }
    })
  },
  getComments:function(id){
    var that = this;
    wx.request({
      url: ZnqApi.getCommentsByContentId(id),
      success: function (res) {
        console.log(res.data)
        that.setData({
          comments: res.data
        })
      }
    })
  },
  formSubmit: function (e) {
    var that = this;
     var postdata = {
       'comment': e.detail.value.comment,
       'uid':this.data.userInfo.id,
       'con_id': this.data.mcontent.id
     }
     wx.request({
       url: ZnqApi.insertComment(),
       method:'post',
       data:postdata,
       success:function (res){
         var id = res.data.id;
         if (id) {
           wx.showToast({
             title: '回复成功',
             icon: 'success',
             duration: 2000,
             success: function () {
               wx.redirectTo({
                 url: '../detail/detail?id=' + that.data.mcontent.id
               })
             }
           })
         }
       }
     })
     console.log(postdata)
  },
  getUserInfo:function(){
    var that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          "userInfo": res.data
        })
      },
    })
  },
  onLoad: function (options) {
    this.setData({
      hidden: false
    })
    this.getContentById(options.id);
    this.getComments(options.id);
    this.getUserInfo();
  }
})

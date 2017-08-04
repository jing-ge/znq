 // latest.js
var ZnqApi = require('../../utils/znqapi.js');
var app = getApp()

Page({
  data: {
    title: '最新话题',
    latest: [],
    hidden: false,
    userInfo:null
  },
  //下啦刷新页面
  onPullDownRefresh: function (e) {
    this.onLoad();
  },
  zan:function(e){
    var uid = this.data.userinfo.id;
    var content_id = e.currentTarget.id;
    var newdata = this.data.latest;
    for (var i = 0; i < newdata.length;i++){
      var item = newdata[i];
      if(content_id==item.id){
        var zanimg = item.zanimg;
        if (item.zanimg =='../../images/zan_on.png'){
          item.zanimg = '../../images/zan.png'
          item.count_zan = item.count_zan -1
          var action = 0;
        }else{
          var action = 1;
          item.zanimg = '../../images/zan_on.png'
          item.count_zan = item.count_zan + 1
        }
      }
    }
    this.setData({
      'latest':newdata
    })
    this.dianzan(content_id, uid, action)
  },
  cang: function (e) {
    var uid = this.data.userinfo.id;
    var content_id = e.currentTarget.id;
    var newdata = this.data.latest;
    for (var i = 0; i < newdata.length; i++) {
      var item = newdata[i];
      if (content_id == item.id) {
        var shoucangimg = item.shoucangimg;
        if (item.shoucangimg == '../../images/shoucang_on.png') {
          item.shoucangimg = '../../images/shoucang.png'
          item.count_shoucang = item.count_shoucang - 1
          var action = 0;
        } else {
          var action = 1;
          item.shoucangimg = '../../images/shoucang_on.png'
          item.count_shoucang = item.count_shoucang + 1
        }
      }
    }
    this.setData({
      'latest': newdata
    })
    this.shoucang(content_id, uid, action)
  },
  //查看内容跳转
  redictDetail: function (e) {
    var id = e.currentTarget.id,
      url = '../detail/detail?id=' + id;

    wx.navigateTo({
      url: url
    })
  },
  getContentByUserId:function (uid){
    var that = this;
    wx.request({
      url: ZnqApi.getContentByUserId(uid),
      success: function (res) {
        that.setData({
          latest: res.data,
          hidden: true
        })
      }
    })
  },
  dianzan: function (content_id, uid, action){
    var that=this;
    
    if(action){
      wx.request({
        url: ZnqApi.dianzan(content_id, uid, action),
        success: function (res) {
          if (res.data) {
            wx.showToast({
              title: '点赞成功',
              icon: 'success',
              duration: 2000,
            })
          } else {
            wx.showToast({
              title: '点赞失败',
              icon: 'fail',
              duration: 2000,
            })
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '点赞失败',
            icon: 'fail',
            duration: 2000,
          })
        }
      })
    }else{
      wx.request({
        url: ZnqApi.dianzan(content_id, uid, action),
        success: function (res) {
          if (res.data) {
            wx.showToast({
              title: '取消点赞成功',
              icon: 'success',
              duration: 2000,
            })
          } else {
            wx.showToast({
              title: '点赞失败',
              icon: 'fail',
              duration: 2000,
            })
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '取消点赞失败',
            icon: 'fail',
            duration: 2000,
          })
        }
      })
    }
    
  },
  shoucang: function (content_id, uid, action) {
    var that = this;

    if (action) {
      wx.request({
        url: ZnqApi.shoucang(content_id, uid, action),
        success: function (res) {
          console.log(ZnqApi.shoucang(content_id, uid, action))
          if (res.data) {
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration: 2000,
            })
          } else {
            wx.showToast({
              title: '收藏失败',
              icon: 'fail',
              duration: 2000,
            })
          }
        },
        fail: function (res) {
          console.log(ZnqApi.shoucang(content_id, uid, action))
          wx.showToast({
            title: '收藏失败',
            icon: 'fail',
            duration: 2000,
          })
        }
      })
    } else {
      wx.request({
        url: ZnqApi.shoucang(content_id, uid, action),
        success: function (res) {
          console.log(ZnqApi.shoucang(content_id, uid, action))
          if (res.data) {
            wx.showToast({
              title: '取消收藏成功',
              icon: 'success',
              duration: 2000,
            })
          } else {
            wx.showToast({
              title: '取消收藏失败',
              icon: 'fail',
              duration: 2000,
            })
          }
        },
        fail: function (res) {
          console.log(ZnqApi.shoucang(content_id, uid, action))
          wx.showToast({
            title: '取消收藏失败',
            icon: 'fail',
            duration: 2000,
          })
        }
      })
    }

  },
  onLoad: function () {
    var that = this;

    app.getUserInfo(function (userInfo) {
      //更新数据
      wx.request({
        url: ZnqApi.addUser({}),
        method: 'post',
        data: { userInfo },
        success: function (res) {
          wx.setStorage({
            key: "userInfo",
            data: res.data
          })
          that.setData({
            userInfo: userInfo
          })
        }
      })
      
    })
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res)
        that.setData({
          "userinfo": res.data
        })
        console.log(res.data.id)
        that.getContentByUserId(res.data.id);
      },
    })
  }
})
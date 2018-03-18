//app.js
var config = require('./pages/common/config')
App({
  globalData: {
    userInfo: null,
    code : null
  },
  onLaunch: function () {
    // 获取用户信息
    this.getUserInfo()
  },
  getUserInfo:function(cb){
    var that = this;
    wx.getStorage({
      key: 'cookies',
      complete: function (res) {
        if (res == null || res.data == undefined) {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
        else {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          });
        }
      },
    });
  },
  onShow: function () {
    console.log('app onshow')
  },
  onHide: function() {
    console.log('app onHide');
  }
})
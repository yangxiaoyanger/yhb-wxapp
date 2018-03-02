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
      success: function (res) {
        console.log('cookies ', res)
        if (res == null) {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
        else {
          wx.login({
            success: function (re) {
              if (re.code) {
                wx.request({
                  url: config.login,
                  method: "POST",
                  data: { js_code: re.code },
                  complete: function (res) {
                    console.log(res, 888)
                    // if (res.data.code == 'E105') {
                    //   wx.redirectTo({
                    //     url: '/pages/login/login'
                    //   })
                    // }
                    // that.globalData.code = re.code
                  }
                })

                that.globalData.code = re.code
                wx.getUserInfo({
                  success: function (res) {
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)
                  }
                })
              }
              else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          })
        }

      },
    })



  }
  
})
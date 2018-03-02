var app = getApp()
var config = require('../common/config')
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 60,
    userName: '',
    userPwd: ""
  },
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  passWdInput: function (e) {
    this.setData({
      userPwd: e.detail.value
    })
  },
  getCode: function (options) {
    wx.request({
      url: config.getCode,
      method: "POST",
      data: { phone_num: this.data.userName},  
      complete: function (res) {
        
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
      }
    })


    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  getVerificationCode() {
    this.getCode();
    var that = this
    that.setData({
      disabled: true
    })
  },
  push:function(e)
  {
    var user_id = this.data.userName;
    var code = this.data.userPwd;
    var js_code = app.globalData.code;
    wx.request({
      url: config.login,
      method: "POST",
      data: { user_id: user_id, code: code, js_code: js_code },
      header: {
        'content-type': 'application/json' ,
        'Set-Cookie': js_code
        
      },
      complete: function (res) {
        if (res.data.code == "S200") {
          var cookies = res.header["Set-Cookie"];
          wx.setStorageSync('cookies', cookies);
          wx.switchTab({
            url: '../index/index'
          });
        }
        else
        {
          // res.data.error_msg
          wx.showToast({
            title: '失败',
            icon: 'fail',
            duration: 2000,
            mask: true
          })
        }

        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
  }
})
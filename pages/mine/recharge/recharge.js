var app = getApp();
var config = require('../../common/config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:"",
    list:[]
  },

  push:function()
  {
    console.log("money"+this.data.money);

    var that = this
    wx.getStorage({
      key: 'cookies',
      success: function (res) {
        if (res == null) {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
        else {
          console.log(res);
          that.getData(res.data,that.data.money)
        }

      },
    })


    // 检测是否存在用户信息
    if (app.globalData.userInfo != null) {
      that.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      app.getUserInfo()
    }
    typeof cb == 'function' && cb()


  }
  ,
  num: function (e) {
    this.setData({
      money: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (cb) {
    
  },
  getData: function (res,money) {
    var that = this
    wx.requestPayment({
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success': function (res) {
        console.log(res)
      },
      'fail': function (res) {
      }
    })
    // wx.request({
    //   url: config.recharge,
    //   method: "POST",
    //   data: { pay_type: 'WeiXinPay', fee:money },
    //   header: {
    //     'content-type': 'application/json',
    //     'Cookie': res,

    //   },
    //   complete: function (re) {

    //     if (re.data.code == "S200") {
    //       console.log("1111" + re.data);
          
          
    //     } else if (re.data.code == 'E102') {
    //       wx.redirectTo({
    //         url: '/pages/login/login'
    //       })
    //     }
    //   }
    // })



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
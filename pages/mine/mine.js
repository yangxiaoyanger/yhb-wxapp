// pages/mine/mine.js
var app = getApp();
var config = require('../common/config');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cash_account: "",
    baitiao_account: "",
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (cb) {
    console.log('进入我的页面')
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
    console.log('onshow');
    var that = this;
    var cookies = wx.getStorageSync('cookies');
    that.setData({
      userInfo: app.globalData.userInfo
    });
    wx.request({
      url: config.getuserinfo,
      method: "GET",
      header: {
        'content-type': 'application/json',
        'Cookie': cookies
      },
      complete: function (re) {
        if (re.data.code == "S200") {
          that.setData({
            cash_account: re.data.cash_account,
            baitiao_account: re.data.baitiao_account
          })
        } else if (re.data.code == 'E102') {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
    })
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

  xianjin:function()
  {

    wx.navigateTo({
      url: './detailed/detailed',
    })
  },
  xiaofei:function(){
    wx.navigateTo({
      url: './record/record',
    })
  },
  yijian: function () {
    wx.navigateTo({
      url: './idea/idea',
    })
  },
  zhanghu: function () {
    wx.navigateTo({
      url: './detailed/detailed',
    })
    
  },
  youhui: function () {
    wx.navigateTo({
      url: './discount/discount',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
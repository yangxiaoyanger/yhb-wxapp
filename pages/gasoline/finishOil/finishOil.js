// pages/gasoline/finishOil/finishOil.js
var app = getApp();
var config = require('../../common/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total_cost: '',
    charging_vol: '',
    cash_account: '',
    charging_time: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({ order_id: options.order_id });
    var cookies = wx.getStorageSync('cookies');
    wx.request({
      url: config.loadOrderStatus + '&order_id=' + options.order_id,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Cookie': cookies,
      },
      complete: function (res) {
        if (res.data.code == "S200") {
          that.setData({
            total_cost: res.data.total_cost,
            charging_vol: res.data.charging_vol,
            cash_account: res.data.cash_account,
            charging_time: res.data.charging_time
          })
        }
      }
    });
    typeof cb == 'function' && cb()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  finished: function () {
    wx.switchTab({
      url: '/pages/index/index'
    })
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
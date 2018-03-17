// pages/gasoline/oiling/oiling.js
var app = getApp();
var config = require('../../common/config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    station_name: '',// 加油站站名字
    address: '',// 地址
    pic_url: '',
    charging_amount: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('进入正在加油页面')
    var that = this;
    let cookies = wx.getStorageSync('cookies');
    wx.request({
      url: config.load_charging_order,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Cookie': cookies,
      },
      complete: function (res) {
        console.log('oiling页面查询正在加油的订单: ', res.data)
        if (res.data.code == "S200") {
          that.setData({
            station_name: res.data.order_info.station_name,
            address: res.data.order_info.address,
            pic_url: res.data.order_info.pic_url,
            charging_amount: res.data.order_info.charging_amount,
          })
        }
      }
    });
    let order_id = options.order_id;
    var interval = setInterval(function () {
      wx.request({
        url: config.loadOrderStatus + '&order_id=' + order_id,
        method: 'GET',
        header: {
          'content-type': 'application/json',
          'Cookie': cookies,
        },
        complete: function (res) {
          console.log('oiling页面查询订单  ' + order_id + '的 result is :', res.data)
          if (res.data.code == "S200") {
            if (res.data.status == 2) {
              clearInterval(interval);
              wx.setStorageSync('order_id', null);
              console.log("订单完成，状态变成 ", res.data.status)
              wx.reLaunch({
                url: '../finishOil/finishOil?order_id=' + order_id
              });
            } else if (res.data.status == 3) {
              clearInterval(interval);
              console.log("订单结束，状态变成 ", res.data.status);
              wx.reLaunch({
                url: '../finishOil/finishOil?order_id=' + order_id
              });
            }

          }
        }
      });
    }, 5000);
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
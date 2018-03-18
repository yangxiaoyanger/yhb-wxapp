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
    var that  = this;
    console.log('进入正在加油页面 onLoad');
    var cookies = wx.getStorageSync('cookies');
    if (!options.order_id) {
      wx.request({
        url: config.startCharging + '&gun_id=' + options.gun_id + '&charging_amount=' + options.charging_amount,
        method: 'GET',
        header: {
          'content-type': 'application/json',
          'Cookie': cookies,
        },
        complete: function (res) {
          console.log('点击开始加油按钮 result: ', res.data)
          if (res.data.code == "S200") {
            that.loadChargingOrder();
            console.log('startCharging:  ' + res.data + '   cookirs: ' + cookies);
            let order_id = res.data.order_id;
            wx.setStorageSync('order_id', order_id);
            that.loadOrderStatus(order_id);
          }
          else {
            wx.showToast({
              title: res.data.error_msg + ',请联系客服',
              icon: 'none'
            });
          }
        }
      });
    }
    else {
      that.loadChargingOrder();
      that.loadOrderStatus(options.order_id);
    }
  },
  loadChargingOrder: function () {
    var that = this;
    var cookies = wx.getStorageSync('cookies');
    wx.request({
      url: config.load_charging_order,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Cookie': cookies,
      },
      complete: function (res) {
        if (res.data.code == "S200") {
          console.log('oiling页面查询正在加油的订单: ', 'config.load_charging_order res', config.load_charging_order, res.data)

          that.setData({
            station_name: res.data.order_info.station_name,
            address: res.data.order_info.address,
            pic_url: res.data.order_info.pic_url,
            charging_amount: res.data.order_info.charging_amount,
          })
        }
      }
    });
  },
  loadOrderStatus: function (order_id) {
    var cookies = wx.getStorageSync('cookies');
    var interval = setInterval(function () {
      console.log('setInterval里面')
      wx.request({
        url: config.loadOrderStatus + '&order_id=' + order_id,
        method: 'GET',
        header: {
          'content-type': 'application/json',
          'Cookie': cookies,
        },
        complete: function (res) {
          console.log('oiling页面查询订单  config.loadOrderStatus  ' + config.loadOrderStatus, order_id + '的 result is :', res.data);
          console.log('cookies 与 config.loadOrderStatus', cookies, res)
          if (res.data.code == "S200") {
            if (res.data.status == 2) {
              clearInterval(interval);
              wx.setStorageSync('order_id', null);
              console.log("订单完成，状态变成 ", res.data.status)
              wx.redirectTo({
                url: '/pages/gasoline/finishOil/finishOil?order_id=' + order_id
              });
            } else if (res.data.status == 3) {
              clearInterval(interval);
              console.log("订单结束，状态变成 ", res.data.status);
              wx.redirectTo({
                url: '/pages/gasoline/finishOil/finishOil?order_id=' + order_id
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
    console.log('进入正在加油页面 onshow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('进入正在加油页面 onhide')
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
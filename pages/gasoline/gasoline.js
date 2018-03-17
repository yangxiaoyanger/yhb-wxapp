var app = getApp();
var config = require('../common/config');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  click:function()
  {
    var order_id = wx.setStorageSync('order_id');
    if (!order_id) {
      wx.scanCode({
        success: (res) => {
          console.log('点击扫码结果：' + res.result);
          var gun_id = res.result.split('gun_id=')[1];
          if (res.errMsg == 'scanCode:ok') {
            wx.navigateTo({
              url: './gunDetail/gunDetail?gun_id=' + gun_id
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('进入扫码页面')
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
        if (res.data.code == "S200") {
          if (res.data.order_info !== '' && res.data.order_info.order_id) {
            var order_id = res.data.order_info.order_id;
            wx.setStorageSync('order_id', res.data.order_info.order_id);
            console.log('wx.setStorageSync("order_id")  ', res.data.order_info.order_id)
            wx.showModal({
              title: '提示',
              content: '您有未完成订单，请注意查看',
              confirmText: "查看",
              cancelText: "取消",
              success: function (res) {
                console.log(res);
                if (res.confirm) {
                  wx.navigateTo({
                    url: './oiling/oiling?order_id=' + order_id
                  });
                }
              }
            });
          }
          else {
            wx.setStorageSync('order_id', null);
          }
        }
      }
    });
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
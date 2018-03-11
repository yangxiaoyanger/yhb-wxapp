// pages/gasoline/startOil/startOil.js
var app = getApp();
var config = require('../../common/config')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    station_name: '',// 加油站站名字
    address: '',// 地址
    cash_account: 0,//账户余额
    baitiao_account: 0,//白条账户余额
    status: 0, // 状态，0空闲，1正在使用，2冻结，3故障
    pic_url: '',
    gun_id: '',
    price: 0,
    charging_amount: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({ gun_id: options.gun_id });
    var cookies = wx.getStorageSync('cookies');
    wx.request({
      url: config.load_gun_detail + '&gun_id=' + options.gun_id,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Cookie': cookies,
      },
      complete: function (res) {
        if (res.data.code == "S200") {
          that.setData({
            station_name: res.data.station_name,
            address: res.data.address,
            cash_account: res.data.cash_ccount,
            baitiao_account: res.data.baitiao_ccount,
            pic_url: res.data.pic_url,
            price: res.data.price
          })
        }
      }
    });
    typeof cb == 'function' && cb()
  },
  setAccount: function(e) {
    var that = this;
    console.log(that.data.cash_account, e.detail.value)
    if (Number(e.detail.value) > Number(that.data.cash_account)) {
      wx.showModal({
        content: '所填金额超出您的余额，请重新输入',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            that.setData({
              charging_amount: ''
            })
          }
        }
      });
    } else if (Number(e.detail.value) < Number(that.data.price)) {
      wx.showModal({
        content: '所填金额至少应该大于油品价格，请重新输入',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            that.setData({
              charging_amount: ''
            })
          }
        }
      });
    }
    else {
      that.setData({
        charging_amount: e.detail.value
      })
    }
  },
  // startCharging: function () {
  //   wx.navigateTo({
  //     url: '../finishOil/finishOil'
  //   })
    
  // },
  startCharging: function () {
    var that = this;
    console.log('gun_id ' + that.data);
    var cookies = wx.getStorageSync('cookies');
    wx.request({
      url: config.startCharging + '&gun_id=' + that.data.gun_id + '&charging_amount=' + that.data.charging_amount,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Cookie': cookies,
      },
      complete: function (res) {
        if (res.data.code == "S200") {
          console.log('startCharging:  ' + res.data + '   cookirs: ' + cookies);
          let order_id = res.data.order_id;
          wx.setStorageSync('order_id', order_id);
          wx.redirectTo({
            url: '../oiling/oiling?order_id=' + order_id
          });
        }
      }
    });
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
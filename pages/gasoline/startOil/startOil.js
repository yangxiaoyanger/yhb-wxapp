// pages/gasoline/startOil/startOil.js
var app = getApp();
var config = require('../../common/config');

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
    charging_amount: '',
    disabled: false,
    cookies: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('进入开始加油页面')
    var that = this;
    var cookies = wx.getStorageSync('cookies');
    that.setData({ 
      gun_id: options.gun_id,
      cookies: cookies
     });
    
    wx.request({
      url: config.load_gun_detail + '&gun_id=' + options.gun_id,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Cookie': cookies,
      },
      complete: function (res) {
        console.log('获取油枪详情：', res.data)
        if (res.data.code == "S200") {
          that.setData({
            station_name: res.data.station_name,
            address: res.data.address,
            cash_account: res.data.cash_ccount,
            baitiao_account: res.data.baitiao_ccount,
            pic_url: res.data.pic_url,
            price: res.data.price
          })
          if (Number(res.data.cash_ccount) < Number(res.data.price)) {
            wx.showModal({
              content: '您的余额不足，请先充值',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  that.setData({
                    disabled: true
                  })
                }
              }
            });
          }
        }
      }
    });
    typeof cb == 'function' && cb()
  },
  setAccount: function(e) {
    var that = this;
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
      })
    } else {
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
    if (that.data.charging_amount == '') {
      that.data.charging_amount = that.data.cash_account;
    }
    console.log('点击开始加油')
    wx.redirectTo({
      url: '/pages/gasoline/oiling/oiling?&gun_id=' + that.data.gun_id + '&charging_amount=' + that.data.charging_amount
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
    console.log('startOil hide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('startOil onUnload')
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
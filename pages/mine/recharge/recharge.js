var app = getApp();
var config = require('../../common/config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:"",
    rechargeList:[
      {
        recharge: '10000',
        discounted: '送1000'
      },
      {
        recharge: '5000',
        discounted: '送400'
      },
      {
        recharge: '3000',
        discounted: '送200'
      },
      {
        recharge: '1000',
        discounted: '送50'
      },
      {
        recharge: '800',
        discounted: ' '
      },
      {
        recharge: '500',
        discounted: ' '
      }
    ]
  },
  selectMoney: function(e) {
    console.log(e, 77)
    var that = this;
    that.setData({
      money: e.target.dataset.key.recharge
    })
  },

  recharge: function() {
    var that = this;
    var money = that.data.money;
    console.log("money  "+this.data.money);
    
    var cookies = wx.getStorageSync("cookies");
    wx.request({
      url: config.recharge,
      method: "POST",
      data: { pay_type: 'WeiXinPay', fee: money },
      header: {
        'content-type': 'application/json',
        'Cookie': cookies
      },
      complete: function (re) {
        if (re.data.code == "S200") {
          console.log("config.recharge  " + re.data.trade_info);
          wx.requestPayment({
            'timeStamp': re.data.trade_info.timeStamp,
            'nonceStr': re.data.trade_info.nonceStr,
            'package': re.data.trade_info.package,
            'signType': 'MD5',
            'paySign': re.data.trade_info.paySign,
            'success': function (res) {
              wx.redirectTo({
                url: '/pages/mine/detailed/detailed'
              })
            },
            'fail': function (res) {
              console.log("pay fail")
            }
          })

        } else if (re.data.code == 'E102') {
          wx.redirectTo({
            url: '/pages/login/login'
          });
        }
      }
    });
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
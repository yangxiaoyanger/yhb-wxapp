// pages/mine/detailed/detailed.js
var app = getApp();
var util = require('../../../utils/util.js')
var config = require('../../common/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cash_account:"",
    charing_list:[],
    card_charing_list: [],
    showOnlineDetail: true,
    charge_type: 'online'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (cb) {
    var that = this
    var charge_type = cb.charge_type;
    if (charge_type) {
      that.setData({
        charge_type: cb.charge_type,
        showOnlineDetail: false
      })
    }
    wx.getStorage({
      key: 'cookies',
      success: function (res) {
        if (res == null) {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
        else {
          that.getOnlineCharge(res.data)
          that.getCardCharge(res.data)
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
  },
  getOnlineCharge: function (res) {
    var that = this
    wx.request({
      url: config.queryForChargingRecord,
      method: "GET",
      data: { page_number: '1' },
      header: {
        'content-type': 'application/json',
        'Cookie': res,

      },
      complete: function (re) {

        if (re.data.code == "S200") {
          console.log("1111" + re.data.charing_list[0].recharge_time);
          that.setData({
            cash_account: re.data.cash_account
          })
          that.setData({
            charing_list: re.data.charing_list
          })
        } else if (re.data.code == 'E102') {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  },
  getCardCharge: function (res) {
    var that = this;
    var cookies = wx.getStorageSync("cookies");
    wx.request({
      url: config.query_activate_card,
      method: "GET",
      header: {
        'content-type': 'application/json',
        'Cookie': cookies
      },
      complete: function (re) {
        if (re.data.code == "S200") {
          console.log("card charge query list: " + re.data.card_charing_list);
          var card_charing_list = [];
          for (let i = 0; i < re.data.cards.content.length; i++) {
            let item = {};
            item.denomination = (re.data.cards.content[i].denomination / 100).toFixed(2);
            item.activateDate = util.formatTime(new Date (re.data.cards.content[i].activateDate)); 
            item.cardNumber = re.data.cards.content[i].cardNumber;
            card_charing_list.push(item);

          }
          that.setData({
            card_charing_list: card_charing_list
          })
        } else if (re.data.code == 'E102') {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
    })



  },
  onlineCharge: function() {
    var that = this;
    that.setData({
      showOnlineDetail: true
    })
  },
  cardCharge: function () {
    var that = this;
    that.setData({
      showOnlineDetail: false
    })
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
  push:function()
  {
    wx.redirectTo({
      url: '/pages/mine/recharge/recharge',
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
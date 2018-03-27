// pages/mine/card/card.js
var config = require('../../common/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card_number: '',
    card_password: '',
    disabled: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  activate: function () {
    var that = this;
    var cookies = wx.getStorageSync("cookies");
    wx.request({
      url: config.activate_card,
      method: 'POST',
      data: {
        card_number: that.data.card_number,
        card_password: that.data.card_password
      },
      header: {
        'content-type': 'application/json',
        'Cookie': cookies,

      },
      complete: function(re) {
        console.log('激活充值卡：', re.data);
        if (re.data.code == 'S200') {
          wx.showModal({
            title: '提示',
            content: '激活成功！',
            confirmText: "查看",
            cancelText: "取消",
            success: function (res) {
              console.log(res);
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/mine/detailed/detailed?charge_type=card'
                })
              } else {
                console.log('用户点击辅助操作')
              }
            }
          });
        } else {
          wx.showModal({
            title: '',
            content: '卡号密码不正确, 激活失败',
            confirmText: "确定",
            cancelText: "取消",
            success: function (res) {
              if (res.confirm) {
                console.log('点击确定')
                that.setData({
                  card_number: '',
                  card_password: ''
                })
              } else {
                console.log('用户点击辅助操作')
              }
            }
          });
        }
      }
    })
    
  },
  inputCardNumber: function(e) {
    var that = this;
    // this.value = this.value.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    this.setData({
      card_number: e.detail.value.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
    });
    if (that.data.card_number !== '' && that.data.card_password !== '') {
      that.setData({
        disabled: false
      })
    }
  },

  inputPassword: function (e) {
    var that = this;
    this.setData({
      card_password: e.detail.value
    });
    if (that.data.card_number !== '' && that.data.card_password !== '') {
      that.setData({
        disabled: false
      })
    }
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
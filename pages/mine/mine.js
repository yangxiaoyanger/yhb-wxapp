// pages/mine/mine.js
var app = getApp();
var config = require('../common/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cash_account:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (cb) {
    var that = this
    wx.getStorage({
      key: 'cookies',
      success: function (res) {
        if (res == null) {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
        else{
          that.getData(res.data)
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
  getData:function(res)
  {
    var that = this
    wx.request({
      url: config.query,
      method: "GET",
      data: { page_number:'1' },
      header: {
        'content-type': 'application/json',
        'Cookie': res,

      },
      complete: function (re) {

        if (re.data.code == "S200") {
          console.log(re.data);
          that.setData({
            cash_account: re.data.cash_account
          })
        }else if(re.data.code == 'E102')
        {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
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
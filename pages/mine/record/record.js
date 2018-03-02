var app = getApp();
var config = require('../../common/config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    charing_list:[]
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
        else {
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
  getData: function (res) {
    var that = this
    wx.request({
      url: config.record,
      method: "GET",
      data: { page_number: '1' },
      header: {
        'content-type': 'application/json',
        'Cookie': res,

      },
      complete: function (re) {

        if (re.data.code == "S200") {
          console.log("1111" + re.data.charing_list);
  
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
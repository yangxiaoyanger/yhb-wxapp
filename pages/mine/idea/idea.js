var app = getApp();
var config = require('../../common/config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cookies:""
  },
  bindFormSubmit: function (e) {

    var text = e.detail.value.textarea;

    if(text.length<=0)
    {
      wx.showToast({
        title: '请输入内容',
        icon: 'loading',
        duration: 2000
      })
    }
    else
    {

      var that = this
      wx.request({
        url: config.complain,
        method: "POST",
        data: { complain_content: text },
        header: {
          'content-type': 'application/json',
          'Cookie': that.data.cookies,

        },
        complete: function (re) {

          if (re.data.code == "S200") {
            wx.navigateBack({

            })
          } else if (re.data.code == 'E102') {
            wx.redirectTo({
              url: '/pages/login/login'
            })
          }
        }
      })

     
    }
    
  }
  ,
  bindButtonTap: function () {
    // this.setData({
    //   focus: true
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
          that.setData({
            cookies: res.data
          })
        }

      },
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
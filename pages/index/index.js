//index.js
//获取应用实例
var config = require('../common/config')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getLocation({
      success: function(res) {
        wx.request({
          url: config.index,
          method: "POST",
          data: { lat: res.latitude, lon: res.longitude},
          header: {
            'content-type': 'application/json'
            // 'Set-Cookie': js_code

          },
          complete: function (res) {

            if (res.data.code == "S200") {
              that.setData({
                info_list: res.data.info_list
              })
            }
          }


        })

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

  

  wx.getStorage({
    key: 'cookies',
    success: function(res) {
    if(res==null)
    {
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }

    },
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

  pushMap:function(e)
  {
    
    var index = parseInt(e.currentTarget.dataset.index);
    var selectList = this.data.info_list[index];
    wx.navigateTo({
      url: './map/map?selectList=' + JSON.stringify(selectList) ,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
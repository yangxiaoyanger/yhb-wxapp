//index.js
//获取应用实例
var config = require('../common/config')
var app = getApp();
var count = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info_list:[],
    lat: '',
    lon: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("onload index")
    wx.getLocation({
      complete: function (res) {
        that.setData({
          lat: res.latitude,
          lon: res.longitude
        });
        console.log("获取用户警卫队：", res)
        that.getStationList(1, res.latitude, res.longitude);
      }
    });
  },

  getStationList: function (count, lat, lon) {
    var that = this;
    wx.request({
      url: config.index + '&page_number=' + count,
      method: "POST",
      data: { lat: lat, lon: lon },
      header: {
        'content-type': 'application/json'
        // 'Set-Cookie': js_code
      },
      complete: function (res) {
        console.log('获取所有加油站列表：', res)
        if (res.data.code == "S200") {
          that.setData({
            info_list: that.data.info_list.concat(res.data.info_list)
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
    console.log(count)
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
    var that = this;
    count++;
    that.getStationList(count, that.data.lat, that.data.lon);
  },

  pushMap:function(e)
  {
    
    var index = parseInt(e.currentTarget.dataset.index);
    var selectList = this.data.info_list[index];
    console.log(selectList, index, 888)
    wx.navigateTo({
      url: '/pages/index/map/map?selectList=' + JSON.stringify(selectList),
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
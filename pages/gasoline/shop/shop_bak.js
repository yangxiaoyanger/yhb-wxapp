var config = require('../../common/config')
var app = getApp();
Page({
  data: {
    gridList: [
      { enName: 'favorite', zhName: '扫码连接' },
      { enName: 'history', zhName: '输入金额' },
      { enName: 'shake', zhName: '订单确认' },
      { enName: 'gallery', zhName: '加油' },
      { enName: 'setting', zhName: '设置' }
    ],
    skin: '',
    show: 'film_favorite'
  },
  onLoad: function (cb) {
    var that = this
    console.log(app.globalData.userInfo)

    if (app.globalData.userInfo != null) {
      that.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      app.getUserInfo()
    }
    typeof cb == 'function' && cb()
  },
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'skin',
      success: function (res) {
        if (res.data == "") {
          that.setData({
            skin: config.skinList[0].imgUrl
          })
        } else {
          that.setData({
            skin: res.data
          })
        }
      }
    })
  },
  onPullDownRefresh: function () {
    this.onLoad(function () {
      wx.stopPullDownRefresh()
    })
  },
  viewGridDetail: function (e) {
    var data = e.currentTarget.dataset
    wx.navigateTo({
      url: "../" + data.url + '/' + data.url
    })
  },
  viewSkin: function () {
    wx.navigateTo({
      url: "../skin/skin"
    })
  }
})
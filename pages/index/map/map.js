Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    markers:[],
    screenHeight: ''
    //location
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // wx.getSystemInfo({
    //   success: function (res) {
    //    that.setData({
    //      windowHeight: res.windowHeight
    //    })
    //   }
    // })
    var data = JSON.parse(options.selectList) ;
    that.setData({
      info: data
    })

    that.setData({
      markers: [{
        id: "1",
        latitude: data.lat,
        longitude: data.lon,
        width: 15,
        height: 30,
        iconPath: "../../img/location.png",
      }],
    });




  },
  goThere: function() {
    let data = this.data.info;
    wx.openLocation({
      latitude: data.lat, // 纬度，浮点数，范围为90 ~ -90
      longitude: data.lon, // 经度，浮点数，范围为180 ~ -180。
      name: data.name, // 位置名
      address: data.address, // 地址详情说明
      scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
      infoUrl: '333' // 在查看位置界面底部显示的超链接,可点击跳转
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
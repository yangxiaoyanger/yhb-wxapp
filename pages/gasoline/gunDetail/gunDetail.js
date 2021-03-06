// pages/gasoline/gunDetail/gunDetail.js
var app = getApp();
var config = require('../../common/config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    station_name: '',// 加油站站名字
    address: '',// 地址
    cash_account: 0,//账户余额
    baitiao_account: 0,//白条账户余额
    status: 0, // 状态，0空闲，1正在使用，2冻结，3故障
    pic_url: '',
    gun_id: '',
    radioItems: [],
    cookies: ''
  },

  showStatusModel: function () {
    let statusString;
    switch (status) {
      case 1:
        statusString = '正在使用';
        break;
      case 2:
        statusString = '冻结';
        break;
      case 3:
        statusString = '故障';
        break;
      default:
        statusString = '空闲';
    }
    wx.showModal({
      title: "提示",
      content: res.data.message,
      showCancel: false,
      confirmText: "确定"
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('进入油枪页面')
    var that = this;
    var cookies = wx.getStorageSync('cookies');
    that.setData({ 
      gun_id: options.gun_id,
      cookies: cookies
    });
    wx.request({
      url: config.load_gun_detail + '&gun_id=' + options.gun_id,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Cookie': cookies,
      },
      complete: function (res) {
        console.log('油枪详情页面---获取油枪详情: ', res.data);
        if (res.data.code == "S200") {
          that.setData({
            station_name: res.data.station_name,
            address: res.data.address,
            cash_account: res.data.cash_ccount,
            baitiao_account: res.data.baitiao_ccount,
            pic_url: res.data.pic_url,
            radioItems: [
              { name: '现金账户', value: 'cash_account', detail: res.data.cash_ccount, checked: true },
              { name: '白条账户', value: 'baitiao_account',
                detail: res.data.baitiao_ccount + '(暂不可用)', disabled: true }
            ],
          })
        }
      }
    });
    typeof cb == 'function' && cb()
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i){
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },

  beforeStartCharging: function () {
    var that = this;
    wx.request({
      url: config.load_charging_order,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Cookie': that.data.cookies,
      },
      complete: function (res) {
        console.log('获取正在进行的订单以及订单名称', res.dada, res.data.order_info.order_id)
        if (res.data.code == "S200") {
          if (res.data.order_info !== '' && res.data.order_info.order_id) {
            var order_id = res.data.order_info.order_id;
            wx.navigateTo({
              url: '/pages/gasoline/oiling/oiling?order_id=' + order_id
            });
          }
          else {
            wx.navigateTo({
              url: '/pages/gasoline/startOil/startOil?gun_id=' + that.data.gun_id
            })
          }
        }
      }
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
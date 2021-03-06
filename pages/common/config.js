var url = 'https://www.uwellpay.com'
module.exports = {
  getCode: url + '/getcode',
  bind: url +'/auth/bind',
  login: url +'/auth/login',
  index: url +'/station?qt=load_station_list',
  getuserinfo: url + '/user/getuserinfo',
  queryForChargingRecord: url +'/user?qt=load_account_charging_record',
  recharge: url +'/recharge',
  record: url +'/user?qt=load_fuel_charging_record',
  complain: url +'/user/complain',
  load_charging_order: url + '/user?qt=load_charging_order',
  load_gun_detail: url + '/charging?qt=load_gun_detail',
  startCharging: url + '/charging?qt=start',
  loadOrderStatus: url + '/charging?qt=load_order_status',
  endCharging: url + '/charging?qt=end',
  activate_card: url + '/apiserver?api=activated_card',
  query_activate_card: url + '/apiserver?api=query_cards'

}
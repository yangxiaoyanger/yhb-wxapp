var url = 'https://www.uwellpay.com'
module.exports = {
  getCode: url + '/getcode',
  bind: url +'/auth/bind',
  login: url +'/auth/login',
  index: url +'/station?qt=load_station_list&&page_number=1',
  query: url +'/user?qt=load_account_charging_record',
  recharge: url +'/user/recharge',
  record: url +'/user?qt=load_fuel_charging_record',
  complain: url +'/user/complain',
  load_gun_detail: url + '/charging?qt=load_gun_detail',
  startCharging: url + '/charging?qt=start',
  queryForOrderStatus: url + '/charging?qt=load_order_status'
  

}
function formatTime(date) {
  console.log(date, 888);
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatUTCTime (utc) {
  var utcStr = utc.slice(0, -9).replace(/T/g, ' ').replace(/-/g, '\/');
  var date = new Date(Date.parse(new Date(utcStr)) - new Date(utcStr).getTimezoneOffset() * 60000);
  return formatTime(date);
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatUTCTime: formatUTCTime
}

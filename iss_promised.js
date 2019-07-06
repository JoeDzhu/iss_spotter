const request = require('request-promise-native');

const fetchMyIP = function () {
  return request('https://api.ipify.org?format=json')
}

const fetchCoordsByIP = function (body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`)
}

const fetchISSFlyOverTimes = function (body) {
  const {latitude, longitude} = JSON.parse(body).data;
  //此处直接匹配data这个obj内部的两个keys，不用给变量名，直接取得，类似于const 变量名 = {la， lo} = JSON...
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`
  return request(url);
}


const nextFlyOverTime = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const {response} = JSON.parse(body);
      return response;
    })
}
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextFlyOverTime};
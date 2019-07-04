const request = require('request');

const url = `https://api.ipify.org?format=json`;

const fetchMyIP = function(callback) { //consider this type of callbacks,可以视为空白，没有parameter的funcs
  //也就是只是执行内部任务的func，然后给它一个parameter-callback，这种不会return anything，所以要在执行
  //完成内任务之后，return给到callback，by invoke the callback；

  request(url, (error, response, body) => {
    
    if(error) {
      callback(error, null);
      return;
    }

    if(response.statusCode !== 200) {

      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }

    const myIp = JSON.parse(body).ip;
    // console.log(myIp);
    callback(null, myIp);
  
  })
}

const fetchCoordsByIP = function(ip, callback){

  request(`https://ipvigilante.com/${ip}`, (error, response, body) =>{ //request deals with three things, something wrong here - my request is wrong
  //something wrong at the server, the response issue, and everything checks out. for each situation, call the callback on the atcually running
  //stript, if any error or anything wrong, show it there or break it there.
    
    if(error) {
      callback(error, null)
      return; // return此处的作用是停止程序，如果已经答复有错了，就不用往下跑了；
    }

    if(response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null)
      return;
    }
    
    const latitude = JSON.parse(body).data.latitude;
    const longitude = JSON.parse(body).data.longitude;
    
    const myGeo = {latitude, longitude};

    //another way, const {latitude, longtitude} = JSON.parse(body).data
    
    callback(null, myGeo);
  })

}

const fetchISSFlyOverTimes = function (coords, callback) {

  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) =>{
    if(error) {
      callback(error, null)
      return;
    }

    if(response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null)
      return;
    }

    console.log(body);
    const passes = JSON.parse(body).response;

    callback(null, passes);
    //trouble was that I was trying to use the {} to store the value from the API, but this time the values are stored in an
    //array, so instead of getting each value of the array, just put it into an variable and print it out.

  })
}

module.exports = {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} //if write it as fetchMyIp(), is actually invoking the func not just the func itself;
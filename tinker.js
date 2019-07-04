// const request = require('request');

//   request('https://ipvigilante.com/66.207.199.230', (error, response, body) =>{ //request deals with three things, something wrong here - my request is wrong
//   //something wrong at the server, the response issue, and everything checks out. for each situation, call the callback on the atcually running
//   //stript, if any error or anything wrong, show it there or break it there.
    
//   if(error) {

//     return error;
//   }

//   if(response.statusCode !== 200) {

//     return error;
//   }

//   const latitude = JSON.parse(body).data.latitude;
//   const longitude = JSON.parse(body).data.longitude;

//   const myGeo = {latitude, longitude};

//   console.log(latitude);
//   console.log(longitude);
//   console.log(myGeo);

// })



const request = require('request');

const url = `https://api.ipify.org?format=json`;

// const fetchMyIP = function(callback) { //consider this type of callbacks,可以视为空白，没有parameter的funcs
//   //也就是只是执行内部任务的func，然后给它一个parameter-callback，这种不会return anything，所以要在执行
//   //完成内任务之后，return给到callback，by invoke the callback；
  request(url, (error, response, body) => {
    
    if(error) 
    //   callback(error, null);
      return error;
    // }

    // const myIp = JSON.parse(body).ip;

    // if(response.statusCode !== 200) {

    //   callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${myIp}`), null);
    // }

    // // console.log(myIp);
  console.log(JSON.parse(body).ip)
  
  })

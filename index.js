//it works and I really don't know why;

const {fetchMyIP} = require('./iss');
const {fetchCoordsByIP} = require('./iss');
const {fetchISSFlyOverTimes} = require('./iss');



const nextISSTimesForMyLocation = (callback) => {//nextISSTimesForMyLocation((calback));

  fetchMyIP((error, ip) => { //the error check part is 
    if(error) {
      console.log('error',error);
    }
  
     fetchCoordsByIP(ip, (error, myGeo) =>{
      if(error) {
        console.log('error', error);
      }
  
      fetchISSFlyOverTimes(myGeo, (error,stationPassTime) =>{
  
        if(error) {
          console.log('error', error);
        }
        callback(error, stationPassTime);

        
//目前的理解，整个nITFML就是个回调函数，内部处理完了，只会return给自己；整个跑完，就干一件事儿，是唤醒回调。
  
      })
  
    });
  });

}

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation((error, stationPasstime) => {

  if(error){
    return error
  }
  
printPassTimes(stationPasstime);

});

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextFlyOverTime } = require('./iss_promised'); //最好写入花括弧内，不然会报错，不识别为func，导入部分和导出的module文件的部分保持写法一致。

const printPassTimes = function(flyoverTime) {
  for (const pass of flyoverTime) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextFlyOverTime()
  .then((flyoverTime) => {
    printPassTimes(flyoverTime)
  })
  .catch((error) => {
    console.log('May day!', error.message);
  });
  //if didn't catch the error, didn't settle, will see UnhandledPromiseRejectionWarning



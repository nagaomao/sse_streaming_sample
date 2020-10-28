const fs = require('fs');

var USDJPY = 140.7;
for (var i = 0; i < 1000; i++){
  USDJPY += Math.random() - 0.5;
  USDJPY = Math.round(USDJPY * Math.pow(10,1))/Math.pow(10,1);
  fs.appendFileSync("rate.dat", USDJPY + "\n" );
}

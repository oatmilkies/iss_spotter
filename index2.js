const { nextISSTimesForMyLocation } = require('./iss_promised');

//Print the fly over times in a sentence
const printISSTimes = function(times) {
  for (let i = 0; i < times.length; i++) {
    //Convert unix timestamp to date, time, and timezone
    let date = new Date(times[i].risetime * 1000);

    //No error. Print out next 5 times the ISS will pas by
    console.log(`Next pass at ${date.toDateString()} ${date.toTimeString()} for ${times[i].duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then(passTimes => printISSTimes(passTimes))
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
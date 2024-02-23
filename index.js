// index.js
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

const ip = '99.224.60.214';

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked! Returned IP:', ip);
});

fetchCoordsByIP(ip, (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked!', data);
});
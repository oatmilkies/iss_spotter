/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {
  //Fetch IP address using request
  request('https://api.ipify.org?format=json', (error, response, body) => {
    //Error could be invalid domain, user offline, etc
    if (error) {
      return callback(error, null);
    }
    //If not 200 status code, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    //No error, return IP
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(callback) {
  const ip = '99.224.60.214';
  //Fetch latitude and longitude based on IP
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    //Error if invalid domain
    if (error) {
      return callback(error, null);
    }
    //Error if invalid IP
    if (JSON.parse(body).success === false) {
      const msg = `Invalid IP address when fetching ${ip}`;
      callback(null, msg);
    } else {
      //No error, return lat & long
      const latlong = {
        latitude: JSON.parse(body).latitude,
        longitude: JSON.parse(body).longitude
      };
      callback(null, latlong);
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };
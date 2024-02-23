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
      callback(msg, null);
      return;
    }

    //No error, return IP
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  //Fetch latitude and longitude based on IP
  request(`http://ipwho.is/${ip}`, (error, response, body) => {

    //Error if invalid domain
    if (error) {
      return callback(error, null);
    }

    const parsedBody = JSON.parse(body);

    //Error if invalid IP
    if (parsedBody.success === false) {
      const msg = `Invalid IP address when fetching ${ip}`;
      callback(msg, null);
      return;
    }

    //No error, return lat & long
    const { latitude, longitude } = parsedBody;
    callback(null, { latitude, longitude });
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const lon = "-79.3831843";
const lat = "43.653226";

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${lat}&lon=${lon}`, (error, response, body) => {

    //Error could be invalid domain, user offline, etc
    if (error) {
      return callback(error, null);
    }
    //If not 200 status code, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(msg, null);
      return;
    }

    //If no error, return fly over times
    callback(null, JSON.parse(body).response);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
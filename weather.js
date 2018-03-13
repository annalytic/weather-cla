// Require modules
const https = require('https');
const http = require('http');

// Print message to command line
printMessage = (city, temp) => {
  console.log(`Current temperature in ${city} is ${temp} C.`);
}

// Get weather report
function getWeatherTemp(city, state) {
  try {
    const url = `http://api.wunderground.com/api/75a58a85ccf30204/conditions/q/${state}/${city}.json`
    const request = http.get(url, response => {

      let body = "";

      response.on('data', data => {
        body += data.toString();
      });

      response.on('end', () => {
        const weatherData = JSON.parse(body);
        const temp = weatherData.current_observation.temp_c;
        printMessage(city, temp);
      });

    });
  } catch(error) {
    console.error(error.message);
  }
}

module.exports.get = getWeatherTemp;

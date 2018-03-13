// Require modules
const https = require('https');
const http = require('http');

// Print message to command line
printMessage = (location, temp) => {
  console.log(`Current temperature in ${location} is ${temp} C.`);
}

function printError(error) {
  console.error(error.message);
}

// Get weather report
function getWeatherTemp(query) {
  try {
    const url = `http://api.wunderground.com/api/75a58a85ccf30204/conditions/q/${query}.json`;
    const request = http.get(url, response => {
      if (response.statusCode === 200) {
        let body = "";

        response.on('data', chunk => {
          body += chunk;
        });

        response.on('end', () => {
          const readableQuery = query.replace('_', ' ');
          try {
            const weatherData = JSON.parse(body);
            const temp = weatherData.current_observation.temp_c;
            const location = weatherData.current_observation.display_location.city;
            printMessage(location, temp);
          } catch (error) {
            const queryError = new Error(`The location "${readableQuery}" was not found`);
            printError(queryError);
          }
        });
      } else {
        console.log('hei');
        const statusCodeError = new Error(`There was an error getting the message for ${readableQuery} (${http.STATUS_CODES[response.statusCode]}).`);
        printError(statusCodeError);
      }
    });
  } catch(error) {
    printError(error);
  }
}

module.exports.get = getWeatherTemp;

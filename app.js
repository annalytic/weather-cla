// Requires
const weather = require('./weather.js');

// Query
const query = process.argv.slice(2).join("_").replace(' ', '_');

weather.get(query);

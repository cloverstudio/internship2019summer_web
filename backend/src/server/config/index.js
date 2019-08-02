let config = require("./local");

if (process.env.NODE_ENV == "development")
    config = require("./development");
else if ( process.env.NODE_ENV == "production")
    config = require("./production");

module.exports = config;
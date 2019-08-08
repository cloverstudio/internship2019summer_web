let config = require("./local");
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV == "development") {
    config = require("./development");
}
else if ( process.env.NODE_ENV == "production") {
    config = require("./production");
}

module.exports = config;
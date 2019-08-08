let config = require("./local");

if (process.env.NODE_ENV == "development") {
    config = require("./development");
    console.log(config.PORT)
}
else if ( process.env.NODE_ENV == "production") {

}
    config = require("./production");
    console.log(config.PORT)

module.exports = config;
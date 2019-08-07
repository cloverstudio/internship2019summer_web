const knexConfig = require('./knexfile');

const db_host =  knexConfig.local.connection.host;
const db_user = knexConfig.local.connection.user;
const db_password = knexConfig.local.connection.password;
const db_name = knexConfig.local.connection.database;
JWT_SECRET='jsonwebtokensecretwordabc';
PORT = 3000;

module.exports = {
    database: {
        db_host,
        db_user,
        db_password,
        db_name
    },
    JWT_SECRET,
    PORT
    
}

  
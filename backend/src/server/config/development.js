const knexConfig = require('./knexfile');

const db_host =  knexConfig.development.connection.host;
const db_user = knexConfig.development.connection.user;
const db_password = knexConfig.development.connection.password;
const db_name = knexConfig.development.connection.database;
JWT_SECRET='jsonwebtokensecretwordabc';
PORT = 8080;
module.exports = {
    database: {
        db_host,
        db_user,
        db_password,
        db_name
    },
    JWT_SECRET,
    PORT
    
};
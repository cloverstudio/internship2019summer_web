const knexConfig = require('./knexfile');

const db_host =  knexConfig.locdevelopmental.connection.host;
const db_user = knexConfig.development.connection.user;
const db_password = knexConfig.development.connection.password;
const db_name = knexConfig.development.connection.database;
console.log(db_host + 'host')
console.log(knexConfig + 'knexfile')
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
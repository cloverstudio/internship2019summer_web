module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: '172.26.14.199',
      user: 'root',
      password: '!@Antonio22',
      database: 'mojgrad',
      port: 3306
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + "/../db/migrations"
    }
  },

  local: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'antonio22',
      database: 'mojgrad'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + "/../db/migrations"
    }
  }
}

// Update with your config settings.
require('dotenv').config();


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      user:process.env.DB_USER,
      // password: 'password'
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },


  production: {
    client: 'postgresql',
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  }

};

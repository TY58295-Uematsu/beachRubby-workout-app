const knex = require('knex');
let config = require('./knexfile')
const db = knex(config.development);

module.exports=db
require('dotenv').config();

const knex = require('knex');
let config = require('./knexfile');


if (process.env.NODE_ENV==='production') {
    config = config.production;
} else if (process.env.NODE_ENV==='development'){
    config = config.development;
}
const db = knex(config);
module.exports=db
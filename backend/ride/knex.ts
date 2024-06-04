import Knex from 'knex';
import knexConfig from './knexfile';

const knex = Knex(knexConfig);

export default knex;

// const environment = process.env.ENVIRONMENT || 'development';
// const config = require('./knexfile')[environment];
// module.exports= require('knex')(config);
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'ukdak',
      database : 'music'
    }
  });

module.exports = knex;
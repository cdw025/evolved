const knex = require('./connection');

module.exports = {

  getLocations: function () {
    return knex('locations');
  } 
}

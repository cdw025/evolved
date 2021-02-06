const knex = require('./connection');

module.exports = {

  getDelays: function() {
    return knex('deckdelays');
  }
}
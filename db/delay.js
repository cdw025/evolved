const knex = require('./connection');

module.exports = {

  getDelays: function() {
    return knex('deckdelays');
  },
  getDelaysByJobNumber: function(order_id) {
    return knex('deckdelays').where({'order_id' : order_id }).then(delays => {
      return delays;
    });
  },
  create: function(delay) {
    return knex('deckdelays').insert(delay,'delay_id').then(delay_id => {
      return delay_id[0];
    });
  },
  update: function(delay_id, delay) {
    return knex('deckdelays').where('delay_id', delay_id).update(delay, '*');
  },
  delete: function(delay_id) {
    return knex('deckdelays').where('delay_id', delay_id).del();
  }
}
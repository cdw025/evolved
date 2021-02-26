const knex = require('./connection');

module.exports = {

  getLogs: function() {
    return knex('deckvsllogs');
  },
  getLogsByJobNumber: function(order_id) {
    return knex('deckvsllogs').where({'order_id' : order_id }).then(logs => {
      return logs;
    });
  },
  create: function(log) {
    return knex('deckvsllogs').insert(log,'log_id').then(log_id => {
      return log_id[0];
    });
  },
  update: function(log_id, log) {
    return knex('deckvsllogs').where('log_id', log_id).update(log, '*');
  },
  delete: function(log_id) {
    return knex('deckvsllogs').where('log_id', log_id).del();
  },
  getFirstLog: function() {
    return knex('deckvsllogs');
  },
}
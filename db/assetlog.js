const knex = require('./connection');

module.exports = {

  getLogs: function() {
    return knex('deckvsllogs');
  },
  create: function(log) {
    return knex('deckvsllogs').insert(log,'log_id').then(log_id => {
      return log_id[0];
    });
  },
  update: function(order_id, job) {
    return knex('deckorderfil').where('order_id', order_id).update(job, '*');
  },
  delete: function(ordnbr) {
    return knex('deckorderfil').where('ordnbr', ordnbr).del();
  },
  getFirstLog: function() {
    return knex('deckvsllogs');
  },
}
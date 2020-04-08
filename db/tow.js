const knex = require('./connection');

module.exports = {

  getTows: function() {
    return knex('decktowfil');
  },
  getOneByTowNumber: function(townumber) {
    return knex('decktowfil').where('tow_id', tow_id).first();
  },
  getOneByJobId: function(order_id) {
    return knex('deckorderfil').where('order_id', order_id).first();
  },
  create: function(job) {
    return knex('deckorderfil').insert(job,'ordnbr').then(ordnbr => {
      return ordnbr[0];
    });
  },
  update: function(order_id, job) {
    return knex('deckorderfil').where('order_id', order_id).update(job, '*');
  },
  delete: function(ordnbr) {
    return knex('deckorderfil').where('ordnbr', ordnbr).del();
  }
}
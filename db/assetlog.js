const knex = require('./connection');

module.exports = {

  getLogs: function() {
    return knex('deckvsllogs');
  },
  create: function(asset) {
    return knex('deckassetfil').insert(asset,'asset_id').then(asset_id => {
      return asset_id[0];
    });
  },
  update: function(order_id, job) {
    return knex('deckorderfil').where('order_id', order_id).update(job, '*');
  },
  delete: function(ordnbr) {
    return knex('deckorderfil').where('ordnbr', ordnbr).del();
  }
}
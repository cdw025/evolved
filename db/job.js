const knex = require('./connection');

module.exports = {

  getJobs: function() {
    return knex('deckorderfil');
  },
  getOneByJobNumber: function(jobnumber) {
    return knex('deckorderfil').where('ordnbr', jobnumber).first();
  },
  getOneByJobId: function(order_id) {
    return knex('deckorderfil').where('order_id', order_id).first();
  },
  create: function(job) {
    return knex('deckorderfil').insert(job,'order_id').then(order_id => {
      return order_id[0];
    });
  },
  update: function(order_id, job) {
    return knex('deckorderfil').where('order_id', order_id).update(job, '*');
  },
  delete: function(order_id) {
    return knex('deckorderfil').where('order_id', order_id).update({status : 'Archived'});
  }
}


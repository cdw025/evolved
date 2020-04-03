const knex = require('./connection');

module.exports = {

  getBarges: function() {
    return knex('deckbargemst');
  },
  getOneByBargeName: function(barge_name) {
    return knex('deckbargemst').where('barge_name', barge_name).first();
  },
  getOneByBargeId: function(id) {
    return knex('deckbargemst').where('barge_id', barge_id).first();
  }
//   ,
//   create: function(trip) {
//     return knex('trips').insert(trip,'id').then(ids => {
//       return ids[0];
//     });
//   },
//   update: function(id, trip) {
//     return knex('trips').where('id', id).update(trip, '*');
//   },
//   delete: function(id) {
//     return knex('trips').where('id', id).del();
//   }
}
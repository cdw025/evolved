const knex = require('./connection');

module.exports = {

  getBoats: function() {
    return knex('deckbotmst');
  },
  getOneByBoatName: function(boat_name) {
    return knex('deckbotmst').where('boat_nm', boat_nm).first();
  },
  getOneByBoatId: function(id) {
    return knex('deckbotmst').where('boat_id', boat_id).first();
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
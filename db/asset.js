const knex = require('./connection');

module.exports = {

  getAssets: function() {
    return knex('deckassetfil');
  },
  create: function(asset) {
    return knex('deckassetfil').insert(asset,'asset_id').then(asset_id => {
      return asset_id[0];
    });
  },
  update: function(asset_id, asset) {
    return knex('deckassetfil').where('asset_id', asset_id).update(asset, '*');
  },
  delete: function(ordnbr) {
    return knex('deckorderfil').where('ordnbr', ordnbr).del();
  }
}
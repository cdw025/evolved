const knex = require('./connection');

module.exports = {

  getAssets: function() {
    return knex('deckassetfil');
  },
  getMatchingAssets : function(delay) {
    return knex('deckassetfil').where({'order_id' : delay.order_id, 'tow_group' : delay.tow_group }).then(assets => {
      return assets;
    });
  },
  getAssetsbyJobNumber : function(order_id) {
    return knex('deckassetfil').where({'order_id' : order_id }).then(assets => {
      return assets;
    });
  },
  getAssetsByVendor : function(company) {
    return knex('deckassetfil').where('vendor_name', company).then(assets => {
      return assets;
    });
  },
  create: function(asset) {
    return knex('deckassetfil').insert(asset,'asset_id').then(asset_id => {
      return asset_id[0];
    });
  },
  update: function(asset_id, asset) {
    return knex('deckassetfil').where('asset_id', asset_id).update(asset, '*');
  },
  delete: function(asset_id) {
    return knex('deckassetfil').where('asset_id', asset_id).del();
  }
}
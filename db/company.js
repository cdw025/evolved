const knex = require('./connection');

module.exports = {
  getCompanyUsers: function (company) {
    return knex('user').where('company', company);
  },

  getAllUsers: function () {
    return knex('user');
  }
}

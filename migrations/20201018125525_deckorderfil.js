const { transform } = require("lodash");

exports.up = function(knex) {
  return knex.schema.createTable('deckorderfil', table => {
      table.increments('order_id');
      table.string('ordnbr').unique();
      table.string('status');
      table.string('pm_assigned');
      table.string('customer');
      table.string('customer_nm');
      table.bigInteger('customer_phone');
      table.string('customer_email');
      table.string('vendor');
      table.string('vendor_nm');
      table.bigInteger('vendor_phone');
      table.string('vendor_email');
      table.string('origin');
      table.string('origin_desc');
      table.string('destination');
      table.string('destination_desc');
      table.bigInteger('lump_sum_amount');
      table.string('lump_sum_paid');
      table.bigInteger('proforma_amount');
      table.string('proforma_paid');
      table.string('contract_signed');
      table.string('kickoff_meeting');
      table.string('barge_name');
      table.string('tug_name');
      table.string('est_start_date');
      table.text('ord_notes');
      table.text('customer_notes');
      table.text('vendor_notes');
      table.string('created_by');
      table.string('last_modified_by');
      table.timestamp('created_dttm', { useTz : false});
      table.timestamp('modified_dttm', { useTz : false});
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('deckorderfil');
};

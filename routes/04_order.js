exports.seed = (knex, Promise) => {
    return knex.raw('DELETE FROM deckorderfil;')
      .then(() => {
        const orders = [
          {
            order_id: 1,
            ordnbr: 'D1',
            status: 'a',
            customer_nm: 'Mammoet',
            origin_location: 'New Orleans, LA',
            origin_desc: 'Port of New Orleans Terminal 21',
            dest_location: 'Monaca, PA',
            dest_desc: 'OH-28 Milemarker',
            ord_notes: 'make sure to enter descriptive notes!',
            created_by: 'Neal White',
            last_modified_by: 'Neal White',
            created_dttm: new Date(),
            modified_dttm: new Date()
          },
          {
            order_id: 2,
            ordnbr: 'D2',
            status: 'a',
            customer_nm: 'Bechtel',
            origin_location: 'Baton Rouge',
            origin_desc: 'Port of Baton Rouge Terminal 12',
            dest_location: 'Dilles Bottom, OH',
            dest_desc: 'OH-4 Milemarker',
            ord_notes: '2make sure to enter descriptive notes!',
            created_by: 'Neal White',
            last_modified_by: 'Neal White',
            created_dttm: new Date(),
            modified_dttm: new Date()
          },
          {
            order_id: 3,
            ordnbr: 'D3',
            status: 'a',
            customer_nm: 'Berard Transportation',
            origin_location: 'Mobile, AL',
            origin_desc: 'Port of Mobile',
            dest_location: 'Memphis, TN',
            dest_desc: 'LM-665 Milemarker',
            ord_notes: '3make sure to enter descriptive notes!',
            created_by: 'Neal White',
            last_modified_by: 'Neal White',
            created_dttm: new Date(),
            modified_dttm: new Date()
          }];
        return knex('deckorderfil').insert(orders)
      });
};
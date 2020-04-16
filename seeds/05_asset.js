exports.seed = (knex, Promise) => {
    return knex.raw('DELETE FROM deckassetfil;')
      .then(() => {
        const assets = [
          {
            asset_id: 1,
            ordnbr: 'D3',
            asset_status: 'Active',
            tow_group: 1,
            asset_type: 'Barge',
            asset_name: 'CBC Savannah',
            asset_start: new Date(),
            asset_stop: new Date(),
            vendor_name: 'Marquette Transportation',
            created_by: 'Neal White',
            last_modified_by: 'Neal White',
            created_dttm: new Date(),
            modified_dttm: new Date()
          },
          {
            asset_id: 2,
            ordnbr: 'D3',
            asset_status: 'Active',
            tow_group: 1,
            asset_type: 'Boat',
            asset_name: 'Capt. Chase',
            asset_start: new Date(),
            asset_stop: new Date(),
            vendor_name: 'Marquette Transportation',
            created_by: 'Neal White',
            last_modified_by: 'Neal White',
            created_dttm: new Date(),
            modified_dttm: new Date()
          },
          {
            asset_id: 3,
            ordnbr: 'D2',
            asset_status: 'Active',
            tow_group: 1,
            asset_type: 'Barge',
            asset_name: 'CBC759',
            asset_start: new Date(),
            asset_stop: new Date(),
            vendor_name: 'Marquette Transportation',
            created_by: 'Neal White',
            last_modified_by: 'Neal White',
            created_dttm: new Date(),
            modified_dttm: new Date()
          },
          {
            asset_id: 4,
            ordnbr: 'D3',
            asset_status: 'Active',
            tow_group: 2,
            asset_type: 'Boat',
            asset_name: 'Trey Paul',
            asset_start: new Date(),
            asset_stop: new Date(),
            vendor_name: 'Marquette Transportation',
            created_by: 'Neal White',
            last_modified_by: 'Neal White',
            created_dttm: new Date(),
            modified_dttm: new Date()
          }];
        return knex('deckassetfil').insert(assets)
      });
};
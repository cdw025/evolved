exports.seed = (knex, Promise) => {
  return knex.raw('DELETE FROM deckdelays;')
    .then(() => {
      const delays = [
          {
            delay_id: '1',
            asset_id: '15',
            order_id: '32',
            tow_group: '1',
            delay_type: 'Lock',
            delay_start: '2021-01-05 13:00:00',
            delay_stop: '2021-01-05 15:00:00',
            delay_duration: '2',
            description: 'simple lock as a test',
            asset_delay_number: '1'
          },
          {
            delay_id: '1',
            asset_id: '16',
            order_id: '32',
            tow_group: '1',
            delay_type: 'Lock',
            delay_start: '2021-01-05 13:00:00',
            delay_stop: '2021-01-05 15:00:00',
            delay_duration: '2',
            description: 'simple lock as a test',
            asset_delay_number: '2'
          },
          {
            delay_id: '3',
            asset_id: '15',
            order_id: '32',
            tow_group: '1',
            delay_type: 'Weather',
            delay_start: '2021-01-05 15:00:00',
            delay_stop: '2021-01-05 18:00:00',
            delay_duration: '2',
            description: 'simple lock as a test',
            asset_delay_number: '1'
          },
          {
            delay_id: '3',
            asset_id: '16',
            order_id: '32',
            tow_group: '1',
            delay_type: 'Weather',
            delay_start: '2021-01-05 15:00:00',
            delay_stop: '2021-01-05 18:00:00',
            delay_duration: '2',
            description: 'simple lock as a test',
            asset_delay_number: '2'
          }
         ];
      return knex('deckdelays').insert(delays)
    });
};
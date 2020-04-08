exports.seed = (knex, Promise) => {
    return knex.raw('DELETE FROM deckbargemst;')
      .then(() => {
        const barges = [
          {
            barge_id: 1,
            barge_name: 'PROMETHEUS',
            year_built: 1955,
            barge_class: 'Deck Barge',
            barge_length: 300,
            barge_width: 100,
            barge_depth: 20,
            created_by: 'Neal White',
            last_modified_by: 'Neal White',
            created_dttm: new Date(),
            modified_dttm: new Date()
          },
          {
            barge_id: 2,
            barge_name: 'OCEANUS',
            year_built: 1955,
            barge_class: 'Deck Barge',
            barge_length: 300,
            barge_width: 100,
            barge_depth: 20,
            created_by: 'Neal White',
            last_modified_by: 'Neal White',
            created_dttm: new Date(),
            modified_dttm: new Date()
          },
          {
            barge_id: 3,
            barge_name: 'SAVANNAH',
            year_built: 1955,
            barge_class: 'Deck Barge',
            barge_length: 300,
            barge_width: 100,
            barge_depth: 20,
            created_by: 'Neal White',
            last_modified_by: 'Neal White',
            created_dttm: new Date(),
            modified_dttm: new Date()
          },
          {
            barge_id: 4,
            barge_name: 'CBC 1277',
            year_built: 1955,
            barge_class: 'Deck Barge',
            barge_length: 300,
            barge_width: 100,
            barge_depth: 20,
            created_by: 'Neal White',
            last_modified_by: 'Neal White',
            created_dttm: new Date(),
            modified_dttm: new Date()
          }];
        return knex('deckbargemst').insert(barges)
      });
};
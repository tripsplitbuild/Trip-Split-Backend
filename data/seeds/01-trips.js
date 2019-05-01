
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trips').del()
    .then(function () {
      // Inserts seed entries
      return knex('trips').insert([
        {trip_name: 'Magic Kingdom', user_id: 1},
        {trip_name: 'Lotte World', user_id: 2},
        {trip_name: 'Universal Studios', user_id: 2},
        {trip_name: 'Seoul Trip', user_id: 1}
      ]);
    });
};

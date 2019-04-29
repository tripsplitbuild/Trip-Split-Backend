
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tripMembers', tbl => {
    tbl.increments();

    tbl
      .string('trip_username')
      .references('username')
      .inTable('users')

    tbl
      .integer('trip_id')
      .unsigned()
      .references('id')
      .inTable('trips')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .notNullable()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tripMembers');
};

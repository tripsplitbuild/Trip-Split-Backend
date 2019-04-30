
exports.up = function(knex, Promise) {
  return knex.schema.createTable('trips', tbl => {
    tbl.increments();
    tbl.boolean('close_trip')

    tbl
      .string('trip_name', 255)
      .notNullable();
    tbl
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('trips');
};

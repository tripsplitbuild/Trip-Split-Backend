
exports.up = function(knex, Promise) {
  return knex.schema.createTable('expense', tbl => {
    tbl.increments();

    tbl
      .string('expense_name', 255)
      .notNullable();
    tbl
      .integer('trip_id')
      .unsigned()
      .references('id')
      .inTable('trips')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .notNullable()
      
    tbl
      .float('expense_total')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('expense');
};

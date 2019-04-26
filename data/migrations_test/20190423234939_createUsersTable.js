
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', users => {
    users.increments();

    users
      .string('username', 255)
      .notNullable()
      .unique();

    users.string('first_name', 255)
    users.string('last_name', 255)
    users.string('gender')
    users.string('avatar')
    users.string('password', 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};

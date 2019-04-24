// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/trip_split.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/trip_split_test.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations_test'
    },
    seeds: {
      directory: './data/seeds_test'
    }
  }
};

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */


module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "localhost",
      port: "3306",
      user: "root",
      password: "password",
      database: "monolith",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

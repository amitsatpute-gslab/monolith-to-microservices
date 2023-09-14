// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const {
  DATABASE_HOST,
  DATABASE_PORT_PG,
  DATABASE_USER_PG,
  DATABASE_PASSWORD_PG,
  DATABASE_NAME,
} = process.env;

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT_PG ? parseInt(DATABASE_PORT_PG) : 3306,
      user: DATABASE_USER_PG,
      password: DATABASE_PASSWORD_PG,
      database: DATABASE_NAME,
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



const knexfile = require("../../database/knexfile");
const environment = knexfile[process.env.NODE_ENV]
  ? process.env.NODE_ENV
  : "development";

const db = require("knex")(knexfile[environment]);

// Always run database migrations.
db.migrate.latest();

module.exports = db;

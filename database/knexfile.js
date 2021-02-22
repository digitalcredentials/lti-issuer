const cfg = require("../server/config")["database"];

const baseConfig = {
  client: "pg",
  connection: {
    host: cfg.host,
    port: cfg.port,
    user: cfg.user,
    database: cfg.name,
    password: cfg.password,
  },
  migrations: {
    directory: "./database/migrations",
  },
};

module.exports = {
  development: {
    ...baseConfig,
    seeds: {
      directory: "./database/seeds/development",
    },
  },
  test: {
    ...baseConfig,
    seeds: {
      directory: "./database/seeds/test",
    },
  },
  production: { ...baseConfig },
};

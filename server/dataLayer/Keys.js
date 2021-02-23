const knex = require("../lib/database");

const Keys = {};

Keys.getUserKey = (userId) =>
  knex("keys")
    .where("user_id", userId)
    .first("key")
    .then((key) => (key ? key.key : false));

Keys.setUserKey = (userId, key) =>
  knex("keys").insert({ user_id: userId, key });

module.exports = Keys;

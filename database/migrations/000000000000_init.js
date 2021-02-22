exports.up = function (knex) {
  return knex.schema
    .createTable("keys", (table) => {
      table.string("user_id").notNullable().unique();
      table.string("key").notNullable();
      table.timestamps(true, true);
    })
    .createTable("placements", (table) => {
      table.string("placement_id").notNullable().unique();
      table.string("issuance_id").notNullable();
      table.unique("placement_id", "issuance_id");
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("keys").dropTable("placements");
};

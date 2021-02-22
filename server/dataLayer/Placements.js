const knex = require("../lib/database");

const Placements = {};

Placements.getPlacement = (placementId) =>
  knex("placements").where("placement_id", placementId).select("issuance_id");

Placements.setPlacement = (placementId, issuanceId) =>
  knex("placements").insert({
    placement_id: placementId,
    issuance_id: issuanceId,
  });

module.exports = Placements;

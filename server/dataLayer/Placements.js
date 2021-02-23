const knex = require("../lib/database");

const Placements = {};

Placements.getPlacement = (placementId) =>
  knex("placements").where("placement_id", placementId).select("issuance_id");

Placements.setPlacement = (placementId, issuanceId, ownerId) =>
  knex("placements").insert({
    placement_id: placementId,
    issuance_id: issuanceId,
    owner_id: ownerId,
  });

module.exports = Placements;

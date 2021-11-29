const superagent = require("superagent");
const Keys = require("./Keys");
const Placements = require("./Placements");
const config = require("../config.js").credadmin;

const Creds = {};

const requests = {
  get: (userId, path, query) =>
    Keys.getUserKey(userId).then((key) =>
      superagent
        .get(`${config.url}${path}`)
        .query(query)
        .set("Authorization", `Bearer ${key}`)
        .then((res) => res.body)
    ),
  post: (userId, path, body) =>
    Keys.getUserKey(userId).then((key) =>
      superagent
        .post(`${config.url}${path}`)
        .set("Authorization", `Bearer ${key}`)
        .set("Content-Type", "application/json")
        .send(body)
        .then((res) => res.body)
    ),
};

Creds.getCreds = (userId) => requests.get(userId, "/credentials");
Creds.getIssuances = (userId, credId) =>
  requests
    .get(userId, `/issuances/${credId}`)
    .catch((err) =>
      err.status && err.status === 404 ? [] : Promise.reject(err)
    );
Creds.getGroups = (userId) => requests.get(userId, "/groups");
Creds.createCred = (userId, groupid, title, templateValues) =>
  requests.post(userId, "/credentials", {
    groupid,
    title,
    templateValues,
    templatePath: "default.json",
  });
Creds.createIssuance = (userId, credId, name, issueDate) =>
  requests.post(userId, `/issuances/${credId}`, { name, issueDate });
Creds.getEnrolled = (userId, issuanceId) =>
  requests.get(userId, `/enroll/${issuanceId}`);

Creds.claimAward = (contextId, email, name) =>
  Placements.getPlacement(contextId).then((placement) => {
    // Find or create the recipient
    return requests
      .get(placement.owner_id, "/recipients", { email })
      .then((recipient) => recipient.id)
      .catch((err) =>
        requests
          .post(placement.owner_id, "/recipients", { name, email })
          .then((recipient) => recipient.id)
      )
      .then((recipientId) =>
        requests
          .post(placement.owner_id, `/enroll/${placement.issuance_id}`, {
            recipientId,
            isApproved: true,
          })
          .then(() =>
            superagent
              .get(
                `${config.url}/claim/${recipientId}/${placement.issuance_id}`
              )
              .then((res) => res.body)
          )
      )
      .catch((err) => console.log(err));
  });

module.exports = Creds;

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

Creds.claimAward = (contextId, email, name, externalId) =>
  Placements.getPlacement(contextId).then((placement) => {
    // Find or create the recipient
    return requests
      .get(
        placement.owner_id,
        "/recipients",
        externalId ? { externalId } : { email }
      )
      .then((recipient) => ({ created: false, recipientId: recipient.id }))
      .catch((err) =>
        requests
          .post(placement.owner_id, "/recipients", {
            name,
            email,
            ...(externalId ? { externalId } : null),
          })
          .then((recipient) => ({ created: true, recipientId: recipient.id }))
      )
      .then(async ({ created, recipientId }) => {
        const endpoint = `/enroll/${placement.issuance_id}`;
        let alreadyEnrolled = false;
        // If we just created the recipient they won't be enrolled yet,
        // so we can skip this check in that case
        if (!created) {
          const enrolled = await requests.get(placement.owner_id, endpoint);
          alreadyEnrolled = enrolled.recipients
            .map((recipient) =>
              recipient.RecipientIssuance.isApproved ? recipient.id : null
            )
            .includes(recipientId);
        }
        // Only enroll the recipient if they haven't been already,
        // otherwise they get a new challenge and the old links will break
        if (!alreadyEnrolled) {
          await requests.post(placement.owner_id, endpoint, {
            recipientId,
            isApproved: true,
          });
        }
        return superagent
          .get(`${config.url}/claim/${recipientId}/${placement.issuance_id}`)
          .then((res) => res.body);
      })
      .catch((err) => console.log(err));
  });

module.exports = Creds;

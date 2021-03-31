const superagent = require("superagent");
const Keys = require("./Keys");
const config = require("../config.js").credadmin;

const Creds = {};

const requests = {
  get: (userId, path) =>
    Keys.getUserKey(userId).then((key) =>
      superagent
        .get(`${config.url}${path}`)
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
Creds.createCred = (userId, groupid, title, template) =>
  requests.post(userId, "/credentials", { groupid, title, template });
Creds.createIssuance = (userId, credId, name, issueDate) =>
  requests.post(userId, `/issuances/${credId}`, { name, issueDate });
Creds.getEnrolled = (userId, issuanceId) =>
  requests.get(userId, `/enroll/${issuanceId}`);

module.exports = Creds;

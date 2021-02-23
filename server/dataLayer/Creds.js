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
  requests.get(userId, `/credentials/${credId}`);
Creds.getGroups = (userId) => requests.get(userId, "/groups");

module.exports = Creds;

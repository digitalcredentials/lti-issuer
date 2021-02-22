import superagent from "superagent";
import Keys from "./Keys";
const config = require("../config.js").credadmin;

const Creds = {};

const requests = {
  get: (userId, path) =>
    Keys.getUserKey(userId).then((keys) => {
      superagent
        .get(`${config.url}${path}`)
        .set("Authorization", `Bearer ${keys[0]}`)
        .then((res) => res.body);
    }),
  post: (userId, path, body) =>
    Keys.getUserKey(userId).then((keys) => {
      superagent
        .post(`${config.url}${path}`)
        .set("Authorization", `Bearer ${keys[0]}`)
        .set("Content-Type", "application/json")
        .send(body)
        .then((res) => res.body);
    }),
};

Creds.getCreds = (userId) => requests.get(userId, "/credentials");
Creds.getIssuances = (userId, credId) =>
  requests.get(userId, `/credentials/${credId}`);
Creds.getGroups = (userId) => requests.get(userId, "/groups");

module.exports = Creds;

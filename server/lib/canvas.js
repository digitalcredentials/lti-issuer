const superagent = require("superagent");
const parseLinkHeader = require("parse-link-header");

const cfg = require("../config").canvas;
const canvasToken = cfg.token;
const API_ROOT = cfg.apiUrl;

const handleErrors = (err) => {
  return err;
};

const tokenPlugin = (req) => {
  req.set("Authorization", `Bearer ${canvasToken}`);
};

const responseBodyAndLinks = (res) => {
  const linkHeader = res.header.link;
  const links = parseLinkHeader(linkHeader);
  return {
    body: res.body,
    links,
  };
};

module.exports = {
  get: (url) =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(handleErrors)
      .then(responseBodyAndLinks),
};

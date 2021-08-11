const jwtDecode = require("jwt-decode");
const qs = require("qs");
import superagent from "superagent";

const API_ROOT = "/api";
const QUERY_PARAMETERS = window.location.search;

/**
 * @param {string} item
 * @return {(string|boolean)}
 */
function parseQueryParams(item) {
  if (!item) return false;
  try {
    return qs.parse(QUERY_PARAMETERS, { ignoreQueryPrefix: true })[item];
  } catch (reason) {
    console.error(reason);
  }
  return false;
}

const handleErrors = (err) => {
  return err;
};

const responseBody = (res) => res.body;

const tokenPlugin = (req) => {
  let jwt;
  const token = parseQueryParams("token");
  try {
    jwtDecode(token);
    jwt = token;
    req.set("Authorization", `Bearer ${jwt}`);
  } catch (reason) {
    console.error(reason);
  }
};

const requests = {
  get: (url) =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(handleErrors)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .set("Content-Type", "application/json")
      .send(body)
      .then(handleErrors)
      .then(responseBody),
  delete: (url) =>
    superagent
      .delete(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(handleErrors)
      .then(responseBody),
};

const getContext = () => requests.get(`/context/`);

const hasAPIKey = () => requests.get("/hasApiKey");

const setAPIKey = (key) => requests.post("/apiKey", { key });

const getPlacement = () => requests.get("/placement");

const resetPlacement = () => requests.delete(`/placement`);

const getCredentials = () => requests.get("/credentials");

const getIssuances = (credId) => requests.get(`/issuances/${credId}`);

const getGroups = () => requests.get("/groups");

const createCred = (groupId, title, template) =>
  requests.post("/credential", { groupId, title, template });

const createIssuance = (credentialId, name, date) =>
  requests.post("/issuance", { credentialId, name, date });

const setPlacement = (issuanceId) =>
  requests.post("/placement", { issuanceId });

const getEnrolled = (issuanceId) => requests.get(`/enrolled/${issuanceId}`);

const postClaim = () => requests.post("/claim");

export default {
  getContext,
  hasAPIKey,
  setAPIKey,
  getPlacement,
  resetPlacement,
  getCredentials,
  getIssuances,
  getGroups,
  createCred,
  createIssuance,
  setPlacement,
  getEnrolled,
  postClaim,
};
export {
  getContext,
  hasAPIKey,
  setAPIKey,
  getPlacement,
  resetPlacement,
  getCredentials,
  getIssuances,
  getGroups,
  createCred,
  createIssuance,
  setPlacement,
  getEnrolled,
  postClaim,
};

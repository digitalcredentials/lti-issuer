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
  get: (url) => {
    return superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(handleErrors)
      .then(responseBody);
  },
};

const getContext = () => requests.get(`/context/`);

const getAPIKey = () => requests.get("/apiKey");

const setAPIKey = (key) => requests.post("/apiKey", { key });

export default {
  getContext,
  getAPIKey,
  setAPIKey,
};

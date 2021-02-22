const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const jwtMiddleware = require("../lib/jwt");
const createContext = require("../lib/util").createContext;
const Keys = require("../dataLayer/Keys");
const Placements = require("../dataLayer/Placements");

/**
 * @return {string}
 */
function getVersion() {
  const packageVersion = require("../../package.json").version;
  return `${packageVersion}${
    process.env.APP_VERSION ? `__${process.env.APP_VERSION}` : ""
  }`;
}

router.use(jwtMiddleware);

router.get("/context", (req, res, next) => {
  res.send({
    context: createContext(req.user),
    data: { version: getVersion() },
  });
});

router.get("/apiKey", (req, res, next) => {
  Keys.getUserKey(req.user.user_id).then((keys) =>
    res.send(keys.length > 0 ? keys[0] : false)
  );
});

router.post("/apiKey", (req, res, next) => {
  Keys.setUserKey(req.user.user_id, req.body.key).then(() => res.send());
});

router.get("/placement", (req, res, next) => {
  Placements.getPlacement(req.user.context_id).then((issuanceIds) =>
    res.send(issuanceIds.length > 0 ? issuanceIds[0] : false)
  );
});

router.post("/placement", (req, res, next) => {
  Placements.setPlacement(req.user.context_id, req.body.issuanceId).then(() =>
    res.send()
  );
});

module.exports = router;

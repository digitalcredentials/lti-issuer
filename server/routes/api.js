const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const jwtMiddleware = require("../lib/jwt");
const createContext = require("../lib/util").createContext;
const Keys = require("../dataLayer/Keys");
const Placements = require("../dataLayer/Placements");
const Creds = require("../dataLayer/Creds");

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

router.get("/hasApiKey", (req, res, next) => {
  Keys.getUserKey(req.user.user_id).then((key) => res.send({ apiKey: !!key }));
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
  Placements.setPlacement(
    req.user.context_id,
    req.body.issuanceId,
    req.user.user_id
  ).then(() => res.send());
});

router.get("/credentials", (req, res, next) => {
  Creds.getCreds(req.user.user_id).then((creds) => res.send(creds));
});

router.get("/issuances/:credId", (req, res, next) => {
  Creds.getIssuances(req.user.user_id, req.params.credId).then((issuances) =>
    res.send(issuances)
  );
});

router.get("/groups", (req, res, next) => {
  Creds.getGroups(req.user.user_id).then((groups) => res.send(groups));
});

router.post("/credential", (req, res, next) => {
  Creds.createCred(
    req.user.user_id,
    req.body.groupId,
    req.body.title,
    req.body.template
  ).then((cred) => res.send(cred));
});

router.post(
  "/issuance",
  (
    { user: { user_id: userId }, body: { credentialId, name, date } },
    res,
    next
  ) => {
    Creds.createIssuance(userId, credentialId, name, date).then((issuance) =>
      res.send(issuance)
    );
  }
);

module.exports = router;

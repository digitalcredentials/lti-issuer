const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const jwtMiddleware = require("../lib/jwt");
const createContext = require("../lib/util").createContext;
const Keys = require("../dataLayer/Keys");
const Placements = require("../dataLayer/Placements");
const Creds = require("../dataLayer/Creds");
const util = require("../lib/util");
const externalIdLTIVar = require("../config").externalIdLTIVar;

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
  Placements.getPlacement(req.user.resource_link_id).then((placement) =>
    res.send(placement ? placement : { issuance_id: null })
  );
});

router.delete("/placement", (req, res, next) => {
  Placements.removePlacement(req.user.resource_link_id).then(res.send());
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
  const templatePath = req.user.custom_templatepath
    ? req.user.custom_templatepath
    : "default.json";
  Creds.createCred(
    req.user.user_id,
    req.body.groupId,
    req.body.title,
    req.body.template,
    templatePath
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

router.post("/placement", ({ user, body: { issuanceId } }, res, next) => {
  const { contextId, userId, userRole } = util.createContext(user);
  if (userRole === "instructor") {
    Placements.setPlacement(contextId, issuanceId, userId).then(() =>
      res.send()
    );
  } else {
    res.status(401).send();
  }
});

router.get(
  "/enrolled/:issuanceId",
  ({ user: { user_id: userId }, params: { issuanceId } }, res, next) => {
    Creds.getEnrolled(userId, issuanceId).then((issuance) =>
      res.send(issuance)
    );
  }
);

router.post("/claim", ({ user }, res, next) => {
  const {
    resource_link_id: contextId,
    lis_person_contact_email_primary: userEmail,
    lis_person_name_full: userName,
  } = user;
  const userExternalId = externalIdLTIVar ? user[externalIdLTIVar] : null;
  Creds.claimAward(
    contextId,
    userEmail,
    userName,
    userExternalId
  ).then((award) => res.send(award));
});

module.exports = router;

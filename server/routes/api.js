const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const jwtMiddleware = require("../lib/jwt");
const createContext = require("../lib/util").createContext;

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

const Data = require("../lib/dataLayer");

const canvasStatusHandler = require("./canvasStatusHandler")(Data);
router.get("/canvas-status", (req, res, next) => {
  canvasStatusHandler(req).then((response) => res.send(response));
});

module.exports = router;

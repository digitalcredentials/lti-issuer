const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtMiddleware = require("../lib/jwt");
const passport = require("../lib/passport");
const qs = require("qs");

/**
 * Create a JWT with the given user.
 * @param {Request} req
 * @return {string} token
 */
function issueToken(req) {
  return jwt.sign(req.user, require("../config")["jwtSecret"], {
    expiresIn: 60 * 60 * 24 * 180 /* 180 days */
  });
}

// Passport initialized here but actually used as passport.authenticate()
router.use(passport.initialize());

// health check endpoint
router.get("/z", (req, res, next) => {
  res.sendStatus(200);
});

router.post(
  "/",
  passport.authenticate("lti", { session: false }),
  (req, res, next) => {
    if (req.user) {
      const parameters = {};
      parameters.token = issueToken(req);
      const analyticsId = require("../config").analytics.id;
      if (analyticsId) {
        parameters.analyticsId = analyticsId;
      }

      res.set({
        "Cache-Control": "no-store",
        Pragma: "no-cache"
      });

      res.redirect(`/?${qs.stringify(parameters)}`);
    } else {
      res.sendStatus(401);
    }
  }
);

router.use(jwtMiddleware);

router.get("/", (req, res, next) => {
  res.sendFile("index.html", { root: "dist" });
});

module.exports = router;

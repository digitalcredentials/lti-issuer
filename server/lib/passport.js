const passport = require("passport");
const PassportLTIStrategy = require("passport-lti");
const imsLTI = require("ims-lti");
const ltiAuth = require("../config")["lti"];

const ltiStrategy = new PassportLTIStrategy(
  {
    createProvider: (req, done) => {
      const key = req.body.oauth_consumer_key;
      if (key === ltiAuth.key) {
        return done(null, new imsLTI.Provider(key, ltiAuth.secret));
      } else {
        // createProvider expects failure-to-lookup-credentials case to
        // return with a single string, not a Passport verify signature
        done("Not authorized.");
      }
    }
  },
  (ltiContext, done) => done(null, ltiContext)
);

passport.use("lti", ltiStrategy);

module.exports = passport;

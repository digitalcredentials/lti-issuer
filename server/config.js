require("dotenv").config();

const getEnvVarOrDefault = (envVar, defaultValue) => {
  defaultValue = defaultValue || envVar;
  if (!!process.env[envVar]) {
    return process.env[envVar];
  } else {
    return defaultValue;
  }
};

const getEnvVarOrNull = (envVar) => {
  if (!!process.env[envVar]) {
    return process.env[envVar];
  } else {
    return null;
  }
};

const config = {};

/* Set default values assuming NODE_ENV === production */

config.analytics = {
  id: getEnvVarOrNull("ANALYTICS_ID"),
};

config.jwtSecret = getEnvVarOrDefault("JWT_SECRET");
config.lti = {
  key: getEnvVarOrDefault("LTI_KEY"),
  secret: getEnvVarOrDefault("LTI_SECRET"),
};
config.logLevel = getEnvVarOrDefault("LOG_LEVEL", "info");
config.passportStrategy = "lti";
config.sentryDSN = getEnvVarOrNull("SENTRY_DSN");
config.trustProxy = getEnvVarOrDefault("TRUST_PROXY", "loopback");

config.database = {
  host: getEnvVarOrDefault("DB_HOST", "localhost"),
  port: getEnvVarOrDefault("DB_PORT", 5432),
  user: getEnvVarOrDefault("DB_USER", "ltiadmin"),
  name: getEnvVarOrDefault("DB_NAME", "ltiissuer"),
  password: getEnvVarOrNull("DB_PASSWORD"),
};

if (process.env.NODE_ENV === "development") {
  config.logLevel = "debug";
}

if (process.env.NODE_ENV === "test") {
  config.logLevel = "error";
}

module.exports = config;

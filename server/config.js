require("dotenv").config();

const getEnvVarOrDefault = (envVar, defaultValue) => {
  defaultValue = defaultValue || envVar;
  if (!!process.env[envVar]) {
    return process.env[envVar];
  } else {
    return defaultValue;
  }
};

const getEnvVarOrNull = envVar => {
  if (!!process.env[envVar]) {
    return process.env[envVar];
  } else {
    return null;
  }
};

const config = {};

/* Set default values assuming NODE_ENV === production */

config.analytics = {
  id: getEnvVarOrNull("ANALYTICS_ID")
};

config.buzzAPI = {
  appID: getEnvVarOrDefault("BUZZAPI_APP_ID"),
  password: getEnvVarOrDefault("BUZZAPI_PASSWORD")
};
config.canvas = {
  apiUrl: getEnvVarOrDefault("CANVAS_API_URL"),
  token: getEnvVarOrDefault("CANVAS_TOKEN")
};
config.jwtSecret = getEnvVarOrDefault("JWT_SECRET");
config.lti = {
  key: getEnvVarOrDefault("LTI_KEY"),
  secret: getEnvVarOrDefault("LTI_SECRET")
};
config.logLevel = getEnvVarOrDefault("LOG_LEVEL", "info");
config.passportStrategy = "lti";
config.sentryDSN = getEnvVarOrNull("SENTRY_DSN");
config.trustProxy = getEnvVarOrDefault("TRUST_PROXY", "loopback");

if (process.env.NODE_ENV === "development") {
  config.logLevel = "debug";
}

if (process.env.NODE_ENV === "test") {
  config.logLevel = "error";
}

module.exports = config;

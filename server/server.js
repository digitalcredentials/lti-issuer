const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const Sentry = require("@sentry/node");
const sentryDSN = require("./config")["sentryDSN"];
const logger = require("./lib/logger");

Sentry.init({ dsn: sentryDSN });

logger.info(`app version is: ${process.env.APP_VERSION}`);

const indexRouter = require("./routes");
const apiRouter = require("./routes/api");

const app = express();

app.set("trust proxy", require("./config")["trustProxy"]);

app.use(Sentry.Handlers.requestHandler());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "dist")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", indexRouter);
app.use("/api/", apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(Sentry.Handlers.errorHandler());

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

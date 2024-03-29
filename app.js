var createError = require("http-errors");
var express = require("express");
var path = require("path");
const cors = require("cors");

var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var jobsRouter = require("./routes/api/jobs");
const { header } = require("express/lib/request");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/jobs", jobsRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

let uri =
  "mongodb+srv://abdulrehman:abdulrehman@firstcluster.vkz91.mongodb.net/abddatabase?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("error connecting to mongodb", err);
  });

module.exports = app;

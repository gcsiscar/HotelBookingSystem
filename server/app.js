const express = require("express");
const cors = require("cors");

const ApiError = require("./utils/apiError");
const errorController = require("./controller/errorController");
const routes = require("./routes/routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api", routes);

//handle undefined routes
app.use("*", (req, res, next) => {
  const error = new ApiError(404, "Failed", "Route not found");
  next(error);
});

//global error handler
app.use(errorController);

module.exports = app;

// Express automatically knows that this entire function is an error handling middleware by specifying 4 parameters
const ApiError = require("../utils/apiError");
const { Error } = require("mongoose");

module.exports = (err, req, res, next) => {
  // prevent unessesary error message leakage
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  }

  //mongoose validation error
  if (err instanceof Error.ValidationError) {
    return res
      .status(400)
      .json({ status: "error", message: err.message, error: err.name });
  }

  return res
    .status(500)
    .json({ status: "error", message: "Something went wrong", error: err });
};

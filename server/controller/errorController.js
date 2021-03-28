// Express automatically knows that this entire function is an error handling middleware by specifying 4 parameters
const ApiError = require("../utils/apiError");

module.exports = (err, req, res, next) => {
  // prevent unessesary error message leakage
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  }

  return res
    .status(500)
    .json({ status: "error", message: "Something went wrong" });
};

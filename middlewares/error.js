const ErrorResponse = require("../utils/errorResponse");

// custom middleware for handling errors
const errorHandler = (err, req, res, next) => {
  let customError = { ...err };

  // log error to console
  console.log(err.stack.red);

  // mongoose bad object id err name is `CastError`
  if (err.name === "CastError") {
    const message = `Resource not found with id: ${err.value}`;
    customError = new ErrorResponse(message, 404);
  }

  res
    .status(customError.statusCode || 500)
    .json({ success: false, error: customError.message || "Server Error" });
};

module.exports = errorHandler;

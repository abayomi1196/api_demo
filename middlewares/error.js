const ErrorResponse = require("../utils/errorResponse");

// custom middleware for handling errors
const errorHandler = (err, req, res, next) => {
  let customError = { ...err };

  // log error to console
  console.log({
    err,
    errName: err.name,
    isErrArray: Array.isArray(err.errors)
  });

  // mongoose bad object id err name is `CastError`
  if (err.name === "CastError") {
    const message = `Resource not found with id: ${err.value}`;
    customError = new ErrorResponse(message, 404);
  }

  // mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value: '${err.keyValue.name}' entered`;
    customError = new ErrorResponse(message, 400);
  }

  // mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    customError = new ErrorResponse(message, 400);
  }

  res
    .status(customError.statusCode || 500)
    .json({ success: false, error: customError.message || "Server Error" });
};

module.exports = errorHandler;

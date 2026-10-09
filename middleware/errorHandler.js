const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => 
{
  let error = err;

  // Mongoose bad ObjectId
  if (err.name === "CastError") 
  {
    error = new ApiError(400, `Invalid ${err.path}: ${err.value}`);
  }

  // Mongoose duplicate key
  if (err.code === 11000)
  {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    error = new ApiError(409, `Duplicate value for ${field}. Please use another.`);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") 
  {
    const messages = Object.values(err.errors).map((e) => e.message);
    error = new ApiError(400, "Validation failed", messages);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") 
  {
    error = new ApiError(401, "Invalid token.");
  }
  if (err.name === "TokenExpiredError")
  {
    error = new ApiError(401, "Token expired.");
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";

  const response = 
  {
    success: false,
    message,
  };

  if (error.errors && error.errors.length > 0) 
  {
    response.errors = error.errors;
  }

  if (process.env.NODE_ENV === "development" && statusCode === 500) 
  {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = { errorHandler };
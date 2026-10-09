const ApiError = require("../utils/ApiError");

const authorize = (...allowedRoles) => 
{
  return (req, res, next) => 
  {
    if (!req.user) 
    {
      return next(new ApiError(401, "Not authenticated."));
    }

    if (!allowedRoles.includes(req.user.role)) 
    {
      return next(
        new ApiError(
          403,
          `Access denied. This action requires role: ${allowedRoles.join(" or ")}.`
        )
      );
    }

    next();
  };
};

module.exports = { authorize };
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

const verifyToken = async (req, res, next) => 
{
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) 
    {
      throw new ApiError(401, "Not authenticated. Please log in.");
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
  catch (err) 
     {
      throw new ApiError(401, "Invalid or expired token.");
     }

    const user = await User.findById(decoded.id);
    if (!user) 
    {
      throw new ApiError(401, "User no longer exists.");
    }

    if (!user.isActive) 
    {
      throw new ApiError(403, "Account is deactivated. Contact admin.");
    }

    req.user = user;
    next();
  } 
  catch (err) 
  {
    next(err);
  }
};

module.exports = { verifyToken };
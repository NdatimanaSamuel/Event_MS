const jwt = require("jsonwebtoken");
const Admin = require("../models/user.model");
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from headers
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user from token
      req.user = await Admin.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not Authorized" });
    }
  }
  if (!token) {
    return res.status(401).json({ message: "Not Authorized, No Token" });
  }
};

const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Unauthorized role" });
    }
    next();
  };
};


module.exports = { protect,checkRole };

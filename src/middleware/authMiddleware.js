import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * @name protect
 * @description Middleware to protect routes
 */

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "You cannot PASS!! Not authorized" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "You cannot PASS!! Not a valid token" });
  }
});

/**
 * @name admin
 * @description Middleware to check if the user is an admin
 */

const admin = (req, res, next) => {
  if (req.user & req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an Admin");
  }
};

/**
 * @name professional
 * @description Middleware to check if the user is a professional
 */

const professional = (req, res, next) => {
  if (req.user & req.user.isProfessional) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a Professional");
  }
};

export { protect, admin, professional };

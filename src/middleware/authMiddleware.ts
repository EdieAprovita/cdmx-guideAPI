import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/interfaceModels";
import User from "../models/User";

/**
 * @name protect
 * @description Protect routes with JWT
 */

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUser;

      req.user = (await User.findById(decoded.id).select("-password")) as unknown as Request["user"];

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({
        message: "Unauthorized",
        success: false,
        error: `${error}`,
      });
    }
  }
  token = req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
      success: false,
      error: "No token provided",
    });
  }
};

// export const admin = async (req: Request, res: Response, next: NextFunction) => {
//   if (req.user && (req.user.isAdmin as IUser["isAdmin"])) {
//     next();
//   } else {
//     res.status(403).json({
//       message: "Forbidden",
//       success: false,
//       error: "You are not an admin",
//     });
//   }
// };

import asyncHandler from "express-async-handler";
import User from "../models/User";
import generateToken from "../utils/generateToken";

/**
 * @description Authenticate user and get token
 * @route POST /api/auth/login
 * @access Public
 * @returns {Object} User
 */

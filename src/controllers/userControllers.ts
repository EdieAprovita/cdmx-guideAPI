import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import User from "../models/User";
import generateToken from "../utils/generateToken";

/**
 * @description Authenticate user and get token
 * @route POST /api/auth/login
 * @access Public
 * @returns {Object} User
 */

exports.login = asyncHandler(async (req: Request, res: Response | any) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
      success: false,
      error: `User ${username} not found`,
    });
  }

  const isMatch = await user.isModified(password);

  if (!isMatch) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const token = generateToken(user._id);

  res.status(200).json({
    token,
    user: {
      id: user._id,
      username: user.username,
      role: user.role,
      email: user.email,
      photo: user.photo,
      isAdmin: user.isAdmin,
      isProfessional: user.isProfessional,
    },
  });
});

/**
 * @description Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @returns {Object} User
 */

exports.register = asyncHandler(async (req: Request, res: Response | any) => {
  try {
    const { username, email, password, role } = req.body;

    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
        error: `User ${username} already exists`,
      });
    }

    const user = await User.create({
      username: username,
      email: email,
      password: password,
      role: role,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isProfessional: user.isProfessional,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "The user could not be registered",
      success: false,
      error: `${error}`,
    });
  }
});

/**
 * @description Get user profile
 * @route GET /api/auth/me
 * @access Private
 * @returns {Object} User
 */

exports.getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (user) {
    res.status(200).json({
      message: `User profile for ${user.username}`,
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      isProfessional: user.isProfessional,
      photo: user.photo,
      success: true,
    });
  } else {
    res.status(404).json({
      message: "User not found",
      success: false,
      error: `User ${id} not found`,
    });
  }
});

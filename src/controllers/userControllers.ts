import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { IUser } from "../interfaces/interfaceModels";
import User from "../models/User";
import generateToken from "../utils/generateToken";

/**
 * @description Authenticate user and get token
 * @route POST /api/auth/login
 * @access Public
 * @returns {Object} User
 */

export const login = asyncHandler(async (req: Request, res: Response | any): Promise<void> => {
  try {
    const body = req.body as Pick<IUser, "username" | "password">;

    const user = await User.findOne({ username: body.username });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
        error: `User ${body.username} not found`,
      });
    }

    const isMatch = user.isModified(body.password);

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
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: `${error}`,
    });
  }
});

/**
 * @description Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @returns {Object} User
 */

export const register = asyncHandler(async (req: Request, res: Response | any) => {
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
    res.status(404).json({
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

export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
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

/**
 * @description Update user profile
 * @route PUT /api/auth/update/me
 * @access Private
 * @returns {Object} User
 */

export const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isProfessional: updatedUser.isProfessional,
        token: generateToken(updatedUser._id),
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "The user could not be updated",
      success: false,
      error: `${error}`,
    });
  }
});

/**
 * @description Get all users
 * @route GET /api/auth/users
 * @access Private/Admin
 * @returns {Object} Users
 */

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      message: "All users",
      users: users,
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      message: "The users could not be retrieved",
      success: false,
      error: `${error}`,
    });
  }
});

/**
 * @description Delete user
 * @route DELETE /api/auth/delete/:id
 * @access Private/Admin
 */

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (user) {
      await user.remove();
      res.status(200).json({
        message: "User deleted",
        success: true,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "The user could not be deleted",
      success: false,
      error: `${error}`,
    });
  }
});

/**
 * @description Get user by id
 * @route GET /api/auth/user/:id
 * @access Private/Admin
 * @returns {Object} User
 */

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (user) {
      res.status(200).json({
        message: `User profile for ${user.username}`,
        user: user,
        success: true,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "The user could not be retrieved",
      success: false,
      error: `${error}`,
    });
  }
});

/**
 * @description Update user by id
 * @route PUT /api/auth/update/:id
 * @access Private/Admin
 * @returns {Object} User
 */

export const updateUserById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin;
      user.isProfessional = req.body.isProfessional;

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isProfessional: updatedUser.isProfessional,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "The user could not be updated",
      success: false,
      error: `${error}`,
    });
  }
});

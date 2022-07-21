import express from "express";
const router = express.Router();

import {
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  login,
  register,
  updateUserById,
  updateUserProfile,
} from "../controllers/userControllers";

//USER ROUTES
router.get("/users", getUsers);
router.get("/me", getUserProfile);
router.get("/user/:id", getUserById);
router.post("/register", register);
router.post("/login", login);
router.put("/update/me", updateUserProfile);
router.put("/update/:id", updateUserById);
router.delete("/delete/:id", deleteUser);

export default router;

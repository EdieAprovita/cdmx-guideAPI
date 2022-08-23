import express from "express";
const router = express.Router();

import {
  deleteUser,
  getUserByIdAdmin,
  getUserProfileById,
  getUsers,
  login,
  register,
  updateUserByIdAdmin,
  updateUserProfileById,
} from "../controllers/userControllers"; 

//USER ROUTES
router.get("/users", getUsers);
router.get("/me", getUserProfileById);
router.get("/user/:id", getUserByIdAdmin);
router.post("/register", register);
router.post("/login", login);
router.put("/update/me", updateUserProfileById);
router.put("/update/:id", updateUserByIdAdmin);
router.delete("/delete/:id", deleteUser);

export default router;

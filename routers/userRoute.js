import express from "express";
const userRouter = express.Router();
import User from "../models/user.js";
import {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updatePatchUser,
  deleteUser,
} from "../controllers/userControllers.js";
//post user
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
//login user

//login user
userRouter.get("/getAll", getAllUsers);
//get all users
userRouter.get("/get/:id", getUserById);
//get user by id

userRouter.delete("/delete/:id", deleteUser);
//delete user
userRouter.patch("/update/:id", updatePatchUser);
//update user
export default userRouter;

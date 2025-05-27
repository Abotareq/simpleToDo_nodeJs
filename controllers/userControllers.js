import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/erorrModel.js"; //create user
export const createUser = async (req, res, next) => {
  const { username, firstName, lastName, password } = req.body;
  const user = await User.create({
    username: username,
    firstName: firstName,
    lastName: lastName,
    password: password,
  });
  console.log(user);
  res.status(201).json({ message: "User created successfully" });
  try {
  } catch (error) {
    next(error);
  }
};
//login user
export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      next(new ErrorResponse("This is a test error", 400));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid username or password");
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({ token, id:user._id });
    }
  } catch (error) {
    next(error);
  }
};

//get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
//get user by id
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      next(new ErrorResponse("This is a test error", 400));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
//patch user
export const updatePatchUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      next(new ErrorResponse("user not found", 400));
    } else {
      user.username = req.body.username || user.username;
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.password = req.body.password || user.password;
    }
    await User.updateOne({ _id: req.params.id }, user);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};
//delete user
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      next(new ErrorResponse("user not found", 400));
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

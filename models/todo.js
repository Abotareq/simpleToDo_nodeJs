import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Schema } from "mongoose";
const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    description: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    status: {
      type: String,
      enum: ["new", "done"],
      default: "new",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const toDo = mongoose.model("Todo", todoSchema);
export default toDo;

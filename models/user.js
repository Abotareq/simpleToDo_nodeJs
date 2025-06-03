import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Schema } from "mongoose";
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
    lastName: {
        type: String,
        required: true,
        min: 3,
        max: 20,
    },
    role: {
        type: String,
        enum: ['admin', 'user','reporter'],
        default: 'user',
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },

},{
    toJSON:{
        transform(doc, ret, options) {
            delete ret.password;
            delete ret.__v;//mongoose adds __v by default for tracking
            return ret;
        }
    }
});
 userSchema.pre("save",function() {
    
    const hash =  bcrypt.hashSync(this.password,10);
    this.password = hash;    
});
const User = mongoose.model("User", userSchema);
export default User;


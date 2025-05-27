import jwt from "jsonwebtoken";
import User from "../models/user.js";
const auth = async (req, res, next) => {
  
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(401)
        .json({ message: "authorization header is required" });
    }
    /* console.log(authorization.split('"')[1]); */
    const token = authorization.split('"')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: payload.id });

    if (!user) {
      res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
 try{ } catch (error) {
    res.status(401).json({ message: "Invalid Token", error });
  }
};

export default auth;

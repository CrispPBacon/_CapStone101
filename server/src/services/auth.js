import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { User } from "../models/user.js";
import { CustomError } from "../utils/handleError.js";

dotenv.config();

async function login(username, password) {
  if (!username) throw new CustomError("Please enter your username!", 400);
  if (!password) throw new CustomError("Please enter your password!", 400);

  /* Match username and password */
  const user_data = await User.findOne({ username });
  if (!user_data) throw new CustomError("User not found!", 404);
  if (user_data.password != password)
    throw new CustomError("Password does not match!", 401);

  /* Provide access token for authentication */
  const payload = {
    _id: user_data._id,
    name: user_data.name,
    username: user_data.username,
  };

  /* Sign the payload and return the token */
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  console.log({ token });
  return token;
}

async function register({ name, age, username, password }) {
  /* Prevent username duplication */
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new CustomError("Username is already taken!", 400);
  }

  /* Save user information to database */
  const user_data = new User({ name, age, username, password });
  return await user_data.save();
}

export default { login, register };

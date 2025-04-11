import auth from "../services/auth.js";
import { CustomError } from "../utils/handleError.js";

async function login(req, res) {
  try {
    const { username, password } = req.body.data || {};
    const token = await auth.login(username, password);
    return res.status(200).json(token);
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function register(req, res) {
  try {
    const user_data = req.body.data;
    console.log(user_data);
    const user = await auth.register(user_data);
    return res
      .status(200)
      .json({ msg: "You have succesfully registered!", user });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export { login, register };

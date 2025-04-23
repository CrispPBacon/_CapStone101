import User from "./models/user.js";
import { isValidSession, loginUser } from "./services/auth.js";
import thread from "./services/thread.js";
import { UnauthorizedError } from "./utils/errors.js";

// ! AUTH CONTROLLER

/* GET http://localhost:3000/api/profile */
export async function profile(req, res, next) {
  try {
    const user = await isValidSession(req.session);
    if (!user) throw new UnauthorizedError("GET Profile error");

    const defaultProfilePath =
      "/uploads/9e43206d-2845-40e3-ae3b-ed15d35e3a96.jfif";
    const defaultProfileUrl =
      `${req.protocol}://${req.get("host")}` + defaultProfilePath;
    if (!user?.avatar) user.avatar = defaultProfileUrl;

    console.log(user);
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
}

/* POST http://localhost:3000/api/user */
export async function changeProfile(req, res, next) {
  try {
    const user_id = req.session?.user_id;
    if (!user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const avatarUrl = `${req.protocol}://${req.get("host")}/${user_id}/${
      req.file.filename
    }`;

    const filter = { _id: user_id };
    const update = {
      avatar: avatarUrl,
    };

    console.log(req.file);
    const userData = await User.findOneAndUpdate(filter, update, { new: true });
    console.log(userData);
    return res.status(200).json({ msg: "ok" });
  } catch (e) {
    next(e);
  }
}

/* POST http://localhost:3000/api/user 

  User Data E.G:
  {
    "data": {
        "email": 123email@mail.com,
        "username": "alsoriano",
        "password": "Blacks132",
        "first_name": "Allan",
        "last_name": "Soriano"
    }
  }
*/
export async function createUser(req, res, next) {
  try {
    const user = req.body.data;
    const data = await new User(user).save();
    return res.status(201).json(data);
  } catch (e) {
    next(e);
  }
}

/* POST http://localhost:3000/api/login 
  {
    "data": {
        "username": "alsoriano",
        "password": "Blacks132"
    }
  }
*/
export async function login(req, res, next) {
  try {
    const { username, password } = req.body.data || {};
    const user = await loginUser(username, password);
    req.session.user_id = user._id;

    const defaultProfilePath =
      "/uploads/9e43206d-2845-40e3-ae3b-ed15d35e3a96.jfif";
    const defaultProfileUrl =
      `${req.protocol}://${req.get("host")}` + defaultProfilePath;
    if (!user?.avatar) user.avatar = defaultProfileUrl;

    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
}

/* DELETE http://localhost:3000/api/logout */
export async function logout(req, res, next) {
  try {
    req.session.destroy();
    res.clearCookie("connect.sid");
    return res.status(200).json({ msg: "You have logged out" });
  } catch (error) {
    next(error);
  }
}

// ! TOPIC CONTROLLER

/* GET http://localhost:3000/api/topic */
export async function getAllTopic(_, res, next) {
  try {
    const data = await thread.getAllTopic();
    return res.status(200).json(data);
  } catch (e) {
    next(e);
  }
}

/* POST http://localhost:3000/api/topic */
export async function createTopic(req, res, next) {
  try {
    const { title, content } = req.body.data || {};
    const createdBy = req.session.user_id;
    const data = await thread.createNewTopic({ title, content, createdBy });
    return res.status(200).json(data);
  } catch (e) {
    next(e);
  }
}

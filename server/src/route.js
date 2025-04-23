import express from "express";
import {
  login,
  logout,
  createUser,
  createTopic,
  getAllTopic,
  profile,
  changeProfile,
} from "./controller.js";
import {
  validateLogin,
  validateSignUp,
  validateTopic,
} from "./middlewares/validators/main.js";
import { verifyAuth } from "./middlewares/auth-handler.js";
import upload from "./config/multerConfig.js";

const router = express.Router();

// ? [PUBLIC] ROUTES
router.route("/api/login").post(validateLogin, login);
router.route("/api/user").post(validateSignUp, createUser);

// ? [PRIVATE] ROUTES
router.use(verifyAuth);

// ! [AUTH] RELATED ROUTES
router.route("/api/profile").get(profile);
router
  .route("/api/profile/change-profile")
  .post(upload.single("image"), changeProfile);
router.route("/api/logout").delete(logout);

// ! [FORUM] RELATED ROUTES
router.route("/api/topic").post(validateTopic, createTopic).get(getAllTopic);
export default router;

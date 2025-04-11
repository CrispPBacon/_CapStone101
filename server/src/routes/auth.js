import express from "express";
import { verifyAuth } from "../middleware/auth.js";
import { login, register } from "../controllers/auth.js";
import { validateSignUp } from "../middleware/validation.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", validateSignUp, register);
router.get("/user", verifyAuth, (req, res) => {
  console.log(req.user.payload._id);
  return res.status(200).json({ user: req.user.payload });
});
router.get("/", verifyAuth, (req, res) => {
  return res.status(200).json({ msg: "ok" });
});

export default router;

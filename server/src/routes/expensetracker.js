import express from "express";

import {
  addExpense,
  addTeam,
  getExpenses,
  getTeam,
  getTeams,
  joinTeam,
} from "../controllers/expensetracker.js";
import { validateExpense, validateExpenses } from "../middleware/validation.js";

const router = express.Router();

router.post("/expense", validateExpense, addExpense);
router.get("/expense/:id", validateExpenses, getExpenses);

router.get("/team", getTeams);
router.get("/team/:id", getTeam);
router.post("/team", addTeam);

router.post("/team/join", joinTeam);

export default router;

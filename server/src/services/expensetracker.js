import { Expense } from "../models/expense.js";
import { UserJoin } from "../models/history.js";
import { Team } from "../models/team.js";

/*
  These functions use the 'validation.js' middleware to check the errors.
  Refer to middleware midleware/validation.js for error checkings.
*/

async function addExpense(
  user_id,
  team_id,
  { subject, merchant, amount, status }
) {
  const team = await Team.findById(team_id).select("members");
  status = status ?? "pending";
  for (const user of team.members) {
    if (user.user_id.toString() == user_id && user.role == "operator") {
      status = "accepted";
      break;
    }
  }
  const expenseFormat = {
    user_id: user_id,
    type: "team",
    team_id: team_id,
    details: {
      subject: subject.toLowerCase(),
      merchant,
      amount,
      status,
    },
  };
  const expense = new Expense(expenseFormat);

  return expense.save();
}

async function getExpenses(team_id) {
  const data = await Expense.find({ team_id })
    .sort({ createdAt: -1 })
    .populate("user_id", "name");
  return data;
}

async function getTeams(user_id) {
  const teamList = await Team.find({ "members.user_id": user_id })
    .sort({ createdAt: -1 })
    .populate("members.user_id", "name");

  return teamList;
}

async function getTeam(team_id) {
  const team = await Team.findById(team_id);
  return team;
}

async function addTeam(team) {
  const newTeam = new Team(team);
  return await newTeam.save();
}

async function joinTeam(user_id, team_id) {
  const newUser = new UserJoin({ user_id, team_id });
  return await newUser.save();
}

export default {
  addExpense,
  getExpenses,
  addTeam,
  getTeams,
  getTeam,
  joinTeam,
};

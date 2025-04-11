import expensetracker from "../services/expensetracker.js";

async function addExpense(req, res) {
  try {
    const expense = req.body.data;
    const user_id = req.user.payload._id;
    const team_id = req.body.team_id;

    const callback = await expensetracker.addExpense(user_id, team_id, expense);
    console.log(callback);
    // return res.status(200);
    return res.status(200).json(callback);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getExpenses(req, res) {
  try {
    // const team_id = req.body.data.team_id;
    const id = req.params.id;
    const callback = await expensetracker.getExpenses(id);
    return res.status(200).json(callback);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getTeams(req, res) {
  try {
    const user_id = req.user.payload._id;
    return res.status(200).json(await expensetracker.getTeams(user_id));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
async function getTeam(req, res) {
  try {
    const team_id = req.params.id;
    return res.status(200).json(await expensetracker.getTeam(team_id));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function addTeam(req, res) {
  try {
    const user_id = req.user.payload._id;
    const { name, description, budget } = req.body.data || {};
    const team = {
      name,
      description,
      budget: budget || 0,
      members: { user_id, role: "operator" },
    };
    console.log(await expensetracker.addTeam(team));
    return res.status(200).json({ msg: "OK" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function joinTeam(req, res) {
  try {
    const { team_id } = req.body.data;
    const user_id = req.user.payload._id;
    console.log(team_id, user_id);
    return res.status(200).json(expensetracker.joinTeam(user_id, team_id));
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function acceptMember(req, res) {
  try {
    const { team_id } = req.body.data;
    const user_id = req.user.payload._id;
    console.log(team_id, user_id);
    return res.status(200).json(expensetracker.joinTeam(user_id, team_id));
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export { addExpense, getExpenses, addTeam, getTeams, getTeam, joinTeam };

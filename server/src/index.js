import express from "express";
import cors from "cors";
import { connect } from "./config/db.js";

import auth from "./routes/auth.js";
import expensetracker from "./routes/expensetracker.js";

// import { validateExpense } from "./middleware/validation.js";
import { verifyAuth } from "./middleware/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

app.use([express.json(), express.urlencoded({ extended: true }), cors()]);
app.use("/api/auth", auth);
app.use("/api", verifyAuth, expensetracker);

// app.get("/", validateExpense, (req, res) => {
//   res.send("Successful!");
// });

app.listen(PORT, () => {
  console.log(`Server listening at http://${HOST}:${PORT}`);
  connect();
});

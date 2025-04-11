import { body, param, validationResult } from "express-validator";
import { ValidMongoId } from "../utils/handleError.js";
import { Team } from "../models/team.js";

/* API-level validation for services */
const validateLogin = [
  body("data.username")
    .exists()
    .withMessage("Username required")
    .bail()
    .notEmpty()
    .withMessage("Please put a valid username")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters long"),
  body("data.password")
    .exists()
    .withMessage("Password required")
    .bail()
    .notEmpty()
    .withMessage("Please put a valid username")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters long"),

  async (req, res, next) => serialize(req, res, next),
];

const validateSignUp = [
  body("data.username")
    .exists()
    .withMessage("Username required")
    .bail()
    .notEmpty()
    .withMessage("Please put a valid username"),
  body("data.name")
    .exists()
    .withMessage("Name required")
    .bail()
    .notEmpty()
    .withMessage("Please put a valid name"),
  body("data.age")
    .exists()
    .withMessage("Age required")
    .bail()
    .notEmpty()
    .withMessage("Please put a valid age")
    .bail()
    .isInt()
    .withMessage("Invalid age")
    .toInt(),
  body("data.password")
    .exists()
    .withMessage("Password required")
    .bail()
    .notEmpty()
    .withMessage("Please put a valid username")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),

  async (req, res, next) => serialize(req, res, next),
];

const validateExpense = [
  body("team_id")
    .exists()
    .withMessage("Team ID required")
    .bail()
    .custom(ValidMongoId)
    .withMessage("Team ID is invalid")
    .custom(checkAuthorization)
    .withMessage("You are not authorized to access this data"),
  body("data.subject")
    .exists()
    .withMessage("Subject required")
    .bail()
    .isString()
    .withMessage("You entered an invalid subject"),
  body("data.merchant")
    .exists()
    .withMessage("Mechant required")
    .bail()
    .isString()
    .withMessage("You entered an invalid merchant"),
  body("data.amount")
    .exists()
    .withMessage("Amount required")
    .bail()
    .isInt()
    .withMessage("You entered an invalid amount")
    .toInt(),

  async (req, res, next) => serialize(req, res, next),
];

const validateExpenses = [
  param("id")
    .exists()
    .withMessage("Please enter a valid Team ID")
    .bail()
    .custom(ValidMongoId)
    .withMessage("Team ID is invalid")
    .bail()
    .custom(checkAuthorization)
    .withMessage("You are not authorized to access this data"),
  async (req, res, next) => serialize(req, res, next),
];

async function serialize(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors.array()[0]);
    return res.status(400).json({ error: errors.array()[0] });
  }
  next();
}

// function statusValidation(value) {
//   const validValue = ["pending", "draft"];
//   if (validValue.includes(value.toLowerCase())) return true;
//   return false;
// }

async function checkAuthorization(value, { req }) {
  const user_id = req.user.payload._id;
  // console.log({ user_id, value });
  const isValid = await Team.find({ _id: value, "members.user_id": user_id });
  if (isValid == 0)
    throw new Error("You are not authorized to access this data");
  return true;
}

export { validateLogin, validateExpense, validateExpenses, validateSignUp };

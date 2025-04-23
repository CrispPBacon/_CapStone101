import {
  createFieldValidator,
  handleValidationErrors,
} from "./validation-rules.js";
import {
  isUserExist,
  isUsernameAvailable,
  isNoActiveSession,
} from "./validation-user.js";

export const validateLogin = [
  isNoActiveSession,
  createFieldValidator(["data.username"], 4, [isUserExist]),
  createFieldValidator(["data.password"], 1),
  handleValidationErrors,
];
export const validateSignUp = [
  isNoActiveSession,

  createFieldValidator(["data.email"])
    .pop()
    .isEmail()
    .withMessage("Invalid email address"),

  createFieldValidator(["data.username"], 4, [isUsernameAvailable]),
  createFieldValidator(["data.password"], 5),
  handleValidationErrors,
];

export const validateTopic = [
  createFieldValidator(["data.title", "data.content"]),
  handleValidationErrors,
];

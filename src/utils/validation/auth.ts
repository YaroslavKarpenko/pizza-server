import { authCredentials } from "../../@types/user";
import { isString, isEmail, isPassword } from "./typeGuards";

export const validateEmail = (email: unknown): string => {
  if (!isString(email) || !isEmail(email)) {
    throw new Error("Invalid email");
  }
  return email;
};

export const validatePassword = (password: unknown): string => {
  if (!isString(password) || !isPassword(password)) {
    throw new Error("Invalid password");
  }
  return password;
};

export const validateCredentials = (object: unknown): authCredentials => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("email" in object && "password" in object) {
    console.log(validateEmail(object.email));
    console.log(validatePassword(object.password));

    const validatedCredentials: authCredentials = {
      email: validateEmail(object.email),
      password: validatePassword(object.password),
    };

    return validatedCredentials;
  }
  throw new Error("Incorrect data: a field missing");
};

import { NewUserEntry } from "../../@types/user";
import { validateEmail, validatePassword } from "./auth";
import { isString, isName } from "./typeGuards";

const validateName = (name: unknown): string => {
  if (!isString(name) || !isName(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

export const toNewUser = (object: unknown): NewUserEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("email" in object && "name" in object && "password" in object) {
    const newUser: NewUserEntry = {
      email: validateEmail(object.email),
      name: validateName(object.name),
      password: validatePassword(object.password),
    };

    return newUser;
  }

  throw new Error("Incorrect data: a field missing");
};

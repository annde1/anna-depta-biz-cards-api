//Create user, delete user etc..

import { IUser } from "../@types/user";
import { User } from "../database/model/user";
import { BizCardsError } from "../error/biz-cards-error";
import { auth } from "./auth-service";

//Helper function for creating new user
const createUser = async (userData: IUser) => {
  //Create new user from the user mongoose model:
  const user = new User(userData);
  //Hash and overwrite the user's password
  user.password = await auth.hashPassword(user.password);
  //Return the user
  return user.save();
};
//TODO : generate token with id instead of email
//Helper function for validating the user (takes in email and password strings):
const validateUser = async (email: string, password: string) => {
  //Find user in the databse by the provided email
  const user = await User.findOne({ email });
  const id = user._id.toString();
  console.log(id);
  //If no user was found then throw new Error
  if (!user) {
    throw new BizCardsError("Bad credentials", 401);
  }
  //Compare password provided by user with password of the user found in the database
  const isPasswordValid = await auth.validatePassword(password, user.password);
  //If the password doesn't match then throw error
  if (!isPasswordValid) {
    throw new BizCardsError("Bad Credentials", 401);
  }
  //Credentials were correct so generate new JWT token
  const jwt = auth.generateJWT({ id });

  return { jwt };
};

export { createUser, validateUser };

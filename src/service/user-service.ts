//Create user, delete user etc..

import { IUser } from "../@types/user";
import { User } from "../database/model/user";
import { BizCardsError } from "../error/biz-cards-error";
import { auth } from "./auth-service";

//Helper function for creating new user
const createUser = async (userData: IUser) => {
  //Check if users exists in the database:
  const userExists = await existingUser(userData.email);
  if (userExists) {
    throw new BizCardsError("Email is already in use", 400);
  }
  //Create new user from the user mongoose model:
  const user = new User(userData);
  //Hash and overwrite the user's password
  user.password = await auth.hashPassword(user.password);
  //Return the user
  return user.save();
};

//Helper function for validating the user (takes in email and password strings):
const validateUser = async (email: string, password: string) => {
  //Find user in the databse by the provided email
  const user = await User.findOne({ email });
  //If user doesn't exist then throw error
  if (!user) {
    throw new BizCardsError("Bad credentials. Incorrect email", 401);
  }
  //In case user was blocked and release date > now then throw error (releaseDate is by default new Date())
  if (user.releaseDate > new Date()) {
    throw new BizCardsError("Account blocked. Try again later", 401);
  }
  //Compare password provided by user with password of the user found in the database
  const isPasswordValid = await auth.validatePassword(password, user.password);

  //Password was not valid then push new date with failed login attemps to the array
  if (!isPasswordValid) {
    user.failedloginAttempts.push(new Date());
    //If there were 3 or more failed login attemps set new releaseDate
    if (user.failedloginAttempts.length >= 3) {
      const currentDate = new Date();
      user.releaseDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }
    //Save user information in the database
    await user.save();
    //Throw error
    throw new BizCardsError("Incorrect password", 401);
  }
  //Credentials were correct so generate JWT token
  const jwt = auth.generateJWT({ email });
  return { jwt };
};

export const getAllUsers = async () => {
  //Find all users in the databse using the User mongoose model
  const allUsers = await User.find();
  if (!allUsers) {
    throw new BizCardsError("No users found", 404);
  }
  return allUsers;
};

export const getUserById = async (userId: string) => {
  //Find the user by id in database
  const user = (await User.findById(userId).lean()) as IUser;
  //If no user was found throw error
  if (!user) {
    throw new BizCardsError("User not found", 404);
  }
  //Destructure password and the rest of user information
  const { password, ...rest } = user;
  //Return user information
  return rest;
};

export const editUser = async (userId: string, requestBody: any) => {
  requestBody.password = await auth.hashPassword(requestBody.password);
  //Find and update user in database
  const savedUser = await User.findByIdAndUpdate(
    { _id: userId }, //filter
    requestBody, //data
    { new: true } //return the modified document
  ).lean();
  //If no user was found throw error
  if (!savedUser) {
    throw new BizCardsError("User not found", 404);
  }
  //Destructure password and the rest of user information
  const { password, ...rest } = savedUser;
  //Return user information
  return rest;
};

export const deleteUser = async (userId: string) => {
  ///Find user in the database and delete
  const deletedUser = await User.findOneAndDelete({ _id: userId });
  if (!deletedUser) {
    throw new BizCardsError("User not found", 404);
  }
  return deleteUser;
};

export const changeBizStatus = async (userId: string) => {
  //Find user in the database:
  const user = (await User.findById(userId).lean()) as IUser;
  //If no user was found then throw error
  if (!user) {
    throw new BizCardsError("User not found", 404);
  }
  //Set new status based on the current status
  const newStatus = !user.isBusiness;
  //Find user and update
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { isBusiness: newStatus },
    { new: true }
  );
  return updatedUser;
};

const existingUser = async (email: string) => {
  //Check if user exsists in the database:
  const user = await User.findOne({ email: email });
  //Return the user data
  return user;
};

export { createUser, validateUser };

import { Logger } from "../logs/logger";
import { User } from "./model/user";
import { users } from "./users";
//TODO: add 3 default cards
const initDb = async () => {
  //Count the amount of users in databse
  const usersCount = await User.countDocuments();
  //If there are users in database then return
  if (usersCount !== 0) return;
  //Loop over the default array of users
  for (let user of users) {
    //Create new user and save
    const saved = await new User(user).save();
    //Log that user was saved
    Logger.verbose("Added user: ", saved);
  }
};
export { initDb };

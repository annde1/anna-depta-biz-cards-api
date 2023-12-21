import { Logger } from "../logs/logger";
import { Card } from "./model/card";
import { User } from "./model/user";
import { users } from "./users";
import { cards } from "./cards";

const initializeCollection = async (
  Model: any,
  data: any[],
  modelName: string
) => {
  //Count amount of documents form the model
  const count = await Model.countDocuments();
  //If there are no documents initialize the collection with data
  if (count === 0) {
    for (let item of data) {
      const savedItem = await new Model(item).save();
      Logger.verbose(`Added ${modelName}: `, savedItem);
    }
  }
};
const initDb = async () => {
  //Initialize users collection
  await initializeCollection(User, users, "user");
  // Initialize cards collection
  await initializeCollection(Card, cards, "card");
  //Log
  Logger.verbose("Database initialization complete");
};
export { initDb };

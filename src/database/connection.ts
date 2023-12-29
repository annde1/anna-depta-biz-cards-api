import mongoose from "mongoose";
import { initDb } from "./initDb";

const connect = async () => {
  try {
    console.log("Connecting to database");
    //read the connection string from dev.env
    const connectionStr = process.env.DB_CONNECTION_STRING!;
    //If no connection string then throw error and eturn
    if (!connectionStr) {
      console.error("DB_CONNECTION_STRING IS NOT DEFINED IN your .env file");
      return;
    }
    //connect to the database
    await mongoose.connect(connectionStr, {
      dbName: "biz_cards_dev",
      serverSelectionTimeoutMS: 1000, // Defaults to 30000 (30 seconds)
      socketTimeoutMS: 1000,
      family: 4,
    });
    console.log("Database Connected");
    //init the db (inital data)
    await initDb();
  } catch (err) {
    console.error("Could Not Connect", err);
  }
};
export { connect };

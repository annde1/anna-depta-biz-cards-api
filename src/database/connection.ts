import mongoose from "mongoose";
import { initDb } from "./initDb";
const connect = async () => {
  try {
    //read the connection string from dev.env
    const connectionStr = process.env.DB_CONNECTION_STRING!;

    if (!connectionStr) {
      console.error("DB_CONNECTION_STRING IS NOT DEFINED IN your .env file");
      return;
    }
    //connect to the db. Function connect returns a promise
    await mongoose.connect(connectionStr);
    console.log("Database Connected");
    //init the db (inital data)
    await initDb();
  } catch (err) {
    console.error("Could Not Connect", err);
  }
};
export { connect };

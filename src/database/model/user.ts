import mongoose from "mongoose";
import userSchema from "../schema/user-schema";

//Model is like a class that mongoose creates for us. We can use methods like find, findOne
// 1)Define Schema
// 2) Define Model
// 3) Use Model. Methods:
const User = mongoose.model("user", userSchema); //first parameter is the name of table in db

export { User };

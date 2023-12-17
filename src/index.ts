import configDotEnv from "./config";
import express, { json } from "express";
import { usersRouter } from "./routes/users";
import { notFound } from "./middleware/not-found";
import { connect } from "./database/connection";
import morgan from "morgan";
import cors from "cors";

configDotEnv(); //choose db and set environment
connect(); //connect to db
const app = express(); //create new express app

//Parse request body to json format
app.use(json());
//Use morgan library to print to console request data
app.use(morgan("dev"));
//Go to router
app.use("/api/v1/users", usersRouter);
//If request endpoint was inncorrect then run the notFounf function
app.use(notFound);
//How to kill port:
// pnpx kill-port 8000
//Listen to request on port 8000
app.listen(8000);

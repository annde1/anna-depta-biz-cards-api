import configDotEnv from "./config";
import express, { json } from "express";
import { usersRouter } from "./routes/users";
import { notFound } from "./middleware/not-found";
import { connect } from "./database/connection";
import morgan from "morgan";
import cors from "cors";
import { cardsRouter } from "./routes/cards";
import { errorHandler } from "./middleware/error-handler";

configDotEnv(); //choose db and set environment
connect(); //connect to db
const app = express(); //create new express app
app.use(cors({ origin: "http://localhost:5173/" }));
app.use(express.static("public"));
//Parse request body to json format
app.use(json());
//Use morgan library to print to console request data
app.use(morgan("dev")); //use combined
//Go to router
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/cards", cardsRouter);
//If request endpoint was inncorrect then run the notFounf function
app.use(errorHandler);
app.use(notFound);
//Listen to request on port 8000
app.listen(8000);

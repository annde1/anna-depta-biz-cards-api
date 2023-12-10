import configDotEnv from "./config";
import express, { json } from "express";
import { userRouter } from "./routes/users";
import { logger } from "./middleware/logger";
import { notFound } from "./middleware/not-found";
import { connect } from "./database/connection";

configDotEnv(); //choose db and set environment
connect(); //connect to db
const app = express();

app.use(json());
app.use(logger);
app.use("/api/v1/users", userRouter);
app.use(notFound);
//How to kill port:
// pnpx kill-port 8000
app.listen(8000);

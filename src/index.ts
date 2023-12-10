import express from "express";
import { userRouter } from "./routes/users";
import { logger } from "./middleware/logger";
import { notFound } from "./middleware/not-found";
import { config } from "dotenv";
config({ path: "src/config/.env" }); //env library creates object in memory
const app = express();

console.log(process.env.FOO);
app.use(logger);
app.use("/api/v1/users", userRouter);
app.use(notFound);
//How to kill port:
// pnpx kill-port 8000
app.listen(8000);

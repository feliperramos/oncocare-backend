import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import * as dotenv from "dotenv";

import "./config/mongooseTimeout";
import { Routes } from "./routes";

dotenv.config();

const app = express();
app.use(json());
app.use(Routes);

const mongoURI: string = process.env.MONGO_URI!;
const serverPort: string = process.env.PORT!;

mongoose
  .connect(mongoURI, {
    autoIndex: true,
  })
  .then(() => console.log("Connect to MongoDB Server!"))
  .catch(err => console.error(err));

app.listen(serverPort, () => {
  console.log(`Oncocare App is now live on port ${serverPort}!!! 🚀🚀`);
});

import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import * as dotenv from "dotenv";

import { Routes } from "./routes";

dotenv.config();

const app = express();
app.use(json());
app.use(Routes);

const mongoURI: string = process.env.MONGO_URI!;
const serverPort: string = process.env.SERVER_PORT!;

mongoose.connect(
  mongoURI,
  {
    autoIndex: true,
  },
  () => {
    console.log("connect to mongodb!");
  },
);

app.listen(serverPort, () => {
  console.log(`listening on port ${serverPort}`);
});

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

mongoose.connect(
  mongoURI,
  {
    autoIndex: true,
  },
  () => {
    console.log("connect to mongodb!");
  },
);

app.listen(3000, () => {
  console.log("listening on port 3000");
});

import express, { Request, Response } from "express";

import { UserRouter } from "./users";
import { AuthRouter } from "./auth";

import { Authentication } from "../middleware/auth";

const app = express();
const router = express.Router();

router.use(Authentication);

router.get("/", [], async (req: Request, res: Response) => {
  res.send({ ok: true });
});

app.use("/api", UserRouter);
app.use("/api", AuthRouter);
app.use(router);

export { app as Routes };

import express, { Request, Response } from "express";
import bcrypt from "bcrypt";

import { User } from "../models/users";
import { GetToken } from "../middleware/jwt";

const router = express.Router();

router.post("/auth", [], async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return res.status(400).json({ error: "User not found" });

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).send({ error: "Invalid password" });

  user.password = "";

  res.status(200).json({ user, token: GetToken(user) });
});

export { router as AuthRouter };

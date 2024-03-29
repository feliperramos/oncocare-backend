import express, { Request, Response } from "express";

import { User } from "../models/users";
import { GetToken } from "../middleware/jwt";

const router = express.Router();

router.get("/users", [], async (req: Request, res: Response) => {
  const users = await User.find({});
  return res.status(200).json(users);
});

router.get("/users/:id", [], async (req: Request, res: Response) => {
  const users = await User.findOne({ id: req.params.id });

  return res.status(200).json(users);
});

router.post("/users", [], async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    const user = User.build({ email, password, name });
    await user.save();

    const UserToken = await User.findOne({ email });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const token = GetToken(UserToken!);

    user.password = undefined;

    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(400).json({ error: "Registration failed!" });
  }
});

router.put("/users/:id", [], async (req: Request, res: Response) => {});

router.delete("/users/:id", [], async (req: Request, res: Response) => {});

export { router as UserRouter };

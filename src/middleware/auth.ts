import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";

import { User } from "../models/users";

dotenv.config();

const AuthKey: string = process.env.AUTH_SECRET_KEY || "";

export const Authentication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: "No Token Provided" });

  const parts = authHeader.split(" ");

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).json({ error: "Token malformatted" });

  let decoded: any;
  try {
    decoded = jwt.verify(token, AuthKey);
  } catch (err) {
    console.log(err);
  }

  if (!decoded) {
    return res.status(401).json({ error: "Token Invalid" });
  }

  const users = await User.findById(decoded?.params?._id);

  if (users) {
    return next();
  } else {
    return res.status(401).json({ error: "User not found" });
  }
};

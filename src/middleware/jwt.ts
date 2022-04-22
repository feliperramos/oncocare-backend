import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";

dotenv.config();

const AuthKey: string = process.env.AUTH_SECRET_KEY!;

export const GetToken = (params: Object = {}) => {
  return jwt.sign({ params }, AuthKey, {
    expiresIn: 86400,
  });
};

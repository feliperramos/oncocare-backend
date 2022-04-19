import jwt from "jsonwebtoken";

import AuthConfig from "../config/auth.json";

export const GetToken = (params: Object = {}) => {
  return jwt.sign({ params }, AuthConfig.secret, {
    expiresIn: 86400,
  });
};

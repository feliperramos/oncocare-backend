import express, { Request, Response } from "express";

import mailer from "../config/mailer";

import { User } from "../models/users";

const router = express.Router();

router.post("/validate-token", [], async (req: Request, res: Response) => {
  const { email, token } = req.body;

  try {
    const user = await User.findOne({ email })
      .select("+passwordResetToken")
      .select("+passwordResetExpires");

    console.log(user);

    if (token !== user?.passwordResetToken) {
      res.status(404).json({
        errorCode: "difToken",
        errorMessage: "Your Token is invalid. Please try again.",
      });
    }

    if (
      user?.passwordResetExpires &&
      Date.now() > user.passwordResetExpires.getTime()
    )
      res.status(404).json({
        errorCode: "expToken",
        errorMessage:
          "Token is already expired, please try to send a new reset code.",
      });
  } catch (err) {
    res.status(400).json({ error: "Error on validate Token. Try Again!" });
  }
});

router.put("/reset-password", [], async (req: Request, res: Response) => {});

export { router as ResetPasswordRouter };

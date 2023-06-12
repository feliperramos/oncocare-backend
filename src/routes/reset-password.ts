import express, { Request, Response } from "express";
import bcrypt from "bcrypt";

import { User } from "../models/users";
import { GetToken } from "../middleware/jwt";
import { Authentication } from "../middleware/auth";

const router = express.Router();

router.post("/validate-token", [], async (req: Request, res: Response) => {
  const { email, token } = req.body;

  try {
    const user = await User.findOne({ email })
      .select("+passwordResetToken")
      .select("+passwordResetExpires");

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

    res.status(200).json({
      status: true,
      message: "Token validated!!",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      authToken: GetToken(user!),
    });
  } catch (err) {
    res.status(400).json({ error: "Error on validate Token. Try Again!" });
  }
});

router
  .use(Authentication)
  .put("/reset-password", [], async (req: Request, res: Response) => {
    const { email, newPassword } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) res.status(401).json({ message: "User not found!" });

      const now = new Date();

      const encryptPassword = await bcrypt.hash(newPassword, 10);

      await User.findByIdAndUpdate(user?.id, {
        $set: {
          password: encryptPassword,
          updated_at: now,
        },
      });

      res.status(200).json({ message: "password reset!" });
    } catch (err) {
      res.status(400).json({ error: "Error on reset password. Try Again!" });
    }
  });

export { router as ResetPasswordRouter };

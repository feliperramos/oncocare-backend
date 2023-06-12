import express, { Request, Response } from "express";

import { getRandomNumberWithSixDigits } from "../utils/getRandomNumberWithSixDigits";

import mailer from "../config/mailer";

import { User } from "../models/users";

const router = express.Router();

router.post("/forgot-password", [], async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "User not found" });

    const token = getRandomNumberWithSixDigits();

    const now = new Date();
    const expires = now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: expires,
      },
    });

    mailer.sendMail(
      {
        to: email,
        from: "feliperramos@icloud.com",
        html: `<p>Esqueceu sua senha? Utilize este token: ${token}</p>`,
      },
      error => {
        if (error)
          return res
            .status(400)
            .json({ error: "Cannot send forgot password email" });
      },
    );

    res.status(200).json({
      token,
      message: `Reset your password with this code: ${token}`,
    });
  } catch (err) {
    res.status(400).json({ error: "Error on forgot password, try again" });
  }
});

export { router as ForgotPasswordRouter };

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "@repo/backend-common/config";
import prisma from "@repo/db/client";
import { CreateUserSchema, SigninSchema } from "@repo/common/types";
import { Request, Response } from "express";
export const signup = async (req: Request, res: Response) => {
  try {
    const validated = CreateUserSchema.safeParse(req.body);

    if (!validated.success) {
      const errorMessage =
        validated.error?.errors[0]?.message || "Invalid input";
      return res.status(400).json({ message: errorMessage });
    }

    const hashedPassword = await bcrypt.hash(validated.data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: validated.data.username,
        password: hashedPassword,
        name: validated.data.name,
      },
    });

    return res
      .status(200)
      .json({ message: "User created successfully", userId: user.id });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const validateInputs = SigninSchema.safeParse(req.body);

  if (!validateInputs.success) {
    const errorMessage =
      validateInputs.error?.errors[0]?.message || "Invalid input";
    return res.status(400).json({ message: errorMessage });
  }

  const user = await prisma.user.findFirst({
    where: {
      email: validateInputs.data.username,
    },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const passwordMatch = await bcrypt.compare(
    validateInputs.data.password,
    user.password
  );

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };

  const jwtToken = jwt.sign({ userId: user.id }, config.jwtSecret, {
    expiresIn: "1h",
  });

  res.cookie("token", jwtToken, cookieOptions);

  return res.json({ message: "Logged in successfully" });
};

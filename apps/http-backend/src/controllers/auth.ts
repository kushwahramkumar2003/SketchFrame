import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "@repo/backend-common/config";
import prisma from "@repo/db/client";
import { CreateUserSchema, SigninSchema } from "@repo/common/types";
import { CustomError } from "../utils/errors";
import express from "express";

interface AuthResponse {
  message: string;
  userId?: string;
  token?: string;
}

export const signup = async (
  req: express.Request,
  res: express.Response<AuthResponse>
): Promise<express.Response<AuthResponse>> => {
  try {
    const validated = CreateUserSchema.safeParse(req.body);

    if (!validated.success) {
      throw new CustomError(
        "ValidationError",
        validated.error.errors[0]?.message || "Invalid input",
        400
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: validated.data.username },
    });

    if (existingUser) {
      throw new CustomError(
        "DuplicateError",
        "User with this email already exists",
        409
      );
    }

    const hashedPassword = await bcrypt.hash(validated.data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: validated.data.username,
        password: hashedPassword,
        name: validated.data.name,
      },
    });

    const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      message: "User created successfully",
      userId: user.id,
      token,
    });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (
  req: express.Request,
  res: express.Response<AuthResponse>
): Promise<express.Response<AuthResponse>> => {
  try {
    const validated = SigninSchema.safeParse(req.body);

    console.log(validated);

    if (!validated.success) {
      throw new CustomError(
        "ValidationError",
        validated.error.errors[0]?.message || "Invalid input",
        400
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: validated.data.username },
    });

    if (!user) {
      throw new CustomError("AuthError", "Invalid credentials", 401);
    }

    const passwordMatch = await bcrypt.compare(
      validated.data.password,
      user.password
    );

    if (!passwordMatch) {
      throw new CustomError("AuthError", "Invalid credentials", 401);
    }

    const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
      expiresIn: "1h",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      maxAge: 3600000, // 1 hour
    };

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      message: "Logged in successfully",
      userId: user.id,
      token,
    });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

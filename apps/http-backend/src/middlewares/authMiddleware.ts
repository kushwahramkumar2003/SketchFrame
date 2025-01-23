import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "@repo/backend-common/config";
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("req.cookies", req.cookies);
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret ?? "");
    console.log("decoded", decoded);
    if (typeof decoded !== "string" && decoded?.userId) {
      req.userId = decoded.userId as string;
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

export default authMiddleware;

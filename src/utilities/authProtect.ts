import { NextFunction, Request, Response } from "express";
import AppError from "./appError";
import jwt from "jsonwebtoken";

const protect = async (req: Request, res: Response, next: NextFunction) => {
  // getting token
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      return next(new AppError("Please log in to get access", 401));
    }
    jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    return next(new AppError("Invalid token", 400));
  }
};

export default {
  protect,
};

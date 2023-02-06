import { NextFunction, Request, Response } from "express";
import AppError from "./appError";
import jwt from "jsonwebtoken";
import crypto = require("crypto");
import { promisify } from "util";
import { PrismaClient } from "@prisma/client";
import catchAsync from "./catchAsync";
const prisma = new PrismaClient();

const protect = async (req: any, res: any, next: NextFunction) => {
  // getting token
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      return next(new AppError("Please log in to get access", 401));
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const fetchUser = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });
    if (!fetchUser) {
      return next(
        new AppError("The user belonging to this token does not exist", 401)
      );
    }

    req.user = fetchUser;
    console.log(req.user);
    next();
  } catch (err) {
    return next(new AppError("Invalid token", 400));
  }
};

const retrictTo = (...roles: any[]) => {
  return (req: any, res: any, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You do not have to perform this action", 403));
    }
    next();
  };
};

export default {
  protect,
  retrictTo,
};

import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient, Prisma, Role } from "@prisma/client";
import { signUpUser } from "../types/user/user";
import signedIn from "../utilities/signedIn";
import AppError from "../utilities/appError";
import catchAsync from "../utilities/catchAsync";

const prisma = new PrismaClient();
const createSendToken = (user, statusCode, res) => {
  const token = signedIn(user._id);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const createNewUser = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password }: signUpUser = req.body;
  const createUserSchema: Prisma.UserCreateInput = {
    name: name,
    email: email,
    password: password,
  };
  await prisma.user
    .create({
      data: createUserSchema,
    })
    .then((data) => {
      createSendToken(data, 201, res);
    });
});
const fetchAllUser = catchAsync(async (req: Request, res: Response) => {
  await prisma.user.findMany({}).then((data) => {
    return res.status(201).json({ data });
  });
});
const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400)); // bad request
    }

    const userExit = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    const correct = bcrypt.compareSync(password, userExit?.password || "1212");

    if (!userExit || !correct) {
      return next(new AppError("Invalid email or password", 401)); // unauthorized
    }

    if (userExit && correct) {
      const token = signedIn(userExit.id);
      res.locals.user = userExit;
      res.status(200).json({
        status: "success",
        token,
      });
    }
  }
);
const retrictTo = (...roles: any[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("local", res.locals.user);
    if (!roles.includes(res.locals.user)) {
      return next(new AppError("You do not have to perform this action", 403));
    }
    next();
  };
};
export default {
  createNewUser,
  fetchAllUser,
  login,
  retrictTo,
};

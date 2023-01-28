import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient, Prisma, Role } from "@prisma/client";
import { signUpUser } from "../types/user/user";
import signedIn from "../utilities/signedIn";
import AppError from "../utilities/appError";
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

const createNewUser = async (req: Request, res: Response) => {
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
      createSendToken(data, 201, res)
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ err });
    });
};
const fetchAllUser = async (req: Request, res: Response) => {
  await prisma.user
    .findMany({})
    .then((data) => {
      return res.status(201).json({ data });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ err });
    });
};
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
      res.locals.user = userExit
      res.status(200).json({
        status: "success",
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
};
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
  retrictTo
};

import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
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
  const { name, email, password, role }: signUpUser = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const createUserSchema: Prisma.UserCreateInput = {
    name: name,
    email: email,
    password: hashPassword,
    role: role,
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
      res.status(200).json({
        status: "success",
        token,
      });
    }
  }
);
const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body.email;
    const user = await prisma.user.findFirstOrThrow({
      where: {
        email: email,
      },
    });
    if (!user) {
      return next(new AppError("There is no user with email ", 404));
    }
    const generateToken = crypto.randomBytes(32).toString("hex");
    const resetToken = crypto
      .createHash("sha256")
      .update(generateToken)
      .digest("hex");
    const resetDate = new Date().toISOString();

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordResetToken: resetToken,
      },
    });
  }
);
export default {
  createNewUser,
  fetchAllUser,
  login,
  forgotPassword,
};

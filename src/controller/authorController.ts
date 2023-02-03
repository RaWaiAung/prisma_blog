import { NextFunction, Request, Response } from "express";

import { Prisma, PrismaClient } from "@prisma/client";
import catchAsync from "../utilities/catchAsync";
import AppError from "../utilities/appError";

const prisma = new PrismaClient();

const me = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const getme = await prisma.user.findUnique({
    where: {
      id: req.body.userId,
    },
  });
  if(!getme) {
    return next(new AppError('No tour found with that Id', 404));
  }
  res.status(200).json({ getme });
});

const uploadProfile = catchAsync(async (req: Request, res: Response) => {
  const userProfileSchema: Prisma.UserUpdateInput = {
    Profile: {
      create: {
        image: req.body.image,
        bio: req.body.bio,
      },
    },
  };
  await prisma.user
    .update({
      where: {
        email: req.body.email,
      },
      data: userProfileSchema,
    })
    .then((data) => {
      return res.status(200).json({ data });
    });
});

export default {
  me,
  uploadProfile,
};

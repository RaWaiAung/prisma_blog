import { NextFunction, Request, Response } from "express";

import { Prisma, PrismaClient } from "@prisma/client";
import catchAsync from "../utilities/catchAsync";

const prisma = new PrismaClient();

const me = catchAsync(async (req: Request, res: Response) => {
  await prisma.user
    .findUnique({
      where: {
        id: res.locals.user.id,
      },
    })
    .then((data) => {
      return res.status(200).json({ data });
    });
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

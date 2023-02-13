import { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import catchAsync from "../utilities/catchAsync";
import AppError from "../utilities/appError";
import { filtetObj } from "../utilities/handleForm";

const prisma = new PrismaClient();

const me = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const getme = await prisma.user.findUnique({
      where: {
        id: req.body.userId,
      },
    });
    if (!getme) {
      return next(new AppError("No tour found with that Id", 404));
    }
    res.status(200).json({ getme });
  }
);

const uploadProfile = catchAsync(async (req: Request, res: Response) => {
  const filterBody = filtetObj(req.body, "bio");
  if (req.file) filterBody.image = req.file.filename;
  const userProfileSchema: Prisma.UserUpdateInput = {
    Profile: {
      create: {
        image: filterBody.image,
        bio: filterBody.bio,
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

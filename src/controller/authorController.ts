import { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import catchAsync from "../utilities/catchAsync";
import AppError from "../utilities/appError";
import { filtetObj } from "../utilities/handleForm";

const prisma = new PrismaClient();

const me = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  const getme = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });
  if (!getme) {
    return next(new AppError("No user found with that Id", 404));
  }
  res.status(200).json({ getme });
});

const uploadProfile = catchAsync(async (req, res: Response) => {
  const filterBody = filtetObj(req.body, "bio");
  console.log(req.user);
  if (req.file) filterBody.image = req.file.filename;
  await prisma.profile
    .update({
      where: {
        userEmail: req.user.email,
      },
      data: {
        image: filterBody.image,
        bio: filterBody.bio,
      },
    })
    .then((data) => {
      return res.status(200).json({ data });
    });
});

const deleteMe = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const getme = await prisma.user.delete({
      where: {
        id: req.user.id,
      },
    });
    if (!getme) {
      return next(new AppError("No user found with that Id", 404));
    }
    res.status(200).json({ getme });
  }
);

const updateUser = catchAsync(async (req: any, res: Response) => {
  const { name, email, role } = req.body;
  const updatedUser = await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      name: name,
      email: email,
      role: role,
    },
  });
  res.status(200).json({ updatedUser });
});
export default {
  me,
  uploadProfile,
  deleteMe,
  updateUser,
};

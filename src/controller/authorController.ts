import { NextFunction, Request, Response } from "express";

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const me = async (req: Request, res: Response) => {
  await prisma.user
    .findUnique({
      where: {
        id: res.locals.user.id,
      },
    })
    .then((data) => {
      return res.status(200).json({ data });
    })
    .catch((err) => {
      console.log(err);
      console.log(res.locals.user);
      return res.status(500).json({ err });
    });
};
const uploadProfile = async (req: Request, res: Response) => {
  const userProfileSchema : Prisma.UserUpdateInput = {
    Profile: {
      create: {
        image: req.body.image,
        bio: req.body.bio
      }
    },
  }
  await prisma.user
    .update({
      where: {
        email: req.body.email,
      },
      data: userProfileSchema
    })
    .then((data) => {
      return res.status(200).json({ data });
    })
    .catch((err) => {
      console.log(err);
      console.log(res.locals.user);
      return res.status(500).json({ err });
    });
};
export default {
  me,
  uploadProfile
};

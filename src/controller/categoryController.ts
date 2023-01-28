import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const { tag } = new PrismaClient();

export const createNewCategory = (req: Request, res: Response) => {
  const { tagName } = req.body;
  const tagInputSchema: Prisma.TagCreateInput = {
    hashtag: tagName,
  };
  tag
    .create({
      data: tagInputSchema,
    })
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(200).json({
        status: "fail",
        message: err.message,
      });
    });
};

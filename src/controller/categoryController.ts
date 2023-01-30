import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import catchAsync from "../utilities/catchAsync";

const { tag } = new PrismaClient();

export const createNewCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { tagName } = req.body;
    const tagInputSchema: Prisma.TagCreateInput = {
      hashtag: tagName,
    };
    await tag
      .create({
        data: tagInputSchema,
      })
      .then((data) => {
        res.status(200).json({
          status: "success",
          data: data,
        });
      });
  }
);

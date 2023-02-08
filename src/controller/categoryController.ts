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
        res.status(201).json({
          status: "success",
          data: data,
        });
      });
  }
);

export const deleteCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { tag_id } = req.params;
    await tag
      .delete({
        where: {
          id: tag_id,
        },
      })
      .then((data) => {
        res.status(200).json({
          status: "success",
          data: data,
        });
      });
  }
);

export const editCategory = catchAsync(async (req: Request, res: Response) => {
  const { tag_id } = req.params;
  const { tagName } = req.body;
  const tagUpdateSchema: Prisma.TagUpdateInput = {
    hashtag: tagName,
  };
  await tag
    .update({
      where: {
        id: tag_id,
      },
      data: tagUpdateSchema,
    })
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
      });
    });
});

export const fetchCategory = catchAsync(async (req: Request, res: Response) => {
  const { tag_id } = req.params;
  await tag
    .findUnique({
      where: {
        id: tag_id,
      },
      include: {
        TagsOnPost: true
      }
    })
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
      });
    });
});

export const fetchAllCategory = catchAsync(
  async (req: Request, res: Response) => {
    await tag
      .findMany({
        include: {
          TagsOnPost: true,
        },
      })
      .then((data) => {
        res.status(200).json({
          status: "success",
          data: data,
        });
      });
  }
);

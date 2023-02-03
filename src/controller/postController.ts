import { Prisma, prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import catchAsync from "../utilities/catchAsync";

const { post } = new PrismaClient();

export const createNewPost = catchAsync(async (req: Request, res: Response) => {
  const { title, content, authorId, tagList } = req.body;
  const postInputSchema: Prisma.PostCreateInput = {
    title: title,
    content: content,
    author: {
      connect: {
        id: authorId,
      },
    },
    TagsOnPost: {
      create: tagList.split(",").map((id: string) => ({
        tagId: id,
      })),
    },
  };
  await post
    .create({
      data: postInputSchema,
    })
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
      });
    });
});

export const editPost = catchAsync(async (req: Request, res: Response) => {
  const { post_id } = req.params;
  const { title, content, authorId, tagList } = req.body;
  await post
    .update({
      where: {
        id: post_id,
      },
      data: {
        title: title,
        content: content,
        author: {
          connect: {
            id: authorId,
          },
        },
        TagsOnPost: {
          disconnect: [
            tagList.split(",").map((id: string) => ({
              notIn: { tagId: id },
            })),
          ],
        },
      },
    })
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
      });
    });
});

export const fetchAllPost = catchAsync((req: Request, res: Response) => {
  post
    .findMany({
      include: {
        author: true,
        TagsOnPost: true,
      },
    })
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json({
          status: "success",
          data: data,
        });
      }
    });
});

export const fetchSinglePost = catchAsync((req: Request, res: Response) => {
  const { post_id } = req.params;
  post
    .findUniqueOrThrow({
      where: {
        id: post_id,
      },
      include: {
        author: true,
        TagsOnPost: true,
      },
    })
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
      });
    });
});

export const deletePostById = catchAsync((req: Request, res: Response) => {
  const { post_id } = req.params;
  post
    .delete({
      where: {
        id: post_id,
      },
      include: {
        author: true,
        TagsOnPost: true,
      },
    })
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
      });
    });
});

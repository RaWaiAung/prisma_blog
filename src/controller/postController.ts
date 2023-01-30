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

// export const fetchAllPosRoles = (req: Request, res: Response) => {
//   pOSRole
//     .findMany({
//       include: {
//         PermissionOnRole: {
//           include: {
//             Permission: {
//               select: {
//                 name: true,
//                 route: true
//               }
//             }
//           }
//         },
//         User: true,
//       },
//     })
//     .then((data) => {
//       if (data.length > 0) {
//         Responser({
//           res,
//           status: 200,
//           body: data,
//           message: "pos role list fetch successfully.",
//           devMessage: "",
//         });
//       } else {
//         Responser({
//           res,
//           status: 404,
//           body: [],
//           message: "empty",
//           devMessage: "",
//         });
//       }
//     })
//     .catch((err) => {
//       Responser({
//         res,
//         status: 500,
//         body: null,
//         message: err,
//         devMessage: "",
//       });
//     });
// };

// export const fetchPosRoleById = (req: Request, res: Response) => {
//   const { posRole_id } = req.params;
//   pOSRole
//     .findUniqueOrThrow({
//       where: {
//         id: parseInt(posRole_id),
//       },
//       include: {
//         PermissionOnRole: true,
//         User: true,
//       },
//     })
//     .then((data) => {
//       if (data) {
//         Responser({
//           res,
//           status: 200,
//           body: data,
//           message: `pos role id : ${posRole_id} fetch  successfully.`,
//           devMessage: "",
//         });
//       } else {
//         Responser({
//           res,
//           status: 404,
//           body: [],
//           message: "empty",
//           devMessage: "",
//         });
//       }
//     })
//     .catch((err) => {
//       Responser({
//         res,
//         status: 500,
//         body: null,
//         message: err,
//         devMessage: "",
//       });
//     });
// };

// export const deletePosRoleById = (req: Request, res: Response) => {
//   const { posRole_id } = req.params;
//   pOSRole
//     .delete({
//       where: {
//         id: parseInt(posRole_id),
//       },
//       include: {
//         PermissionOnRole: true,
//         User: true,
//       },
//     })
//     .then((data) => {
//       if (data) {
//         Responser({
//           res,
//           status: 200,
//           body: data,
//           message: `pos role id : ${posRole_id} deleted successfully.`,
//           devMessage: "",
//         });
//       } else {
//         Responser({
//           res,
//           status: 404,
//           body: [],
//           message: "empty",
//           devMessage: "",
//         });
//       }
//     })
//     .catch((err) => {
//       Responser({
//         res,
//         status: 500,
//         body: null,
//         message: err,
//         devMessage: "",
//       });
//     });
// };

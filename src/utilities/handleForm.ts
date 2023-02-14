import { NextFunction, Request, Response } from "express";
import multer from "multer";
import sharp from "sharp";

import AppError from "./appError";
import catchAsync from "./catchAsync";

const multerStorage = multer.memoryStorage();
const multerFilter = (req: Request, file: any, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const filtetObj: any = (obj: object, ...allowedFields: any) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
export const resizeUserPhoto = catchAsync(async (req, res: Response, next: NextFunction) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

export const uploadUserPhoto = upload.single("image");

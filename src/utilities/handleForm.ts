import { NextFunction, Request, Response } from "express";
import multer from "multer";
import AppError from "./appError";

const multerStorage = multer.memoryStorage();
const multerFilter = (req: Request, file: any, cb) => {
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

export const uploadUserPhoto = upload.single("image");

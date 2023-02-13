import { Router } from "express";

import userController from "../controller/authorController";
import auth from "../utilities/authProtect";
import { uploadUserPhoto } from "../utilities/handleForm";
const userRouter = Router();

userRouter.get("/me", auth.protect, userController.me);
userRouter.post("/uploadProfile",uploadUserPhoto, auth.protect, userController.uploadProfile);

export default userRouter;

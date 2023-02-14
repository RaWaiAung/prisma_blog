import { Router } from "express";

import userController from "../controller/authorController";
import auth from "../utilities/authProtect";
import { resizeUserPhoto, uploadUserPhoto } from "../utilities/handleForm";
const userRouter = Router();

userRouter.use(auth.protect);
userRouter.get("/me", userController.me);
userRouter.patch("/update-user", userController.updateUser);
userRouter.post("/upload-profile",uploadUserPhoto, resizeUserPhoto, userController.uploadProfile);
userRouter.delete("/delete-me", userController.deleteMe);

export default userRouter;

import { Router } from "express";
import userController from "../controller/authorController";
import auth from "../utilities/authProtect";
const userRouter = Router();

userRouter.get("/me", auth.protect, userController.me);
userRouter.post("/uploadProfile", auth.protect, userController.uploadProfile);

export default userRouter;

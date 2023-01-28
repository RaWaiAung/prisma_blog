import { Router } from "express";
import authController from "../controller/authController";
import auth from "../utilities/authProtect";
const authRouter = Router();

authRouter.post("/signUp", authController.createNewUser);
authRouter.get("/fetch-all-user", auth.protect,authController.fetchAllUser);
authRouter.post("/login", authController.login);

export default authRouter;

import { Router } from "express";
import authController from "../controller/authController";
import auth from "../utilities/authProtect";
const authRouter = Router();

authRouter.post("/signUp", authController.createNewUser);
authRouter.get("/fetch-all-user", auth.protect, auth.retrictTo('Admin'),authController.fetchAllUser);
authRouter.post("/login", authController.login);
authRouter.post("/forgetpassword", authController.forgotPassword);

export default authRouter;

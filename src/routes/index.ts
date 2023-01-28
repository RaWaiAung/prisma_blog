import { Router } from "express";
import authRouter from "./authRoute";
import categoryRouter from "./categoryRoute";
import postRouter from "./postRoute";
import userRouter from "./userRoute";

const allRoutes: Router = Router();

allRoutes.use("/auth", authRouter);
allRoutes.use("/post", postRouter);
allRoutes.use("/tag", categoryRouter);
allRoutes.use("/user", userRouter);

export default allRoutes;

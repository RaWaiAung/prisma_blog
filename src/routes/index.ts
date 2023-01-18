import { Router } from "express";
import authRouter from "./authRoute";

const allRoutes: Router = Router();

allRoutes.use("/auth", authRouter);

export default allRoutes;

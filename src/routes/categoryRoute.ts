import { Router } from "express";
import {createNewCategory} from "../controller/categoryController";
import auth from "../utilities/authProtect";
const categoryRouter = Router();

categoryRouter.post("/create-new-tag", auth.protect, createNewCategory);

export default categoryRouter;

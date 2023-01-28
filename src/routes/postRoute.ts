import { Router } from "express";
import {createNewPost} from "../controller/postController";
import auth from "../utilities/authProtect";
const postRouter = Router();

postRouter.post("/create-new-post", auth.protect, createNewPost);

export default postRouter;

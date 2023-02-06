import { Router } from "express";
import {
  createNewPost,
  deletePostById,
  editPost,
  fetchAllPost,
  fetchSinglePost,
} from "../controller/postController";
import auth from "../utilities/authProtect";
const postRouter = Router();

postRouter.post("/create-new-post", auth.protect, auth.retrictTo() , createNewPost);
postRouter.get("/fetch-all-post", auth.protect, fetchAllPost);
postRouter.patch("/edit-post", auth.protect, editPost);
postRouter.get("/fetch-single-post", auth.protect, fetchSinglePost);
postRouter.delete("/delete-post", auth.protect, deletePostById);

export default postRouter;

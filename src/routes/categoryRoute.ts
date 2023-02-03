import { Router } from "express";
import {
  createNewCategory,
  deleteCategory,
  editCategory,
  fetchAllCategory,
  fetchCategory,
} from "../controller/categoryController";
import auth from "../utilities/authProtect";
const categoryRouter = Router();

categoryRouter.post("/create-new-tag", auth.protect, createNewCategory);
categoryRouter.patch("/edit-tag", auth.protect, editCategory);
categoryRouter.get("/fetch-single-tag/:tag_id", auth.protect, fetchCategory);
categoryRouter.delete("/delete-tag/:tag_id", auth.protect, deleteCategory);
categoryRouter.get("/fetch-all-tags", auth.protect, fetchAllCategory);

export default categoryRouter;

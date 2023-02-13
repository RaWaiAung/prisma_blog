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

categoryRouter.post(
  "/create-new-tag",
  auth.protect,
  auth.retrictTo("SuperAdmin"),
  createNewCategory
);
categoryRouter.patch(
  "/edit-tag",
  auth.protect,
  auth.retrictTo("User"),
  editCategory
);
categoryRouter.get("/fetch-single-tag/:tag_id", auth.protect, fetchCategory);
categoryRouter.delete(
  "/delete-tag/:tag_id",
  auth.protect,
  auth.retrictTo("SuperAdmin"),
  deleteCategory
);
categoryRouter.get(
  "/fetch-all-tags",
  auth.protect,
  auth.retrictTo("SuperAdmin", "User", "Admin"),
  fetchAllCategory
);

export default categoryRouter;

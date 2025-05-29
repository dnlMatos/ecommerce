import { Router } from "express";
import auth from "../middleware/auth";
import {
  AddSubCategoryController,
  deleteSubCategoryController,
  getSubCategoryController,
  updateSubCategoryController,
} from "../controllers/subCategory.controller";

const subCategoryRouter = Router();

subCategoryRouter.post("/create", auth, AddSubCategoryController);
subCategoryRouter.get("/get", getSubCategoryController);
subCategoryRouter.put("/update", auth, updateSubCategoryController);
subCategoryRouter.delete("/delete", auth, deleteSubCategoryController);

export default subCategoryRouter;

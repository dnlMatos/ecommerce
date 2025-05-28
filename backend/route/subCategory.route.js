import { Router } from "express";
import auth from "../middleware/auth";
import {
  AddSubCategoryController,
  getSubCategoryController,
} from "../controllers/subCategory.controller";

const subCategoryRouter = Router();

subCategoryRouter.post("/create", auth, AddSubCategoryController);
subCategoryRouter.get("/get", getSubCategoryController);

export default subCategoryRouter;

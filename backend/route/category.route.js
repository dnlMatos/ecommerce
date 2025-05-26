import { Router } from "express";
import {
  AddCategoryController,
  deleteCategoryController,
  getCategoryController,
  updateCategoryController,
} from "../controllers/category.controller.js";
import auth from "../middleware/auth.js";

const categoryRoute = Router();

categoryRoute.post("/add-category", auth, AddCategoryController);
categoryRoute.put("/update", auth, updateCategoryController);
categoryRoute.get("/get", getCategoryController);
categoryRoute.delete("/delete", auth, deleteCategoryController);

export default categoryRoute;

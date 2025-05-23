import { Router } from "express";
import { AddCategoryController } from "../controllers/category.controller.js";
import auth from "../middleware/auth.js";

const categoryRoute = Router();

categoryRoute.post("/add-category", auth, AddCategoryController);
export default categoryRoute;

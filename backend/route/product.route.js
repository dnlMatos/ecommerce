import { Router } from "express";
import {
  createProductController,
  getProductController,
} from "../controllers/product.controller.js";
import auth from "../middleware/auth.js";

const productRouter = Router();

productRouter.post("/create", auth, createProductController);
productRouter.get("/get", getProductController);

export default productRouter;

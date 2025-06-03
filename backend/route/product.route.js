import { Router } from "express";
import { createProductController } from "../controllers/product.controller.js";
import auth from "../middleware/auth.js";

const productRouter = Router();

productRouter.post("/create", auth, createProductController);

export default productRouter;

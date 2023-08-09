import { Router } from "express";
import { isAdmin, isLoggedin, isUser } from '../middlewares/auth.js';
import { viewsController } from "../controllers/views.controller.js";


export const viewRouter = Router()


viewRouter.get("/realtimeproducts",isUser, viewsController.viewRealTime);

viewRouter.get("/products", isLoggedin, viewsController.getAllProducts);

viewRouter.get("/cart/:cid", isUser, viewsController.getCartById);
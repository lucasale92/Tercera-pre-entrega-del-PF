import { Router } from "express";
import {pdctRouter} from "./products.router.js";
import {cartRouter} from "./cart.router.js";

export const apiRouter = Router()

apiRouter.use("/products", pdctRouter)
apiRouter.use("/carts", cartRouter)
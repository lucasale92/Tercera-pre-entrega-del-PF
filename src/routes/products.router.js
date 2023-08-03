import  express  from "express";
 export const productsRouter = express.Router();
import { uploader } from "../utils.js";
import { productsController } from "../controller/products.controller.js";

//GET = OBTENER TODOS
productsRouter.get("/", productsController.getAll);
//GET = OBTENER POR ID
productsRouter.get('/:id', productsController.getbyId);
//POST = CREAR
productsRouter.post('/', uploader.single('thumbnail') ,  productsController.createOne);
//PUT = MODIFICAR
productsRouter.put('/:id', productsController.updateOne);
//ELIMINAR
productsRouter.delete('/:id', productsController.deletOne);
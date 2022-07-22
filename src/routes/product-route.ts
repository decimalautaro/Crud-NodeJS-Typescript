import { request, response, Router } from "express";
import ProductController from "../controllers/ProductController"


const routerProduct = Router();

const productController = new ProductController();


routerProduct.get("/products", productController.list);

routerProduct.get("/add-product", productController.add);

routerProduct.post("/add-product", productController.create);

routerProduct.get("/search-product", productController.search);

routerProduct.get("/edit-product", productController.edit);

routerProduct.post("/edit-product", productController.update);

routerProduct.post("/delete-product", productController.delete);

export { routerProduct };


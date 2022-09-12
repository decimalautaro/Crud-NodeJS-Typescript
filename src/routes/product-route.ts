import { request, response, Router } from "express";
import ProductController from "../controllers/ProductController"
import auth from '../lib/auth'

const routerProduct = Router();

const productController = new ProductController();


routerProduct.get("/products",auth.isLoggedIn, productController.list);

routerProduct.get("/add-product",auth.isLoggedIn, productController.add);

routerProduct.post("/add-product",auth.isLoggedIn, productController.create);

routerProduct.get("/search-product",auth.isLoggedIn, productController.search);

routerProduct.get("/edit-product",auth.isLoggedIn, productController.edit);

routerProduct.post("/edit-product",auth.isLoggedIn, productController.update);

routerProduct.post("/delete-product", productController.delete);

export { routerProduct };


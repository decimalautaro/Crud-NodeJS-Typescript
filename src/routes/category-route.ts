import { request, response, Router } from "express";
import CategoryController from "../controllers/CategoryController"
import auth from '../lib/auth'

const routerCategory = Router();

const categoryController = new CategoryController();


routerCategory.get("/category",auth.isLoggedIn, categoryController.list);

routerCategory.get("/add-category",auth.isLoggedIn, (request, response) => {
  response.render("../views/category/category-add");
});

routerCategory.post("/add-category",auth.isLoggedIn, categoryController.create);

routerCategory.get("/search-category",auth.isLoggedIn, categoryController.search);

routerCategory.get("/edit-category",auth.isLoggedIn, categoryController.edit);

routerCategory.post("/edit-category",auth.isLoggedIn, categoryController.update);

routerCategory.post("/delete-category",auth.isLoggedIn, categoryController.delete);

export { routerCategory };
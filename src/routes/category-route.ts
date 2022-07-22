import { request, response, Router } from "express";
import CategoryController from "../controllers/CategoryController"


const routerCategory = Router();

const categoryController = new CategoryController();


routerCategory.get("/category", categoryController.list);

routerCategory.get("/add-category", (request, response) => {
  response.render("../views/category/category-add");
});

routerCategory.post("/add-category", categoryController.create);

routerCategory.get("/search-category", categoryController.search);

routerCategory.get("/edit-category", categoryController.edit);

routerCategory.post("/edit-category", categoryController.update);

routerCategory.post("/delete-category", categoryController.delete);

export { routerCategory };
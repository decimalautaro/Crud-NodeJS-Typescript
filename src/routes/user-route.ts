import { request, response, Router } from "express";
import UserController from "../controllers/UserController"


const routerUser = Router();

const userController = new UserController();

routerUser.get("/", (request, response) => {
  response.render("../views/index");
});
routerUser.get("/users", userController.list);

routerUser.get("/add-user", (request, response) => {
  response.render("../views/users/user-add");
});

routerUser.post("/user-add", userController.create);

routerUser.get("/search", userController.search);

routerUser.get("/user-edit", userController.edit);

routerUser.post("/edit-user", userController.update);

routerUser.post("/user-delete", userController.delete);

export { routerUser };
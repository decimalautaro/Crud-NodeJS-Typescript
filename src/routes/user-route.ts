import { request, response, Router } from "express";
import UserController from "../controllers/UserController"
import auth from '../lib/auth'

const routerUser = Router();

const userController = new UserController();

routerUser.get("/", auth.isLoggedIn, (request, response) => {
  response.render("../views/index");
});
routerUser.get("/users",auth.isLoggedIn, userController.list);

routerUser.get("/add-user", (request, response) => {
  response.render("../views/users/user-add");
});

routerUser.post("/user-add",auth.isLoggedIn, userController.create);

routerUser.get("/search",auth.isLoggedIn, userController.search);

routerUser.get("/user-edit",auth.isLoggedIn, userController.edit);

routerUser.post("/edit-user",auth.isLoggedIn, userController.update);

routerUser.post("/user-delete",auth.isLoggedIn, userController.delete);

export { routerUser };

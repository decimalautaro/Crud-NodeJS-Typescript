import { request, response, Router } from "express";
import UserController from "../controllers/UserController"


const router = Router();

const userController = new UserController();

router.get("/", (request, response) => {
  response.render("../views/index");
});
router.get("/users", userController.list);

router.get("/add-user", (request, response) => {
  response.render("../views/users/user-add");
});

router.post("/user-add", userController.create);

router.get("/search", userController.search);

router.get("/user-edit", userController.edit);

router.post("/edit-user", userController.update);

router.post("/user-delete", userController.delete);

export { router };
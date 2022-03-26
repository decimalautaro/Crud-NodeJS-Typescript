import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import { GetUserDataController } from "./controllers/GetUserDataController";
import { ListUsersController } from "./controllers/ListUsersController";
import { SearchUserController } from "./controllers/SearchUserController";
import { UpdateUserController } from "./controllers/UpdateUserController";

const router = Router();

const createUserController = new CreateUserController();
const searchUserController = new SearchUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const listUsersController = new ListUsersController();
const getUserDataController = new GetUserDataController();

router.get("/", listUsersController.handle);

router.get("/add", (request, response) => {
  response.render("add");
});

router.post("/add-user", createUserController.handle);

router.get("/search", searchUserController.handle);

router.get("/edit", getUserDataController.handle);

router.post("/edit-user", updateUserController.handle);

router.post("/delete-user", deleteUserController.handle);

export { router };

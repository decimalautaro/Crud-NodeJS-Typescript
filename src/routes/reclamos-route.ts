import { request, response, Router } from "express";
import ReclamoController from "../controllers/ReclamoController"
import auth from '../lib/auth'

const routerReclamo = Router();

const reclamoController = new ReclamoController();

routerReclamo.get("/reclamos",auth.isLoggedIn, reclamoController.list);

routerReclamo.get("/add-reclamo", (request, response) => {
  response.render("../views/reclamos/reclamo-add");
});

routerReclamo.post("/user-add",auth.isLoggedIn, reclamoController.create);

routerReclamo.get("/search",auth.isLoggedIn, reclamoController.search);

routerReclamo.get("/user-edit",auth.isLoggedIn, reclamoController.edit);

routerReclamo.post("/edit-user",auth.isLoggedIn, reclamoController.update);

routerReclamo.post("/user-delete",auth.isLoggedIn, reclamoController.delete);

export { routerReclamo };
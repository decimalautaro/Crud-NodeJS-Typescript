import { request, response, Router } from "express";
import ReclamoController from "../controllers/ReclamoController"
import auth from '../lib/auth'

const routerReclamo = Router();

const reclamoController = new ReclamoController();

routerReclamo.get("/reclamos", reclamoController.list);

routerReclamo.get("/add-reclamo", (request, response) => {
  response.render("../views/reclamos/reclamo-add");
});

routerReclamo.post("/reclamo-add", reclamoController.create);

routerReclamo.get("/search-reclamo", reclamoController.search);

routerReclamo.get("/reclamo-edit", reclamoController.edit);

routerReclamo.post("/edit-reclamo", reclamoController.update);

routerReclamo.post("/reclamo-delete", reclamoController.delete);

export { routerReclamo };
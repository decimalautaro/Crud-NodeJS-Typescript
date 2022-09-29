import { request, response, Router } from "express";
import ReclamoController from "../controllers/ReclamoController"
import auth from '../lib/auth'

const routerReclamo = Router();

const reclamoController = new ReclamoController();

routerReclamo.get("/reclamos",auth.isLoggedIn, reclamoController.list);

routerReclamo.get("/add-reclamo", auth.isLoggedIn, reclamoController.add);

routerReclamo.post("/reclamo-add",auth.isLoggedIn, reclamoController.create);

routerReclamo.get("/search-reclamo",auth.isLoggedIn, reclamoController.search);

routerReclamo.get("/reclamo-edit",auth.isLoggedIn, reclamoController.edit);

routerReclamo.post("/edit-reclamo",auth.isLoggedIn, reclamoController.update);

routerReclamo.post("/reclamo-delete",auth.isLoggedIn, reclamoController.delete);

export { routerReclamo };
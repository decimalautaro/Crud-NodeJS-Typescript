import { Router } from "express";
import PrestacionServicioController from "../controllers/PrestacionServicioController";
import auth from "../lib/auth";

const routerPrestacionServicio = Router();
const prestacionServicioController = new PrestacionServicioController();

routerPrestacionServicio.get("/prestacionServicios", auth.isLoggedIn, prestacionServicioController.list);

routerPrestacionServicio.get("/add-prestacion", auth.isLoggedIn, prestacionServicioController.add);

routerPrestacionServicio.post("/add-prestacion", auth.isLoggedIn, prestacionServicioController.create);

routerPrestacionServicio.get("/search-prestacion", auth.isLoggedIn, prestacionServicioController.search);

routerPrestacionServicio.get("/edit-prestacion", auth.isLoggedIn, prestacionServicioController.edit);

routerPrestacionServicio.post("/edit-prestacion", auth.isLoggedIn, prestacionServicioController.update);

routerPrestacionServicio.post("/delete-prestacion", auth.isLoggedIn, prestacionServicioController.delete);

export { routerPrestacionServicio }
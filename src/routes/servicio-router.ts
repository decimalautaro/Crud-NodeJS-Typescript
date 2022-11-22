import { Router } from "express";
import ServicioController from "../controllers/ServicioController"
import auth from '../lib/auth'

const routerServicio = Router();

const servicioController = new ServicioController();

routerServicio.get("/servicios",auth.isLoggedIn, servicioController.list);
routerServicio.get("/add-servicio",auth.isLoggedIn, (request, response) => {
    response.render("../views/servicios/servicio-add");
  });

routerServicio.post("/servicio-add",auth.isLoggedIn, servicioController.create);

routerServicio.get("/search-servicio",auth.isLoggedIn, servicioController.search);

routerServicio.get("/servicio-edit",auth.isLoggedIn, servicioController.edit);

routerServicio.post("/edit-servicio",auth.isLoggedIn, servicioController.update);

routerServicio.post("/delete-servicio",auth.isLoggedIn, servicioController.delete);

export { routerServicio };
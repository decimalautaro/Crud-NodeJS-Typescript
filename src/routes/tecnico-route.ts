import { request, response, Router } from "express";
import TecnicoController from "../controllers/TecnicoController"
import auth from '../lib/auth'

const routerTecnico = Router();

const tecnicoController = new TecnicoController();


routerTecnico.get("/tecnicos",auth.isLoggedIn, tecnicoController.list);

routerTecnico.get("/add-tecnico",auth.isLoggedIn, (request, response) => {
  response.render("../views/tecnico/tecnico-add");
});

routerTecnico.post("/add-tecnico",auth.isLoggedIn, tecnicoController.create);

routerTecnico.get("/search-tecnico",auth.isLoggedIn, tecnicoController.search);

routerTecnico.get("/edit-tecnico",auth.isLoggedIn, tecnicoController.edit);

routerTecnico.post("/edit-tecnico",auth.isLoggedIn, tecnicoController.update);

routerTecnico.post("/delete-tecnico",auth.isLoggedIn, tecnicoController.delete);

export { routerTecnico };
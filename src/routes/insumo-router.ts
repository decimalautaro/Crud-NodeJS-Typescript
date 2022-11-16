import { Router } from "express";
import InsumoController from "../controllers/InsumoController"
import auth from '../lib/auth'

const routerInsumo = Router();

const insumoController = new InsumoController();

routerInsumo.get("/insumos",auth.isLoggedIn, insumoController.list);
routerInsumo.get("/add-insumo",auth.isLoggedIn, (request, response) => {
    response.render("../views/insumos/insumo-add");
  });

routerInsumo.post("/insumo-add",auth.isLoggedIn, insumoController.create);

routerInsumo.get("/search-insumo",auth.isLoggedIn, insumoController.search);

routerInsumo.get("/insumo-edit",auth.isLoggedIn, insumoController.edit);

routerInsumo.post("/edit-insumo",auth.isLoggedIn, insumoController.update);

routerInsumo.post("/delete-insumo",auth.isLoggedIn, insumoController.delete);

export { routerInsumo };
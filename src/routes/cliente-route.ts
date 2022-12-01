import { request, response, Router } from "express";
import ClienteController from "../controllers/ClienteController"
import auth from '../lib/auth'

const routerCliente = Router();

const clienteController = new ClienteController();

routerCliente.get("/clientes",auth.isLoggedIn, clienteController.list);

routerCliente.get("/add-cliente", (request, response) => {
  response.render("cliente/cliente-add");
});

routerCliente.post("/cliente-add",auth.isLoggedIn, clienteController.create);

routerCliente.get("/search",auth.isLoggedIn, clienteController.search);

routerCliente.get("/cliente-edit",auth.isLoggedIn, clienteController.edit);

routerCliente.post("/edit-cliente",auth.isLoggedIn, clienteController.update);

routerCliente.post("/cliente-delete",auth.isLoggedIn, clienteController.delete);

export { routerCliente };
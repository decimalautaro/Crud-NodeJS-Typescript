import { Request, Response } from "express";
import {clienteServices} from "../services/ClienteService";


class ClienteController {

    async create(request: Request, response: Response) {
        const { name, email, phone, city, state } = request.body;
        
        try {
            await clienteServices.create({
                name,
                email,
                phone,
                city,
                state,
            }).then(() => {
                request.flash("success","Cliente creado exitosamente");
          response.redirect("./clientes");
            });
        } catch (err) {
            request.flash("error","ERROR, faltan llenar datos"), err;
        response.redirect("./clientes");
            }
        }
    
    async delete(request: Request, response: Response) {
        const { id } = request.body;
    
        try {
            await clienteServices.delete(id).then(() => {
                request.flash("success","Cliente eliminado exitosamente");
                response.redirect("./clientes");
        });
        } catch (err) {
            request.flash("error","Error al eliminar el cliente"), err;
            response.redirect("./clientes");
            };
        }
    


    async edit(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const cliente = await clienteServices.edit(id);
    
        return response.render("./clientes/cliente-edit", {
            cliente: cliente
        });
    }


    async list(request: Request, response: Response) {
    
        const clientes = await clienteServices.list();
    
            return response.render("cliente/cliente", {
            clientes: clientes
        });
    }


    async search(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();
    
        try {
            const clientes = await clienteServices.search(search);
            response.render("./users/user-search", {
                clientes: clientes,
                search: search
        });
        } catch (err) {
            request.flash("error","Error al buscar el cliente"), err;
            response.redirect("./clientes");
        }
    }


    async update(request: Request, response: Response) {
        const { id, name, email, phone, city, state } = request.body;
    
        try {
            await clienteServices.update({ id, name, email, phone, city, state }).then(() => {
                request.flash("success","Cliente actualizado exitosamente");
                response.redirect("./clientes");
        });
        } catch (err) {
            request.flash("error","Error al actualizar el cliente"), err;
            response.redirect("./clientes");
        }
    
    }


}


export default ClienteController;
import { Request, Response } from "express";
import TecnicoServices from "../services/TecnicoService";
import TecnicoService from "../services/TecnicoService";


class TecnicoController {

    async create(request: Request, response: Response) {
        const { nombre, puesto, telefono, email } = request.body;
    
        const createTecnicoService = new TecnicoService();
    
        try {
            await createTecnicoService.create({
                nombre,
                puesto,
                telefono,
                email

            }).then(() => {
                request.flash("success","Tecnico creado exitosamente");
          response.redirect("./tecnicos");
            });
        } catch (err) {
            request.flash("error","Error al crear el tecnico"), err;
        response.redirect("./tecnicos");
        }
    
    }


    async delete(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteTecnicoService = new TecnicoService();
    
        try {
            await deleteTecnicoService.delete(id).then(() => {
                request.flash("success","Tecnico eliminado exitosamente");
          response.redirect("./tecnicos");
        });
        } catch (err) {
            request.flash("error","Error al eliminar el tecnico"), err;
        response.redirect("./tecnicos");
        }
    }


    async edit(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const editTecnicoDataService = new TecnicoService();
    
        const tecnico = await editTecnicoDataService.edit(id);
    
        return response.render("./tecnico/tecnico-edit", {
            tecnico: tecnico
        });
    }


    async list(request: Request, response: Response) {
        const listTecnicoService = new TecnicoService();
    
        const tecnico = await listTecnicoService.list();
    
            return response.render("./tecnico/tecnico", {
                tecnico: tecnico
        });
    }


    async search(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();
    
        const searchTecnicoService = new TecnicoService();
    
        try {
            const tecnico = await searchTecnicoService.search(search);
            response.render("./tecnico/tecnico-search", {
                tecnico: tecnico,
                search: search
        });
        
        } catch (err) {
            response.render("./tecnico/tecnico-message", {
            message: `Error al buscar el tecnico: ${err.message}`
        });
        }
    }


    async update(request: Request, response: Response) {
        const { id, nombre, puesto, telefono, email} = request.body;
    
        const updateTecnicoService = new TecnicoService();
    
        try {
            await updateTecnicoService.update({ id, nombre, puesto, telefono, email }).then(() => {
                request.flash("success","Tecnico actualizado exitosamente");
          response.redirect("./tecnicos");
        });
        } catch (err) {
            request.flash("error","Error al actualizar el tecnico"), err;
        response.redirect("./tecnico");
        }
    
    }


}


export default TecnicoController;
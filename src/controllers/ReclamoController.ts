import { Request, Response } from "express";
import ReclamosServices from "../services/ReclamoService";


class ReclamosController {

    async create(request: Request, response: Response) {
        const { tipoReclamo, fecha, estado, numeroReclamo } = request.body;
    
        const createReclamoService = new ReclamosServices();
    
        try {
            await createReclamoService.create({
                tipoReclamo,
                fecha,
                estado,
                numeroReclamo
            }).then(() => {
                request.flash("success","Reclamo creado exitosamente");
          response.redirect("./reclamos");
            });
        } catch (err) {
            request.flash("error","ERROR, faltan llenar datos"), err;
        response.redirect("./reclamos");
            }
        }
    
    


    async delete(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteReclamoService = new ReclamosServices();
    
        try {
            await deleteReclamoService.delete(id).then(() => {
                request.flash("success","Reclamo eliminado exitosamente");
                response.redirect("./reclamos");
        });
        } catch (err) {
            request.flash("error","Error al eliminar el reclamo"), err;
            response.redirect("./reclamos");
            };
        }
    


    async edit(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const getReclamoDataService = new ReclamosServices();
    
        const reclamo = await getReclamoDataService.edit(id);
    
        return response.render("./reclamos/reclamo-edit", {
        reclamo: reclamo
        });
    }


    async list(request: Request, response: Response) {
        const listReclamosService = new ReclamosServices();
    
        const reclamos = await listReclamosService.list();
    
            return response.render("./reclamos/reclamo", {
            reclamos: reclamos
        });
    }


    async search(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();
    
        const searchReclamoervice = new ReclamosServices();
    
        try {
            const reclamos = await searchReclamoervice.search(search);
            response.render("./reclamos/reclamo-search", {
                reclamos: reclamos,
                search: search
        });
        } catch (err) {
            request.flash("error","Error al buscar el reclamo"), err;
            response.redirect("./reclamos");
        }
    }


    async update(request: Request, response: Response) {
        const { id, tipoReclamo, numeroReclamo, fecha, estado } = request.body;
    
        const updateReclamoService = new ReclamosServices();
    
        try {
            await updateReclamoService.update({ id, tipoReclamo, numeroReclamo, fecha, estado }).then(() => {
                request.flash("success","Reclamo actualizado exitosamente");
                response.redirect("./users");
        });
        } catch (err) {
            request.flash("error","Error al actualizar el usuario"), err;
            response.redirect("./reclamos");
        }
    
    }


}


export default ReclamosController;
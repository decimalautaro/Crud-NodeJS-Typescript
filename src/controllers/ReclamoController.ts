import { Request, Response } from "express";
import { clienteServices } from "../services/ClienteService";
import ReclamosServices from "../services/ReclamoService";
import TecnicoServices, { tecnicoServices } from "../services/TecnicoService";
import {userService, UserServices} from "../services/UserService";


class ReclamosController {

    async create(request: Request, response: Response) {
        const { tipoReclamo, fecha, estado, numeroReclamo,clienteId, tecnicoId } = request.body;
    
        const createReclamoService = new ReclamosServices();
    
        try {
            await createReclamoService.create({
                tipoReclamo,
                fecha,
                estado,
                numeroReclamo,
                clienteId,
                tecnicoId
            }).then(() => {
                request.flash("success","Reclamo creado exitosamente");
                response.redirect("./reclamos");
            });
        } catch (err) {
            request.flash("error","ERROR, faltan llenar datos"), err;
        response.redirect("./reclamos");
            }
        }


    async add(request:Request, response: Response) {
        const cliente = await clienteServices.list();
        const tecnico= await tecnicoServices.list();
        return response.render("./reclamos/reclamo-add",{cliente, tecnico})
        
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

        const cliente = await clienteServices.list()

        const listTecnico = new TecnicoServices()
        const tecnico = await listTecnico.list()

        return response.render("./reclamos/reclamo-edit", {
            reclamo: reclamo,
            cliente: cliente,
            tecnico: tecnico,
        });
    }


    async list(request: Request, response: Response) {
        const listReclamosService = new ReclamosServices();
    
        const reclamos = await listReclamosService.list();

        const cliente = await clienteServices.list()

        const listTecnico = new TecnicoServices()
        const tecnico = await listTecnico.list()


            return response.render("./reclamos/reclamo", {
            reclamos: reclamos,
            cliente: cliente,
            tecnico: tecnico
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
        const { id, tipoReclamo, numeroReclamo, fecha, estado, clienteId, tecnicoId} = request.body;
    
        const updateReclamoService = new ReclamosServices();
    
        try {
            await updateReclamoService.update({ id, tipoReclamo, numeroReclamo, fecha, estado, clienteId, tecnicoId }).then(() => {
                request.flash("success","Reclamo actualizado exitosamente");
                response.redirect("./reclamos");
        });
        } catch (err) {
            request.flash("error","Error al actualizar el usuario", err.toString());
            response.redirect("./reclamos");
        }
    
    }


}


export default ReclamosController;
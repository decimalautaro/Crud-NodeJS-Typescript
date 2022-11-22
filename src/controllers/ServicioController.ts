import { Request, Response } from "express";
import ServicioServices from "../services/ServicioService";


class ServicioController {

    async create(request: Request, response: Response) {
        const { precio, planes, tipoServicio } = request.body;
    
        const createServicioService = new ServicioServices();
    
        try {
            await createServicioService.create({
                precio, planes, tipoServicio
            }).then(() => {
                request.flash("success","Servicio creado exitosamente");
                response.redirect("./servicios");
            });
        } catch (err) {
            request.flash("error","ERROR, faltan llenar datos"), err;
        response.redirect("./servicios");
            }
        }

    // async add(request:Request, response: Response) {
    //     const user = await userService.list();
    //     const tecnico= await tecnicoServices.list();
    //     return response.render("./reclamos/reclamo-add",{user, tecnico})
        
 
    // }
    


    async delete(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteRServicioService = new ServicioServices();
    
        try {
            await deleteRServicioService.delete(id).then(() => {
                request.flash("success","Servicio eliminado exitosamente");
                response.redirect("./servicios");
        });
        } catch (err) {
            request.flash("error","Error al eliminar el servicio"), err;
            response.redirect("./servicios");
            };
        }
    


    async edit(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const getServicioDataService = new ServicioServices();
        const servicio = await getServicioDataService.edit(id);

        const listServicio = new ServicioServices()

        return response.render("./servicios/servicio-edit", {
            servicio: servicio,
        });
    }


    async list(request: Request, response: Response) {
        const listServocopService = new ServicioServices();
    
        const servicio = await listServocopService.list();

            return response.render("./servicios/servicio", {
            servicio: servicio,
        });
    }


    async search(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();
    
        const searchServicioService = new ServicioServices();
    
        try {
            const servicio = await searchServicioService.search(search);
            response.render("./servicios/servicio-search", {
                servicio: servicio,
        });
        } catch (err) {
            request.flash("error","Error al buscar el servicio"), err;
            response.redirect("./servicios");
        }
    }


    async update(request: Request, response: Response) {
        const { id, precio, tipoServicio, planes} = request.body;
    
        const updateServicioService = new ServicioServices();
    
        try {
            await updateServicioService.update({ id, precio, tipoServicio, planes }).then(() => {
                request.flash("success","Servicio actualizado exitosamente");
                response.redirect("./servicios");
        });
        } catch (err) {
            request.flash("error","Error al actualizar el usuario"), err;
            response.redirect("./servicios");
        }
    
    }


}


export default ServicioController;
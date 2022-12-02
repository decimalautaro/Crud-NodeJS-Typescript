import { Request, Response } from "express";
import { clienteServices } from "../services/ClienteService";
import { insumoService } from "../services/InsumoService";
import { prestacionServicioService } from "../services/PrestacionServicioService";
import { servicioServices } from "../services/ServicioService";
import { tecnicoServices } from "../services/TecnicoService";
import { userService, UserServices } from "../services/UserService";


class PrestacionServicioController {

    async create(request: Request, response: Response) {
        const { clienteId, tecnicoId, servicioId, insumoId, tipoPrestacion } = request.body;

        try {
            await prestacionServicioService.create({
                clienteId,
                tecnicoId,
                servicioId,
                insumoId,
                tipoPrestacion
            }).then(() => {
                request.flash("success", "Prestacion registrada exitosamente");
                response.redirect("./prestacionServicios");
            });
        } catch (err) {
            request.flash("error", "Error al registrar prestacion", err.toString()), err;
            response.redirect("./prestacionServicios");
        }

    }

    async add(request: Request, response: Response) {
        const cliente = await clienteServices.list();
        const tecnico = await tecnicoServices.list();
        const servicio = await servicioServices.list();
        const insumo = await insumoService.list();
        return response.render("prestacionServicio/add", { cliente, tecnico, servicio, insumo })
    }

    async delete(request: Request, response: Response) {
        const { id } = request.body;

        try {
            await prestacionServicioService.delete(id).then(() => {
                request.flash("success", "Prestacion eliminada exitosamente");
                response.redirect("./prestacionServicios");
            });

        } catch (err) {
            request.flash("error", "Error al eliminar prestacion"), err;
            response.redirect("./prestacionServicios");
        }
    }

    async list(request: Request, response: Response) {

        const prestacionServicio = await prestacionServicioService.list();

        return response.render("prestacionServicio/index", {
            prestacionServicio: prestacionServicio
        });
    }

    async edit(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();

        const prestacionServicio = await prestacionServicioService.edit(id);

        const usuario = await userService.list()
        const tecnico = await tecnicoServices.list()
        const servicio = await servicioServices.list()
        const insumo = await insumoService.list()
        return response.render("prestacionServicio/edit", {
            prestacionServicio: prestacionServicio,
            usuario: usuario,
            tecnico: tecnico,
            servicio: servicio,
            insumo: insumo
        });
    }

    async search(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();

        try {
            const prestacionServicio = await prestacionServicioService.search(search);
            response.render("prestacionServicio/search", {
                prestacionServicio: prestacionServicio,
                search: search
            });
        } catch (err) {
            request.flash("error", "Error al buscar el usuario"), err;
            response.redirect("./prestacionServicio");
        }
    }

    async update(request: Request, response: Response) {
        const { id, clienteId, tecnicoId, servicioId, insumoId, tipoPrestacion } = request.body;

        try {
            await prestacionServicioService.update({ id, clienteId, tecnicoId, servicioId, insumoId, tipoPrestacion })
            request.flash("success", "Prestacion actualizada exitosamente");
            response.redirect("./prestacionServicios");
        } catch (err) {
            request.flash("error", "Error al actualizar prestacion", err.toString());
            response.redirect("./prestacionServicios");
        }
    }

}


export default PrestacionServicioController;
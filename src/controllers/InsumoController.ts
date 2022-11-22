import { Request, Response } from "express";
import InsumoService from "../services/InsumoService";


class InsumoController {

    async create(request: Request, response: Response) {
        const { tipo, marca, modelo,descripcion} = request.body;
    
        const createInsumoService = new InsumoService();
    
        try {
            await createInsumoService.create({
                tipo, marca, modelo,descripcion
            }).then(() => {
                request.flash("success","Insumo creado exitosamente");
          response.redirect("./insumos");
            });
        } catch (err) {
            request.flash("error","Error al crear el insumo"), err;
        response.redirect("./insumos");
        }
    
    }


    async delete(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteInsumoService = new InsumoService();
    
        try {
            await deleteInsumoService.delete(id).then(() => {
                request.flash("success","Insumo eliminado exitosamente");
                  response.redirect("./insumos");
              });
            
        } catch (err) {
            request.flash("error","Error al eliminar el insumo"), err;
        response.redirect("./insumos");
        }
    }


    async edit(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const getInsumoDataService = new InsumoService();
    
        const insumo = await getInsumoDataService.edit(id);
       
        return response.render("./insumos/insumo-edit", {
          insumo: insumo

        });
    }


    async list(request: Request, response: Response) {
        const listInsumosService = new InsumoService();
    
        const insumos = await listInsumosService.list();
    
            return response.render("./insumos/insumo", {
                insumos: insumos
        });
    }

    

    async search(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();
    
        const searchInsumoService = new InsumoService();
    
        try {
            const insumo = await searchInsumoService.search(search);
            response.render("./insumos/insumo-search", {
                insumo: insumo,
                search: search
        });
        } catch (err) {
            request.flash("error","Error al buscar el insumo"), err;
        response.redirect("./insumos");
        }
    }


    async update(request: Request, response: Response) {
        const { id, tipo, marca, modelo,descripcion } = request.body;
    
        const updateInsumoService = new InsumoService();
    
        try {
            await updateInsumoService.update({ id, tipo, marca, modelo,descripcion }).then(() => {
            request.flash("success","Insumo actualizado exitosamente");
            response.redirect("./insumos");
        });
        } catch (err) {
            request.flash("error","Error al actualizar el insumo"), err;
        response.redirect("./insumos");
        }
    
    }


}

export default InsumoController;
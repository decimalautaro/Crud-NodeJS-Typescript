import { Request, Response } from "express";
import {UserServices} from "../services/UserService";


class PrestacionServicioController {




    async list(request: Request, response: Response) {
        const listPrestacionServicio = new PrestacionServicioServices();
    
        const prestacionServicio = await listPrestacionServicio.list();
    
            return response.render("./users/user", {
            users: prestacionServicio
        });
    }


    async search(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();
    
        const searchPrestacionServicioe = new PrestacionServicioServices();
    
        try {
            const prestacionServicio = await searchPrestacionServicioe.search(search);
            response.render("./users/prestacionServicio-search", {
                prestacionServicio: prestacionServicio,
                search: search
        });
        } catch (err) {
            request.flash("error","Error al buscar el usuario"), err;
            response.redirect("./prestacionServicio");
        }
    }




}


export default PrestacionServicioController;
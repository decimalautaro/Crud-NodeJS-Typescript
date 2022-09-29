import { Request, Response } from "express";
import UserService from "../services/UserService";


class UserController {

    async create(request: Request, response: Response) {
        const { name, username, password, email, phone, city, state } = request.body;
    
        const createUserService = new UserService();
    
        try {
            await createUserService.create({
                name,
                username,
                password,
                email,
                phone,
                city,
                state,
            }).then(() => {
                request.flash("success","Usuario creado exitosamente");
          response.redirect("./users");
            });
        } catch (err) {
            request.flash("error","ERROR, faltan llenar datos"), err;
        response.redirect("./users");
            }
        }
    
    


    async delete(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteUserService = new UserService();
    
        try {
            await deleteUserService.delete(id).then(() => {
                request.flash("success","Usuario eliminado exitosamente");
                response.redirect("./users");
        });
        } catch (err) {
            request.flash("error","Error al eliminar el usuario"), err;
            response.redirect("./users");
            };
        }
    


    async edit(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const getUserDataService = new UserService();
    
        const user = await getUserDataService.edit(id);
    
        return response.render("./users/user-edit", {
        user: user
        });
    }


    async list(request: Request, response: Response) {
        const listUsersService = new UserService();
    
        const users = await listUsersService.list();
    
            return response.render("./users/user", {
            users: users
        });
    }


    async search(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();
    
        const searchUserService = new UserService();
    
        try {
            const users = await searchUserService.search(search);
            response.render("./users/user-search", {
                users: users,
                search: search
        });
        } catch (err) {
            request.flash("error","Error al buscar el usuario"), err;
            response.redirect("./users");
        }
    }


    async update(request: Request, response: Response) {
        const { id, name, username, password, email, phone, city, state } = request.body;
    
        const updateUserService = new UserService();
    
        try {
            await updateUserService.update({ id, name, username, password, email, phone, city, state }).then(() => {
                request.flash("success","Usuario actualizado exitosamente");
                response.redirect("./users");
        });
        } catch (err) {
            request.flash("error","Error al actualizar el usuario"), err;
            response.redirect("./users");
        }
    
    }


}


export default UserController;
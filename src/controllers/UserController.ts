import { Request, Response } from "express";
import UserService from "../services/UserService";


class UserController {

    async create(request: Request, response: Response) {
        const { username, email, telefone, cidade, estado } = request.body;
    
        const createUserService = new UserService();
    
        try {
            await createUserService.create({
                username,
                email,
                telefone,
                cidade,
                estado
            }).then(() => {
                response.render("message", {
                message: "Usuario registrado con exito"
            });
            });
        } catch (err) {
            response.render("message", {
            message: `Error al registrar el usuario: ${err.message}`
            });
        }
    
    }


    async delete(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteUserService = new UserService();
    
        try {
            await deleteUserService.delete(id).then(() => {
                response.render("message", {
                message: "Usuario eliminado con exito"
            });
        });
        } catch (err) {
            response.render("message", {
            message: `Error al eliminar el usaurio: ${err.message}`
            });
        }
    }


    async edit(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const getUserDataService = new UserService();
    
        const user = await getUserDataService.edit(id);
    
        return response.render("edit", {
        user: user
        });
    }


    async list(request: Request, response: Response) {
        const listUsersService = new UserService();
    
        const users = await listUsersService.list();
    
            return response.render("index", {
            users: users
        });
    }


    async search(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();
    
        const searchUserService = new UserService();
    
        try {
            const users = await searchUserService.search(search);
            response.render("search", {
                users: users,
                search: search
        });
        } catch (err) {
            response.render("message", {
            message: `Error al buscar el usuario: ${err.message}`
        });
        }
    }


    async update(request: Request, response: Response) {
        const { id, username, email, telefone, cidade, estado } = request.body;
    
        const updateUserService = new UserService();
    
        try {
            await updateUserService.update({ id, username, email, telefone, cidade, estado }).then(() => {
                response.render("message", {
                message: "Usuario actualizado con exito"
            });
        });
        } catch (err) {
            response.render("message", {
            message: `Error al actualizar el usuario: ${err.message}`
        });
        }
    
    }


}


export default UserController;
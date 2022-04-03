import { Request, Response } from "express";
import UserService from "../services/UserService";


class UserController {

    async create(request: Request, response: Response) {
        const { username, email, phone, city, state } = request.body;
    
        const createUserService = new UserService();
    
        try {
            await createUserService.create({
                username,
                email,
                phone,
                city,
                state
            }).then(() => {
                response.render("./users/message", {
                message: "Usuario registrado con exito"
            });
            });
        } catch (err) {
            response.render("./users/message", {
            message: `Error al registrar el usuario: ${err.message}`
            });
        }
    
    }


    async delete(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteUserService = new UserService();
    
        try {
            await deleteUserService.delete(id).then(() => {
                response.render("./users/message", {
                message: "Usuario eliminado con exito"
            });
        });
        } catch (err) {
            response.render("./users/message", {
            message: `Error al eliminar el usaurio: ${err.message}`
            });
        }
    }


    async edit(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const getUserDataService = new UserService();
    
        const user = await getUserDataService.edit(id);
    
        return response.render("./users/edit", {
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
            response.render("./users/search", {
                users: users,
                search: search
        });
        } catch (err) {
            response.render("./users/message", {
            message: `Error al buscar el usuario: ${err.message}`
        });
        }
    }


    async update(request: Request, response: Response) {
        const { id, username, email, phone, city, state } = request.body;
    
        const updateUserService = new UserService();
    
        try {
            await updateUserService.update({ id, username, email, phone, city, state }).then(() => {
                response.render("./users/message", {
                message: "Usuario actualizado con exito"
            });
        });
        } catch (err) {
            response.render("./users/message", {
            message: `Error al actualizar el usuario: ${err.message}`
        });
        }
    
    }


}


export default UserController;
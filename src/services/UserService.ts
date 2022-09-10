import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUser {
    id?: string
    name: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    city: string;
    state: string;
}

class UserServices {
    async create({ name, username, password, email, phone, city, state }: IUser) {
        if ( !name || !username || !password || !email || !phone || !city || !state) {
            throw new Error("Por favor rellena todos los campos");
        }
    
        const usersRepository = getCustomRepository(UsersRepository);
    
        const usernameAlreadyExists = await usersRepository.findOne({ username });
    
        if (usernameAlreadyExists) {
            throw new Error("El nombre de usuario ya está registrado");
        }
    
        const emailAlreadyExists = await usersRepository.findOne({ email });
    
        if (emailAlreadyExists) {
            throw new Error("El correo electrónico ya está registrado");
        }
    
        const user = usersRepository.create({ name, username, password, email, phone, city, state });
    
        await usersRepository.save(user);
    
        return user;
    
    }


    async delete(id: string) {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("id = :id", { id })
            .execute();
    
        return user;
    
    }


    async edit(id: string) {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository.findOne(id);
    
        return user;
    }



    async list() {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const users = await usersRepository.find();
        
        return users;
    }


    async search(search: string) {
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }
    
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository
            .createQueryBuilder()
            .where("name like :search", { search: `%${search}%` })
            .where("username like :search", { search: `%${search}%` })
            .orWhere("email like :search", { search: `%${search}%` })
            .orWhere("password like :search", { search: `%${search}%` })
            .orWhere("phone like :search", { search: `%${search}%` })
            .orWhere("city like :search", { search: `%${search}%` })
            .orWhere("state like :search", { search: `%${search}%` })
            .getMany();
    
        return user;
    
    }


    async update({ id, name, username, password, email, phone, city, state }: IUser) {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository
            .createQueryBuilder()
            .update(User)
            .set({ name, username, password, email, phone, city, state })
            .where("id = :id", { id })
            .execute();
    
        return user;
    
    }


}
export default UserServices;
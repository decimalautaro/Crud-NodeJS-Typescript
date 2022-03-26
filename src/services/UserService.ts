import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUser {
    id?: string
    username: string;
    email: string;
    telefone: string;
    cidade: string;
    estado: string;
}

class UserServices {
    async create({ username, email, telefone, cidade, estado }: IUser) {
        if (!username || !email || !telefone || !cidade || !estado) {
            throw new Error("Por favor preencha todos os campos");
        }
    
        const usersRepository = getCustomRepository(UsersRepository);
    
        const usernameAlreadyExists = await usersRepository.findOne({ username });
    
        if (usernameAlreadyExists) {
            throw new Error("Username já está cadastrado");
        }
    
        const emailAlreadyExists = await usersRepository.findOne({ email });
    
        if (emailAlreadyExists) {
            throw new Error("Email já está cadastrado");
        }
    
        const user = usersRepository.create({ username, email, telefone, cidade, estado });
    
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
            throw new Error("Por favor preencha o campo de busca");
        }
    
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository
            .createQueryBuilder()
            .where("username like :search", { search: `%${search}%` })
            .orWhere("email like :search", { search: `%${search}%` })
            .orWhere("telefone like :search", { search: `%${search}%` })
            .orWhere("cidade like :search", { search: `%${search}%` })
            .orWhere("estado like :search", { search: `%${search}%` })
            .getMany();
    
        return user;
    
    }


    async update({ id, username, email, telefone, cidade, estado }: IUser) {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository
            .createQueryBuilder()
            .update(User)
            .set({ username, email, telefone, cidade, estado })
            .where("id = :id", { id })
            .execute();
    
        return user;
    
    }








}
export default UserServices;
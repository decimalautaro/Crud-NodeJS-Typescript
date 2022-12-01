import {  getCustomRepository } from "typeorm";
import { Category } from "../entities/Category";
import { Cliente } from "../entities/Cliente";
import { ClienteRepository } from "../repositories/ClienteRepository";

interface ICategory {
    id?: string
    name: string;
    email: string;
    phone: number;
    city: string;
    state: string;    
}

class ClienteServices {
    async create({ name, email, phone, city, state }: ICategory) {
        if (!name ) {
            throw new Error("Por favor rellena todos los campos");
        }
    
        const clienteRepository = getCustomRepository(ClienteRepository);
    
        const nameAlreadyExists = await clienteRepository.findOne({ name });
    
        if (nameAlreadyExists) {
            throw new Error("El nombre del cliente ya está registrado");
        }

        const cliente = clienteRepository.create({ name, email, phone, city, state });
    
        await clienteRepository.save(cliente);
    
        return cliente;
    
    }


    async delete(id: string) {
        const clienteRepository = getCustomRepository(ClienteRepository);
    
        const cliente = await clienteRepository
            .createQueryBuilder()
            .delete()
            .from(Cliente)
            .where("id = :id", { id })
            .execute();
    
        return cliente;
    
    }


    async edit(id: string) {
        const clienteRepository = getCustomRepository(ClienteRepository);
    
        const cliente = await clienteRepository.findOne(id);
    
        return cliente;
    }



    async list() {
        const clienteRepository = getCustomRepository(ClienteRepository);
    
        const cliente= await clienteRepository.find();
    
        return cliente;
    }


    async search(search: string) {
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }
    
        const clienteRepository = getCustomRepository(ClienteRepository);

        const cliente = await clienteRepository
            .createQueryBuilder()
            .where("name like :search", { search: `%${search}%` })
            .orWhere("email like :search", { search: `%${search}%` })
            .orWhere("phone like :search", { search: `%${search}%` })
            .orWhere("city like :search", { search: `%${search}%` })
            .orWhere("state like :search", { search: `%${search}%` })
            .getMany();
    
        return cliente;
    
    }


    async update({ id, name}: ICategory) {
        const clienteRepository = getCustomRepository(ClienteRepository);
    
        const cliente = await clienteRepository
            .createQueryBuilder()
            .update(Cliente)
            .set({ name })
            .where("id = :id", { id })
            .execute();
    
        return cliente;
    
    }

}

export const clienteServices = new ClienteServices()
export default ClienteServices;

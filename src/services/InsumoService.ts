import {getCustomRepository } from "typeorm";
import { Insumo } from "../entities/Insumo";
import {InsumoRepository } from "../repositories/InsumoRepository";

interface IInsumo {
    id?: string;
    tipo: string;
    marca: string;
    modelo: string;
    descripcion: string;
    
}

class InsumoServices {
    async create({ tipo, marca, modelo,descripcion }: IInsumo) {
        if (!tipo || !marca || !modelo || !descripcion ) {
            throw new Error("Por favor rellena todos los campos");
        }
    
        const insumosRepository = getCustomRepository(InsumoRepository);
    
        // const nameProductAlreadyExists = await productsRepository.findOne({ nameProduct });
    
        // if (nameProductAlreadyExists) {
        //     throw new Error("El nombre del producto ya está registrado");
        // }

        
        const insumo = insumosRepository.create({ tipo, marca, modelo,descripcion});
        await insumosRepository.save(insumo);
    
        return insumo;
    
    }


    async delete(id: string) {
        const insumosRepository = getCustomRepository(InsumoRepository);
    
        const insumo = await insumosRepository
            .createQueryBuilder()
            .delete()
            .from(Insumo)
            .where("id = :id", { id })
            .execute();
    
        return insumo;
    
    }


    async edit(id: string) {
        const insumosRepository = getCustomRepository(InsumoRepository);
    
        const insumo = await insumosRepository.findOne(id);
    
        return insumo;
    }



    async list() {
        const insumosRepository = getCustomRepository(InsumoRepository);
    
        const insumo = await insumosRepository.find();
        return insumo;
        
    }


    async search(search: string) {
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }
    
        const insumosRepository = getCustomRepository(InsumoRepository);

        const insumo = await insumosRepository
            .createQueryBuilder()
            .where("tipo like :search", { search: `%${search}%` })
            .orWhere("marca like :search", { search: `%${search}%` })
            .orWhere("modelo like :search", { search: `%${search}%` })
            .orWhere("descripcion like :search", { search: `%${search}%` })

            .getMany();
    
        return insumo;
    
    }


    async update({ id,tipo, marca, modelo,descripcion }: IInsumo) {
        const insumosRepository = getCustomRepository(InsumoRepository);
    
        const insumo = await insumosRepository
            .createQueryBuilder()
            .update(Insumo)
            .set({ tipo, marca, modelo,descripcion })
            .where("id = :id", { id })
            .execute();
    
        return insumo;
    
    }


}
export const insumoService = new InsumoServices()
export default InsumoServices;
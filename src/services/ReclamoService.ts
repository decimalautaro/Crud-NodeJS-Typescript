import { getCustomRepository } from "typeorm";
import { Reclamo } from "../entities/Reclamo";
import { helpers } from "../lib/helpers";
import { ReclamosRepository } from "../repositories/ReclamosRepository";

interface IReclamo {
    id?: string
    tipoReclamo: string;
    numeroReclamo: number;
    fecha: Date;
    estado: string;
    userId: string
}

class ReclamosServices {
    async create({ tipoReclamo, fecha, estado,numeroReclamo, userId}: IReclamo) {
        if ( !tipoReclamo|| !fecha || !estado || !numeroReclamo || !userId ) {
            throw new Error("Por favor rellena todos los campos");
        }
    
        const reclamosRepository = getCustomRepository(ReclamosRepository);
    
        const reclamoAlreadyExists = await reclamosRepository.findOne({ tipoReclamo });
    
        if (reclamoAlreadyExists) {
            throw new Error("El tipo de reclamo ya está registrado");
        }

        const nroReclamoAlreadyExists = await reclamosRepository.findOne({ numeroReclamo });
    
        if (nroReclamoAlreadyExists) {
            throw new Error("El n° de reclamo ya está registrado");
        }



    
    
        const reclamo = reclamosRepository.create({ tipoReclamo, fecha, estado, numeroReclamo, userId });
    
        await reclamosRepository.save(reclamo);
    
        return reclamo;
    
    }


    async delete(id: string) {
        const reclamosRepository = getCustomRepository(ReclamosRepository);
    
        const user = await reclamosRepository
            .createQueryBuilder()
            .delete()
            .from(Reclamo)
            .where("id = :id", { id })
            .execute();
    
        return user;
    
    }


    async edit(id: string) {
        const reclamosRepository = getCustomRepository(ReclamosRepository);
    
        const reclamo = await reclamosRepository.findOne(id, {relations: ["user"]});
    
        return reclamo;
    }

    async list() {
        const reclamosRepository = getCustomRepository(ReclamosRepository);
    
        const reclamos = await reclamosRepository.find({relations:["user"]});
        
        return reclamos;
    }


    async search(search: string) {
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }
    
        const reclamosRepository = getCustomRepository(ReclamosRepository);

        const reclamo = await reclamosRepository
            .createQueryBuilder()
            .where("tipoReclamo like :search", { search: `%${search}%` })
            .orWhere("numeroReclamo like :search", { search: `%${search}%` })
            .orWhere("fecha like :search", { search: `%${search}%` })
            .orWhere("estado like :search", { search: `%${search}%` })
            .orWhere("userId like :search", { search: `%${search}%` })
            .getMany();
    
        return reclamo;
    
    }


    async update({ id, tipoReclamo, numeroReclamo, fecha, estado, userId }: IReclamo) {
        const reclamosRepository = getCustomRepository(ReclamosRepository);
    
        const reclamo = await reclamosRepository
            .createQueryBuilder()
            .update(Reclamo)
            .set({ tipoReclamo,fecha,estado,numeroReclamo, userId})
            .where("id = :id", { id })
            .execute();
    
        return reclamo;
    
    }


}
export default ReclamosServices;
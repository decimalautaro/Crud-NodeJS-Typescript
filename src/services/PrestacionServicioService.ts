import { getCustomRepository } from "typeorm";
import { PrestacionServicio } from "../entities/PrestacionServicio";
import { PrestacionServicioRepository } from "../repositories/PrestacionServicioRepository";

interface IPrestacionServicio {
    id?: string;
    clienteId:string;
    tecnicoId: string;
    servicioId: string;
    insumoId: string;
    tipoPrestacion: string
}

class PrestacionServicioService {
    async create({ clienteId, tecnicoId, servicioId, insumoId, tipoPrestacion }:IPrestacionServicio) {
        if ( !clienteId || !tecnicoId || !servicioId || !insumoId || !tipoPrestacion) {
            throw new Error("Por favor complete todos los campos");
        }

        const prestacionRepository = getCustomRepository(PrestacionServicioRepository)
        
        const prestacionServicio = prestacionRepository.create({ clienteId, tecnicoId, servicioId, insumoId, tipoPrestacion })
        await prestacionRepository.save(prestacionServicio)

        return
    }

    async delete(id: string) {
        const prestacionRepository = getCustomRepository(PrestacionServicioRepository)

        const prestacionServicio = await prestacionRepository
            .createQueryBuilder()
            .delete()
            .from(PrestacionServicio)
            .where("id = id", { id })
            .execute()
        
        return prestacionServicio;
    }

    async edit(id: string) {
        const prestacionRepository = getCustomRepository(PrestacionServicioRepository)

        const prestacionServicio = prestacionRepository.findOne(id)

        return prestacionServicio   
    }

    async list() {
        const prestacionRepository = getCustomRepository(PrestacionServicioRepository)

        const prestacionServicio = await prestacionRepository.find({ relations:["cliente", "tecnico", "servicio", "insumo"] })

        return prestacionServicio
    }

    async search(search: string) {
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda")
        }

        const prestacionRepository = getCustomRepository(PrestacionServicioRepository)

        const prestacionServicio = await prestacionRepository
            .createQueryBuilder()
            .where("clienteId like :search", { search: `%${search}%` })
            .orWhere("tecnicoId like :search", { search: `%${search}%` })
            .orWhere("servicioId like :search", { search: `%${search}%` })
            .orWhere("insumoId like :search", { search: `%${search}%` })

            .getMany();

        return prestacionRepository;
    }

    async update({ id, clienteId, tecnicoId, servicioId, insumoId, tipoPrestacion }: IPrestacionServicio) {
        const prestacionRepository = getCustomRepository(PrestacionServicioRepository)

        const prestacionServicio = await prestacionRepository
            .createQueryBuilder()
            .update(PrestacionServicio)
            .set({ clienteId, tecnicoId, servicioId, insumoId, tipoPrestacion })
            .where("id = :id", { id })
            .execute();
    
        return prestacionServicio;
    }
}

export default PrestacionServicioService;
export const prestacionServicioService = new PrestacionServicioService();
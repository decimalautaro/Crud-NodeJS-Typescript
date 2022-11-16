import { Double, getCustomRepository } from "typeorm";
import { Servicio } from "../entities/Servicio";
import { ServicioRepository } from "../repositories/ServicioRepository";

interface IServicio {
    id?: string
    precio: number;
    planes: string;
    tipoServicio: string;
    
}

class ServicioServices {
    async create({ precio, planes, tipoServicio }: IServicio) {
        if (!precio || !planes || !tipoServicio) {
            throw new Error("Por favor rellena todos los campos");
        }
    
        const servicioRepository = getCustomRepository(ServicioRepository);
    
        const ServicioAlreadyExists = await servicioRepository.findOne({ precio, planes,tipoServicio });
    
        if (ServicioAlreadyExists) {
            throw new Error("El servicio ya está registrado");
        }
        const tipoServicioAlreadyExists = await servicioRepository.findOne({ tipoServicio });
        if (tipoServicioAlreadyExists) {
            throw new Error("El tipo de servicio ya está registrado");
        }
    
        
    
        const servicio = servicioRepository.create({ precio, planes,tipoServicio});
    
        await servicioRepository.save(servicio);
    
        return servicio;
    
    }


    async delete(id: string) {
        const servicioRepository = getCustomRepository(ServicioRepository);
    
        const servicio = await servicioRepository
            .createQueryBuilder()
            .delete()
            .from(Servicio)
            .where("id = :id", { id })
            .execute();
    
        return servicio;
    
    }


    async edit(id: string) {
        const servicioRepository = getCustomRepository(ServicioRepository);
    
        const tecnico = await servicioRepository.findOne(id);
    
        return tecnico;
    }



    async list() {
        const servicioRepository = getCustomRepository(ServicioRepository);
    
        const servicio= await servicioRepository.find();
    
        return servicio;
    }


    async search(search: string) {
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }
    
        const servicioRepository = getCustomRepository(ServicioRepository);

        const servicio = await servicioRepository
            .createQueryBuilder()
            .where("precio like :search", { search: `%${search}%` })
            .orWhere("planes like :search", { search: `%${search}%` })
            .orWhere("tipoServicio like :search", { search: `%${search}%` })

            .getMany();
    
        return servicio;
    
    }


    async update({ id, precio, planes, tipoServicio}: IServicio) {
        const servicioRepository = getCustomRepository(ServicioRepository);
    
        const servicio = await servicioRepository
            .createQueryBuilder()
            .update(Servicio)
            .set({ precio, planes, tipoServicio })
            .where("id = :id", { id })
            .execute();
    
        return servicio;
    
    }

}

export const servicioServices = new ServicioServices()
export default ServicioServices;
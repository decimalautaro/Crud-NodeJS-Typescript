import { Double, getCustomRepository } from "typeorm";
import { Tecnico } from "../entities/Tecnico";
import { TecnicoRepository } from "../repositories/TecnicoRepository";

interface ITecnico {
    id?: string
    nombre: string;
    puesto: string;
    telefono: number;
    email: string;
    
    
}

class TecnicoServices {
    async create({ nombre, puesto, telefono, email }: ITecnico) {
        if (!nombre || !puesto || !telefono || !email ) {
            throw new Error("Por favor rellena todos los campos");
        }
    
        const tecnicoRepository = getCustomRepository(TecnicoRepository);
    
        const nameAlreadyExists = await tecnicoRepository.findOne({ nombre, puesto, telefono, email });
    
        if (nameAlreadyExists) {
            throw new Error("El nombre de la categoria ya está registrado");
        }
        const nombreAlreadyExists = await tecnicoRepository.findOne({ nombre });
        if (nombreAlreadyExists) {
            throw new Error("El nombre ya está registrado");
        }
    
        const emailAlreadyExists = await tecnicoRepository.findOne({ email });
    
        if (emailAlreadyExists) {
            throw new Error("El correo electrónico ya está registrado");
        }
    
        
    
        const tecnico = tecnicoRepository.create({ nombre, puesto, telefono, email});
    
        await tecnicoRepository.save(tecnico);
    
        return tecnico;
    
    }


    async delete(id: string) {
        const tecnicoRepository = getCustomRepository(TecnicoRepository);
    
        const tecnico = await tecnicoRepository
            .createQueryBuilder()
            .delete()
            .from(Tecnico)
            .where("id = :id", { id })
            .execute();
    
        return tecnico;
    
    }


    async edit(id: string) {
        const tecnicoRepository = getCustomRepository(TecnicoRepository);
    
        const tecnico = await tecnicoRepository.findOne(id);
    
        return tecnico;
    }



    async list() {
        const tecnicoRepository = getCustomRepository(TecnicoRepository);
    
        const tecnico= await tecnicoRepository.find();
    
        return tecnico;
    }


    async search(search: string) {
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }
    
        const tecnicoRepository = getCustomRepository(TecnicoRepository);

        const tecnico = await tecnicoRepository
            .createQueryBuilder()
            .where("nombre like :search", { search: `%${search}%` })
            .orWhere("puesto like :search", { search: `%${search}%` })
            .orWhere("telefono like :search", { search: `%${search}%` })
            .orWhere("email like :search", { search: `%${search}%` })

            .getMany();
    
        return tecnico;
    
    }


    async update({ id, nombre, puesto, telefono, email}: ITecnico) {
        const tecnicoRepository = getCustomRepository(TecnicoRepository);
    
        const tecnico = await tecnicoRepository
            .createQueryBuilder()
            .update(Tecnico)
            .set({ nombre, puesto, telefono, email })
            .where("id = :id", { id })
            .execute();
    
        return tecnico;
    
    }

}

export const tecnicoServices = new TecnicoServices()
export default TecnicoServices;
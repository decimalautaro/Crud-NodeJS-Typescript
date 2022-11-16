import { Repository, EntityRepository } from "typeorm";
import { Servicio } from "../entities/Servicio";

@EntityRepository(Servicio)
class ServicioRepository extends Repository<Servicio>{ }

export { ServicioRepository };
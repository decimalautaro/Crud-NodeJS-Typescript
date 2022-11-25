import { Repository, EntityRepository } from "typeorm";
import { PrestacionServicio } from "../entities/PrestacionServicio";

@EntityRepository(PrestacionServicio)
class PrestacionServicioRepository extends Repository<PrestacionServicio>{ }

export { PrestacionServicioRepository };
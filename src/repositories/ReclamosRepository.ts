import { Repository, EntityRepository } from "typeorm";
import { Reclamo } from "../entities/Reclamo";

@EntityRepository(Reclamo)
class ReclamosRepository extends Repository<Reclamo>{ }

export { ReclamosRepository };
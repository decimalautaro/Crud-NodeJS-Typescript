import { Repository, EntityRepository } from "typeorm";
import { Reclamos } from "../entities/Reclamos";

@EntityRepository(Reclamos)
class ReclamosRepository extends Repository<Reclamos>{ }

export { ReclamosRepository };
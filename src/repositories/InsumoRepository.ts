

import { Repository, EntityRepository } from "typeorm";
import { Insumo } from "../entities/Insumo";

@EntityRepository(Insumo)
class InsumoRepository extends Repository<Insumo>{ }

export { InsumoRepository };
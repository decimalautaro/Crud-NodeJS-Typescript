import { Repository, EntityRepository } from "typeorm";
import { Tecnico } from "../entities/Tecnico";

@EntityRepository(Tecnico)
class TecnicoRepository extends Repository<Tecnico>{ }

export { TecnicoRepository };
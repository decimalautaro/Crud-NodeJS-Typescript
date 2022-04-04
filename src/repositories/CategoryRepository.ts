import { Repository, EntityRepository } from "typeorm";
import { Category } from "../entities/Category";

@EntityRepository(Category)
class CategoriesRepository extends Repository<Category>{ }

export { CategoriesRepository };
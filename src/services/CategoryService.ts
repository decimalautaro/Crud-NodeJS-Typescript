import { Double, getCustomRepository } from "typeorm";
import { Category } from "../entities/Category";
import { CategoriesRepository } from "../repositories/CategoryRepository";

interface ICategory {
    id?: string
    name: string;
    
    
}

class CategoryServices {
    async create({ name }: ICategory) {
        if (!name ) {
            throw new Error("Por favor rellena todos los campos");
        }
    
        const categoriesRepository = getCustomRepository(CategoriesRepository);
    
        const nameAlreadyExists = await categoriesRepository.findOne({ name });
    
        if (nameAlreadyExists) {
            throw new Error("El nombre de la categoria ya está registrado");
        }
    
        
    
        const category = categoriesRepository.create({ name});
    
        await categoriesRepository.save(category);
    
        return category;
    
    }


    async delete(id: string) {
        const categoriesRepository = getCustomRepository(CategoriesRepository);
    
        const category = await categoriesRepository
            .createQueryBuilder()
            .delete()
            .from(Category)
            .where("id = :id", { id })
            .execute();
    
        return category;
    
    }


    async edit(id: string) {
        const categoriesRepository = getCustomRepository(CategoriesRepository);
    
        const category = await categoriesRepository.findOne(id);
    
        return category;
    }



    async list() {
        const categoriesRepository = getCustomRepository(CategoriesRepository);
    
        const category= await categoriesRepository.find();
    
        return category;
    }


    async search(search: string) {
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }
    
        const categoriesRepository = getCustomRepository(CategoriesRepository);

        const category = await categoriesRepository
            .createQueryBuilder()
            .where("name like :search", { search: `%${search}%` })
            

            .getMany();
    
        return category;
    
    }


    async update({ id, name}: ICategory) {
        const categoriesRepository = getCustomRepository(CategoriesRepository);
    
        const category = await categoriesRepository
            .createQueryBuilder()
            .update(Category)
            .set({ name })
            .where("id = :id", { id })
            .execute();
    
        return category;
    
    }

}
export default CategoryServices;
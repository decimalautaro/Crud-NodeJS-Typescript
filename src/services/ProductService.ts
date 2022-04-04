import { Double, getCustomRepository } from "typeorm";
import { Product } from "../entities/Product";
import { ProductsRepository } from "../repositories/ProductsRepository";

interface IProduct {
    id?: string
    name: string;
    price: number;
    category: string;
    
}

class ProductServices {
    async create({ name, price, category }: IProduct) {
        if (!name || !price || !category) {
            throw new Error("Por favor rellena todos los campos");
        }
    
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const nameAlreadyExists = await productsRepository.findOne({ name });
    
        if (nameAlreadyExists) {
            throw new Error("El nombre del producto ya está registrado");
        }
    
        const priceAlreadyExists = await productsRepository.findOne({ price });
    
        if (priceAlreadyExists) {
            throw new Error("El precio ya está registrado");
        }
    
        const product = productsRepository.create({ name, price, category});
    
        await productsRepository.save(product);
    
        return product;
    
    }


    async delete(id: string) {
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const product = await productsRepository
            .createQueryBuilder()
            .delete()
            .from(Product)
            .where("id = :id", { id })
            .execute();
    
        return product;
    
    }


    async edit(id: string) {
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const product = await productsRepository.findOne(id);
    
        return product;
    }



    async list() {
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const products = await productsRepository.find();
    
        return products;
    }


    async search(search: string) {
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }
    
        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository
            .createQueryBuilder()
            .where("name like :search", { search: `%${search}%` })
            .orWhere("price like :search", { search: `%${search}%` })
            .orWhere("category like :search", { search: `%${search}%` })

            .getMany();
    
        return product;
    
    }


    async update({ id, name, price, category }: IProduct) {
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const product = await productsRepository
            .createQueryBuilder()
            .update(Product)
            .set({ name, price, category })
            .where("id = :id", { id })
            .execute();
    
        return product;
    
    }








}
export default ProductServices;
import { Double, getCustomRepository } from "typeorm";
import { Product } from "../entities/Product";
import { ProductsRepository } from "../repositories/ProductsRepository";

interface IProduct {
    id?: string;
    nameProduct: string;
    price: number;
    type: "varchar";
    categoryId: string;
    
}

class ProductServices {
    async create({ nameProduct, price, type, categoryId}: IProduct) {
        if (!nameProduct || !price || !type || !categoryId) {
            throw new Error("Por favor rellena todos los campos");
        }
    
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const nameProductAlreadyExists = await productsRepository.findOne({ nameProduct });
    
        if (nameProductAlreadyExists) {
            throw new Error("El nombre del producto ya está registrado");
        }

        const product = productsRepository.create({ nameProduct, price, type, categoryId});
    
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
            .where("nameProduct like :search", { search: `%${search}%` })
            .orWhere("price like :search", { search: `%${search}%` })
            .orWhere("type like :search", { search: `%${search}%` })
            .orWhere("categoryId like :search", { search: `%${search}%` })

            .getMany();
    
        return product;
    
    }


    async update({ id,nameProduct, price, type, categoryId }: IProduct) {
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const product = await productsRepository
            .createQueryBuilder()
            .update(Product)
            .set({ nameProduct, price, type, categoryId })
            .where("id = :id", { id })
            .execute();
    
        return product;
    
    }








}
export default ProductServices;
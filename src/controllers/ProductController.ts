import { Request, Response } from "express";
import ProductService from "../services/ProductService";


class ProductController {

    async create(request: Request, response: Response) {
        const { name, price, category} = request.body;
    
        const createProductService = new ProductService();
    
        try {
            await createProductService.create({
                name,
                price,
                category,
            }).then(() => {
                response.render("./products/message", {
                message: "Producto registrado con exito"
            });
            });
        } catch (err) {
            response.render("./products/message", {
            message: `Error al registrar el producto: ${err.message}`
            });
        }
    
    }


    async delete(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteProductService = new ProductService();
    
        try {
            await deleteProductService.delete(id).then(() => {
                response.render("./products/message", {
                message: "Producto eliminado con exito"
            });
        });
        } catch (err) {
            response.render("./products/message", {
            message: `Error al eliminar el producto: ${err.message}`
            });
        }
    }


    async edit(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const getProductDataService = new ProductService();
    
        const product = await getProductDataService.edit(id);
    
        return response.render("./products/edit", {
            product: product
        });
    }


    async list(request: Request, response: Response) {
        const listUsersService = new ProductService();
    
        const products = await listUsersService.list();
    
            return response.render("./products/product", {
                products: products
        });
    }


    async search(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();
    
        const searchProductService = new ProductService();
    
        try {
            const products = await searchProductService.search(search);
            response.render("./products/search", {
                products: products,
                search: search
        });
        } catch (err) {
            response.render("./products/message", {
            message: `Error al buscar el producto: ${err.message}`
        });
        }
    }


    async update(request: Request, response: Response) {
        const { id, name, price, category} = request.body;
    
        const updateProductService = new ProductService();
    
        try {
            await updateProductService.update({ id, name, price, category }).then(() => {
                response.render("./products/message", {
                message: "Producto actualizado con exito"
            });
        });
        } catch (err) {
            response.render("./products/message", {
            message: `Error al actualizar el producto: ${err.message}`
        });
        }
    
    }


}


export default ProductController;
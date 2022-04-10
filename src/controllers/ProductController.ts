import { Request, Response } from "express";
import CategoryServices , { categoryServices } from "../services/CategoryService";
import ProductService from "../services/ProductService";


class ProductController {

    async create(request: Request, response: Response) {
        const { nameProduct, price, type, categoryId} = request.body;
    
        const createProductService = new ProductService();
    
        try {
            await createProductService.create({
                nameProduct,
                price,
                type,
                categoryId,
            }).then(() => {
                response.render("./products/product-message", {
                message: "Producto registrado con exito"
            });
            });
        } catch (err) {
            response.render("./products/product-message", {
            message: `Error al registrar el producto: ${err.message}`
            });
        }
    
    }


    async add(request:Request, response: Response) {
        const category = await categoryServices.list();
        return response.render("./products/product-add",{category})
    }


    async delete(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteProductService = new ProductService();
    
        try {
            await deleteProductService.delete(id).then(() => {
                response.render("./products/product-message", {
                message: "Producto eliminado con exito"
            });
        });
        } catch (err) {
            response.render("./products/product-message", {
            message: `Error al eliminar el producto: ${err.message}`
            });
        }
    }


    async edit(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const getProductDataService = new ProductService();
    
        const product = await getProductDataService.edit(id);
        const listCategory = new CategoryServices()

        const category = await listCategory.list()
        return response.render("./products/product-edit", {
          product: product,
          category: category

        });
    }


    async list(request: Request, response: Response) {
        const listProductsService = new ProductService();
    
        const products = await listProductsService.list();
    
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
            response.render("./products/product-search", {
                products: products,
                search: search
        });
        } catch (err) {
            response.render("./products/product-message", {
            message: `Error al buscar el producto: ${err.message}`
        });
        }
    }


    async update(request: Request, response: Response) {
        const { id, nameProduct, price, type, categoryId} = request.body;
    
        const updateProductService = new ProductService();
    
        try {
            await updateProductService.update({ id, nameProduct, price, type, categoryId }).then(() => {
                response.render("./products/product-message", {
                message: "Producto actualizado con exito"
            });
        });
        } catch (err) {
            response.render("./products/product-message", {
            message: `Error al actualizar el producto: ${err.message}`
        });
        }
    
    }


}

export default ProductController;
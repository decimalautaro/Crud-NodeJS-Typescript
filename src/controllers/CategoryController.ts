import { Request, Response } from "express";
import CategoryService from "../services/CategoryService";


class CategoryController {

    async create(request: Request, response: Response) {
        const { name, price, category} = request.body;
    
        const createCategoryService = new CategoryController();
    
        try {
            await createCategoryService.create({
                name

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


    async delete(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteProductService = new CategoryController();
    
        try {
            await deleteCategoryService.delete(id).then(() => {
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
    
        const getProductDataService = new CategoryController();
    
        const category = await getCategoryDataService.edit(id);
    
        return response.render("./products/product-edit", {
            category: category
        });
    }


    async list(request: Request, response: Response) {
        const listUsersService = new CategoryController();
    
        const products = await listCategorysService.list();
    
            return response.render("./products/product", {
                products: products
        });
    }


    async search(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();
    
        const searchCategoryService = new CategoryController();
    
        try {
            const category = await searchCategoryService.search(search);
            response.render("./products/product-search", {
                category: category,
                search: search
        });
        } catch (err) {
            response.render("./products/product-message", {
            message: `Error al buscar el producto: ${err.message}`
        });
        }
    }


    async update(request: Request, response: Response) {
        const { id, name, price, category} = request.body;
    
        const updateCategoryService = new CategoryController();
    
        try {
            await updateCategoryService.update({ id, name}).then(() => {
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


export default CategoryController;